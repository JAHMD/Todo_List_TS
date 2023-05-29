import "./CSS/style.css";
import FullList from "./model/FullList";
import ListItem from "./model/ListItem";
import ListTemplate from "./templates/ListTemplate";

const initApp = () => {
	const fullList = FullList.instance;
	const template = ListTemplate.instance;

	const itemEntryForm = document.getElementById(
		"itemEntryForm"
	) as HTMLFormElement;

	itemEntryForm.addEventListener("submit", (e: SubmitEvent) => {
		e.preventDefault();

		const input = document.getElementById("newItem") as HTMLInputElement;
		const newEntryText: string = input.value.trim();
		if (!newEntryText.length) return;

		const listLength = fullList.list.length;
		const id = listLength ? +fullList.list[listLength - 1].id + 1 : 1;

		const newItem = new ListItem(id.toString(), newEntryText);
		fullList.addItem(newItem);
		template.render(fullList);
		input.value = "";
	});

	const clear = document.getElementById(
		"clearItemsButton"
	) as HTMLButtonElement;
	clear.addEventListener("click", () => {
		fullList.clear();
		template.clear();
	});

	fullList.load();
	template.render(fullList);
};

document.addEventListener("DOMContentLoaded", initApp);
