export default class DomParser {
	static createDom(dom) {
		const element = document.createElement('div');
		element.innerHTML = dom;
		return element;
	}
	
	static fetchAllImages(dom) {
		return DomParser.createDom(dom)
						.querySelectorAll('img');
	}
	
	static fetchFirstBySelector(dom, selector) {
		return DomParser.createDom(dom)
				 .querySelector(selector);
	}
}