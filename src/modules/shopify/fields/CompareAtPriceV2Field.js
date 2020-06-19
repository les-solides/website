import MoneyV2Field from "./MoneyV2Field";

export default class CompareAtPriceV2Field {
    static addTo(field) {
        field.add('compareAtPriceV2', compareAtPrice => {
            MoneyV2Field.addTo(compareAtPrice);
        });
    }
}
