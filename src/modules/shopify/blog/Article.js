import DomParser from "../DomParser";

export default class Article {
	
	constructor(props = {}) {
		this.blog = props.blog;
		this.content = props.content;
		this.contentHtml = props.contentHtml;
		this.handle = props.handle;
		this.id = props.id;
		this.tags = props.tags;
		this.title = props.title;
	}
	
	get blogTitle() {
		if ( ! this.blog) {
			return ""
		}
		return this.blog.title || "";
	}
	
	get images() {
		return DomParser.fetchAllImages(this.contentHtml) || [];
	}
	
	get order() {
		return Number(this.filterTags(
			/^order:*/,
			"order:"
		));
	}
	
	get template() {
		return this.filterTags(
			/^template:*/,
			"template:"
		);
	}
	
	filterTags(match, split) {
		if (
			! Array.isArray(this.tags) ||
			! this.tags.length
		) {
			return null;
		}
		const templateTag = this.tags.find(t => t.match(match))
		if (typeof templateTag !== "string") {
			return null;
		}
		return templateTag
			.split(split)
			.reduce((a,b) => a ? a : b);
	}
	
	selectElement(selector) {
		return DomParser.fetchFirstBySelector(
			this.contentHtml,
			selector
		) || document.createElement('div');
	}
	
}