import faker from 'faker';
import ImagesFactory from "./ImagesFactory";
import VariantFactory from "./VariantFactory";

export default class ProductFactory {
    static create(data) {
        return {
            availableForSale: faker.random.boolean(),
            handle:faker.lorem.slug,
            id:faker.random.uuid(),
            images: ImagesFactory.create(),
            metafields: {
                edges: [{
                    cursor:"eyJsYXN0X2lkIjoxMjM1MjM3NDQ3Mjc2NywibGFzdF92YWx1ZSI6MTIzNTIzNzQ0NzI3Njd9",
                    node: {
                        description:"",
                        id:"Z2lkOi8vc2hvcGlmeS9NZXRhZmllbGQvMTIzNTIzNzQ0NzI3Njc=",
                        key:"compareAtPrice",
                        value:"-"
                    }
                }],
                pageInfo: {
                    hasNextPage:false,
                    hasPreviousPage:false
                }
            },
            priceRange: {
                maxVariantPrice: {
                    amount:"39.0",
                    currencyCode:"CHF"
                },
                minVariantPrice: {
                    amount:"39.00",
                    currencyCode:"CHF"
                }
            },
            title:"TEST - tote - DENYA - brick",
            variants: [
                VariantFactory.create(),
                VariantFactory.create()
            ],
            ...data
        }
    }
}
