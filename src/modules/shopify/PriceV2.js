import Money from "./Money";

export default class PriceV2 {
    constructor(graphQLData) {
        this._graph = graphQLData;
    }
    get amount() {
        if ( ! this._graph) {
            return 0.0;
        }
        return this._graph.amount || 0.0;
    }

    get currencyCode() {
        if ( ! this._graph) {
            return 'CHF';
        }
        return this._graph.currencyCode || 'CHF';
    }
    toString() {
        return Money.format(this.amount, this.currencyCode);
    }
}
