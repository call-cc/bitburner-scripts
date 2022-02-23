/*

This is from @bubbles on Discord. Downloaded from https://www.toptal.com/developers/hastebin/anulawekos.typescript



*/

const vbar = '│';
const hbar = '─';
const cross = '┼';
const v_and_r = '├';
const v_and_l = '┤';
const d_and_h = '┬';
const u_and_h = '┴';
const d_and_r = '┌';
const d_and_l = '���';
const u_and_r = '└';
const u_and_l = '┘';

export class SafeMap<K, V> extends Map<K, V> {
    at(k: K) { return this['get'](k); }
    at_or(k: K, d: V) { return this['get'](k) ?? d; }
}

//stolen from tmajibon/bitburner-utils, thank you!!!!
export function find_prop(propName: string): unknown {
	for (const div of eval("document").querySelectorAll("div")) {
		const propKey = Object.keys(div)[1];
		if (!propKey) continue;
		const props = div[propKey];
		if (props.children?.props && props.children.props[propName]) return props.children.props[propName];
		if (props.children instanceof Array) for (const child of props.children) if (child?.props && child.props[propName]) return child.props[propName];
	}
	return undefined;
}

export interface TableRenderOptions {
	filter_out?: Array<string>;
	value_transforms?: any;
	title_replacements?: any;
	value_fmt_all?: (input: any) => string;
	title_function?: (input: string) => string;
	col_merge?: (input: string) => boolean;
}

export class Table {
	static render(print_fn : (...a: any[]) => void, list : Array<any>, opts: TableRenderOptions|undefined = undefined) {
		if (list.length == 0) return;

		const dont_display = new Set(opts?.filter_out ?? []);

		function interesting(obj: any): Array<string> {
			return Object.keys(obj).filter(k => !dont_display.has(k));
		}
		function title(input: string) {
			let ret = input;

			if (opts?.title_function)
				ret = opts.title_function(ret);

			if (opts?.title_replacements && input in opts.title_replacements)
				ret = opts.title_replacements[input];

			return ret;
		}

		const max = new SafeMap<string, number>();

		function fetch(obj : any, prop : string) {
			let val = String(obj[prop] ?? '');

			if (opts?.value_fmt_all && obj[prop])
				val = String(opts.value_fmt_all(obj[prop]));

			if (opts?.value_transforms && prop in opts.value_transforms) 
				val = opts.value_transforms[prop](val);

			return val;
		}

		//get the max width of each column, including the title
		for (const h of list) {
			for (const prop of interesting(h)) {
				max.set(prop, Math.max(max.at_or(prop, 0), title(prop).length, fetch(h, prop).length));
			}
		}


		//create a react element with the given text, (default span, no styling)
		function elem(text : string, type = 'span', style :any = null) {
			return React.createElement(type, style, text);
		}


		//top row
		let top = d_and_r;
		//between header and body
		let sep = v_and_r;
		//bottom 🤭
		let bot = u_and_r;

		//different bar style for first, non-first columns
		let col = 0;

		const last_index = max.size - 1;

		const terminal = find_prop("terminal") as any;

		//list of elements for the title row
		const header = [elem(vbar)];

		function choose_col_sep(last: boolean, merge_next: boolean, vals: { if_normal: string, if_last: string, if_merged: string } ) {
			if (merge_next)
				return vals.if_merged;
			if (last)
				return vals.if_last;

			return vals.if_normal;
		}

		let merged_last = false;

		for (const [prop, width] of max) {
			const merge_next = (opts?.col_merge && opts.col_merge(prop)) ?? false;
			if (col > 0)
				header.push(merged_last ? elem(' ') : elem(vbar));
			const last_col = col == last_index;


			header.push(elem(title(prop).padStart(width + 1), 'i', { style: { color: '#DFFF00' } }));
			sep += ''.padStart(width + 1, hbar);
			top += ''.padStart(width + 1, hbar);
			bot += ''.padStart(width + 1, hbar);

			header.push(elem(last_col ? ' ' + vbar : ' '));
			top += hbar + choose_col_sep(last_col, merge_next, { if_normal: d_and_h, if_last: d_and_l, if_merged: hbar });
			sep += hbar + choose_col_sep(last_col, merge_next, { if_normal: cross, if_last: v_and_l, if_merged: hbar });
			bot += hbar + choose_col_sep(last_col, merge_next, { if_normal: u_and_h, if_last: u_and_l, if_merged: hbar });

			col++;
			merged_last = merge_next;
		}

		terminal.print(top);
		terminal.printRaw(header);
		terminal.print(sep);

		let row = 0;

		const evenstyle = { style: { color: '#0c0' } };
		const oddstyle = { style: { color: 'green' } };

		for (const h of list) {
			const elems = [elem(vbar)];
			col = 0;
			merged_last = false;
			for (const [prop, width] of max) {
				const merge_next = (opts?.col_merge && opts.col_merge(prop)) ?? false;
				if (col > 0)
					elems.push(merged_last ? elem(' ') : elem(vbar));
				const last_col = col == last_index;

				const val = fetch(h, prop).padStart(width + 1);

				elems.push(elem(val, 'span', ((row & 1) == 0) ? oddstyle : evenstyle));
				elems.push(elem(last_col ? (' ' + vbar) : ' '));

				col++;
				merged_last = merge_next;
			}
			terminal.printRaw(elems);

			row++;
		}
		terminal.print(bot);

	}

}
