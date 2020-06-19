import Product from "../Product";
import ProductFactory from "./__factories__/ProductFactory";
import VariantFactory from "./__factories__/VariantFactory";
import PriceFactory from "./__factories__/PriceFactory";
import Variant from "../Variant";

describe('Product.js', () => {
    // todo: build ProductFactory
    test('metaCompareAtPrice is null, if no metafields are present', () => {
        const product = new Product(ProductFactory.create());
        expect(product.metafields.length).toBeTruthy();
    });

    it('Has a property that returns the price of each Variant as an Array', () => {
        let variantOne = VariantFactory.create({
            priceV2: PriceFactory.create({ amount: 100.0 })
        });
        let variantTwo = VariantFactory.create({
            priceV2: PriceFactory.create({ amount: 80.0 })
        });
        const product = new Product(
            ProductFactory.create({ variants: [ variantOne, variantTwo ] })
        );
        expect(product.variantPrices).toHaveLength(2);
        expect(product.variantPrices[0].amount).toBe(100.0);
        expect(product.variantPrices[1].amount).toBe(80.0);
    });

    it('has a property that returns the PriceV2 object with the lowest amount of all variants', () => {
        let variantOne = VariantFactory.create({
            priceV2: PriceFactory.create({ amount: 100.0 })
        });
        let variantTwo = VariantFactory.create({
            priceV2: PriceFactory.create({ amount: 80.0 })
        });
        let variantThree = VariantFactory.create({
            priceV2: PriceFactory.create({ amount: 90.0 })
        });
        const product = new Product(
            ProductFactory.create({ variants: [
                variantOne, variantTwo, variantThree
            ] })
        );
        expect(product.variantPrices).toHaveLength(3);
        expect(product.minVariantPrice.amount).toBe(80.0);
    });

    it('has a property that returns the variant that has the lowest PriceV2', () => {
        let variantOne = VariantFactory.create({
            priceV2: PriceFactory.create({ amount: 100.0 })
        });
        let variantTwo = VariantFactory.create({
            priceV2: PriceFactory.create({ amount: 80.0 })
        });
        let variantThree = VariantFactory.create({
            priceV2: PriceFactory.create({ amount: 90.0 })
        });
        const product = new Product(
            ProductFactory.create({ variants: [
                    variantOne, variantTwo, variantThree
                ] })
        );
        expect(product.variants).toHaveLength(3);
        expect(product.variantWithLowestPrice).toStrictEqual(new Variant(variantTwo));
    });
});
