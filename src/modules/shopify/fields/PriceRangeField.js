export default class PriceRangeField {
    static addTo(field) {
        field.add('priceRange', priceRange => {
            priceRange.add('maxVariantPrice', price => {
                price.add('amount');
                price.add('currencyCode');
            });
            priceRange.add('minVariantPrice', price => {
                price.add('amount');
                price.add('currencyCode');
            });
        });
    }
}
