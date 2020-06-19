import EdgesField from "./EdgesField";
import CompareAtPriceV2Field from "./CompareAtPriceV2Field";
import PageInfoField from "./PageInfoField";
import ImageField from "./ImageField";
import PriceV2Field from "./PriceV2Field";

export default class VariantsField {
    static addTo(field, args) {
        field.add('variants', {args: args}, variants => {
            EdgesField.addTo(variants, node => {
                node.add('availableForSale');
                node.add('currentlyNotInStock');
                node.add('id');
                ImageField.addTo(node);
                CompareAtPriceV2Field.addTo(node);
                PriceV2Field.addTo(node);
            });
            PageInfoField.addTo(variants);
        })
    }
}
