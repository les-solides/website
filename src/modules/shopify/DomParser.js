export default class DomParser {
	static createDom(dom) {
		const element = document.createElement('div');
		element.innerHTML = dom;
		return element;
	}
	
	static fetchAllBySelector(dom, selector) {
		return DomParser.createDom(dom)
						.querySelectorAll(selector);
	}
	
	static fetchAllImages(dom) {
		return DomParser.createDom(dom)
						.querySelectorAll('img');
	}
	
	static fetchAllVideos(dom) {
		return DomParser.createDom(dom)
						.querySelectorAll('video');
	}
	
	static fetchFirstBySelector(dom, selector) {
		return DomParser.createDom(dom)
				 .querySelector(selector);
	}
}