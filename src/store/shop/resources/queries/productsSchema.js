export default function (first = 250) {
    return `query {
        products (first: 250) {
            edges {
                cursor,
                node {
                    availableForSale,
                    collections(first: 250) {
                        edges {
                            node {
                                description,
                                descriptionHtml,
                                handle,
                                title
                            }
                        }
                    },
                    description,
                    descriptionHtml,
                    handle,
                    id,
                    images(first: 250) {
                        edges {
                            node {
                                originalSrc,
                                transformedSrc,
                                altText
                            }
                        }
                    },
                    options {
                        id,
                        name,
                        values
                    },
                    tags,
                    title,
                    productType,
                    variants(first: 250) {
                        edges {
                            node {
                                available,
                                compareAtPriceV2 {
                                    amount,
                                    currencyCode
                                },
                                id,
                                image {
                                    originalSrc,
                                    transformedSrc,
                                    altText
                                },
                                priceV2 {
                                    amount,
                                    currencyCode
                                },
                                selectedOptions {
                                    name,
                                    value
                                },
                                title
                            }
                        }
                    }
                }
            },
            pageInfo {
                hasNextPage,
                hasPreviousPage
            }
        }
    }`;
}
