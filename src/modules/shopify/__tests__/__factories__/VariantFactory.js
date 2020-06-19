import faker from "faker";
import ImageFactory from "./ImageFactory";
import PriceFactory from "./PriceFactory";

export default class VariantFactory {
    static create(data) {
        return {
            available: faker.random.boolean(),
            compareAtPrice: null,
            compareAtPriceV2: PriceFactory.create(),
            id: faker.random.uuid(),
            image: ImageFactory.create(),
            presentmentPrices: null,
            price: null,
            priceV2: PriceFactory.create(),
            selectedOptions: null,
            sku: `sku${faker.random.number(5)}`,
            title: faker.random.word(),
            variableValues: null,
            ...data
        };
    }
}
