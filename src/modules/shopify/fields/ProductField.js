import PriceRangeField from "./PriceRangeField";
import MetafieldsField from "./MetafieldsField";
import VariantsField from "./VariantsField";
import ImagesField from "./ImagesField";
import CollectionsField from "./CollectionsField";

export default class ProductField {
    static addTo(field) {
        // todo modularize fields
        field.add('availableForSale');// Add fields to be returned
        CollectionsField.addTo(field);
        field.add('handle');// Add fields to be returned
        ImagesField.addTo(field, {first: 250});
        MetafieldsField.addTo(field, {first: 250});
        PriceRangeField.addTo(field);
        field.add('title');
        VariantsField.addTo(field, {first: 250});
    }
}
