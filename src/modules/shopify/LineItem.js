import Variant from "./Variant";

export default class LineItem {

    constructor(graphQLData) {
        this._graph = graphQLData;
    }

    get id() {
        return this._graph.id;
    }

    get title() {
        return this._graph.title;
    }

    get quantity() {
        return this._graph.quantity;
    }

    get variant() {
        return new Variant(this._graph.variant);
    }

}
