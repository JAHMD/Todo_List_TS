import FullList from "../model/FullList";

interface DomList {
	ul: HTMLUListElement;
	render(listItems: FullList): void;
	clear(): void;
}

export default class ListTemplate implements DomList {
	ul: HTMLUListElement;
	static instance = new ListTemplate();

	private constructor() {
		this.ul = document.getElementById("listItems") as HTMLUListElement;
	}

	clear(): void {
		this.ul.innerHTML = "";
	}

	render(listItems: FullList): void {
		this.clear();

		listItems.list.forEach((item) => {
			const li = document.createElement("li") as HTMLLIElement;
			li.className = "item";

			const checkbox = document.createElement("input") as HTMLInputElement;
			checkbox.type = "checkbox";
			checkbox.id = item.id;
			checkbox.checked = item.checked;
			checkbox.addEventListener("change", () => {
				item.checked = !item.checked;
				listItems.save();
			});
			li.append(checkbox);

			const label = document.createElement("label") as HTMLLabelElement;
			label.htmlFor = item.id;
			label.textContent = item.item;
			li.append(label);

			const button = document.createElement("button") as HTMLButtonElement;
			button.className = "button";
			button.textContent = "X";
			button.addEventListener("click", () => {
				listItems.removeItem(item.id);
				this.render(listItems);
			});
			li.append(button);

			this.ul.append(li);
		});
	}
}
