import Image from "./Image";

export default class Collection {

    constructor(graphQLData) {
        this._graph = graphQLData;
        this._children = [];
        this._parent = null;
    }

    get children() {
        return this._children;
    }

    get descriptionDOM() {
        let div = document.createElement('div');

        if ( ! this.descriptionHtml) {
            return false;
        }

        div.innerHTML = this.descriptionHtml.trim();

        // Change this to div.childNodes to support multiple top-level nodes
        return div;
    }

    get descriptionHtml() {
        return this._graph.descriptionHtml;
    }

    get handle() {
        return this._graph.handle;
    }

    get hasParent() {
        return !! this.parentHandle;
    }

    get image() {
        if ( ! this._graph.image) {
            return null;
        }
        return new Image(this._graph.image);
    }

    get isRoot() {
        return ! this.hasParent;
    }

    get metaParent() {
        if ( ! this.descriptionDOM) {
            return false;
        }
        return this.descriptionDOM.querySelector('meta[name="parent"]');
    }

    get parent() {
        return this._parent;
    }

    get parentHandle() {
        if ( ! this.metaParent) {
            return "";
        }
        return String(this.metaParent.content).trim();
    }

    get title() {
        return this._graph.title;
    }

    addChildren(collections) {
        if ( ! Array.isArray(collections)) {
            return false;
        }
        collections.forEach(c => {
            if ( ! c.hasParent) {
                return;
            }
            if (this.handle === c.parentHandle) {
                this._children.push(c);
            }
        });
    }

    setParentFromCollectionArray(collections) {
        if ( ! Array.isArray(collections)) {
            return false;
        }
        if ( ! this.hasParent) {
            return false;
        }
        this._parent = collections
            .find(c => c.handle === this.parentHandle);
    }

}
