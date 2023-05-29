import ListItem from "./ListItem";

interface List {
	list: ListItem[];
	load(): void;
	save(): void;
	clear(): void;
	addItem(item: ListItem): void;
	removeItem(id: string): void;
}

export default class FullList implements List {
	static instance: FullList = new FullList();

	private constructor(private _list: ListItem[] = []) {}

	get list(): ListItem[] {
		return this._list;
	}

	load(): void {
		const storedList: string | null = localStorage.getItem("list");
		if (typeof storedList !== "string") return;

		const parsedList: { _id: string; _item: string; _checked: boolean }[] =
			JSON.parse(storedList);
		console.log(parsedList);

		parsedList.forEach((item) => {
			const newListItem = new ListItem(item._id, item._item, item._checked);
			FullList.instance.addItem(newListItem);
		});
	}

	save(): void {
		localStorage.setItem("list", JSON.stringify(this._list));
	}

	clear(): void {
		this._list = [];
		this.save();
	}

	addItem(item: ListItem): void {
		this._list.push(item);
		this.save();
	}

	removeItem(id: string): void {
		this._list = this._list.filter((item) => item.id !== id);
		this.save();
	}
}
