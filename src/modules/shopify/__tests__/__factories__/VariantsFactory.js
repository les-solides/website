import EdgesFactory from "./EdgesFactory";
import VariantFactory from "./VariantFactory";

export default class VariantsFactory {
    static create(array) {
        let base = [
            VariantFactory.create(),
            VariantFactory.create(),
        ];
        return EdgesFactory.build(array || base);
    }
}
