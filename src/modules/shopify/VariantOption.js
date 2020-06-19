export default class VariantOption {
    constructor(name, value) {
        this._data = { name, value };
    }

    get name() {
        return this._data.name;
    }
    get value() {
        return this._data.value;
    }
}
