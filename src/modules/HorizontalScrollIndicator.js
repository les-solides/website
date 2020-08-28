import Utils from "./Utils";

export default class HorizontalScrollIndicator {
	
	element;
	
	constructor(selector) {
		this.element = document.querySelector(selector);
		if ( ! this.element) {
			throw new Error('[HorizontalScrollIndicator] Element with given selector not found.');
		}
	}
	
	async start() {
		if (this.element.scrollLeft > 50) {
			return;
		}
		for (let i = 0; i < 100; i++) {
			this.element.scrollLeft = i;
			await Utils.wait(75 / i + 1);
		}
		for (let i = 100; i > 0; i--) {
			this.element.scrollLeft = i;
			await Utils.wait(75 / i + 1);
		}
	}
	
}