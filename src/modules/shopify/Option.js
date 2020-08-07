export default class VariantOption {
    constructor(props = {}) {
        this.props = props;
    }
    
    get id() {
        return this.props.id;
    }

    get name() {
        return this.props.name;
    }
    get values() {
        return this.props.values;
    }
}
