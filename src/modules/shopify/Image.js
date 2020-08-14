export default class Image {
    constructor(graphQLImage) {
        this._graph = graphQLImage;
    }

    get alt() {
        return this._graph.altText || "";
    }
    
    get altText() {
        return this._graph.altText || "";
    }

    get id() {
        return this._graph.id;
    }
    
    get originalSrc() {
        if (! this._graph.originalSrc) {
            return this._graph.src || "";
        }
        return this._graph.originalSrc || "";
    }

    get src() {
        if (! this._graph.transformedSrc) {
            return this._graph.src || "";
        }
        return this._graph.transformedSrc || "";
    }
    
    get transformedSrc() {
        if (! this._graph.transformedSrc) {
            return this._graph.src || "";
        }
        return this._graph.transformedSrc || "";
    }
}
