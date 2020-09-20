export default function (handles = [], first = 250) {
    const cloned = [...handles];
    const query = `${ cloned.shift() }${ cloned.reduce((a, b) => a + ` OR ${ b }`, "") }`;
    return `query {
        products(first: ${ first } query:"${ query }") {
            edges {
                node {
                    availableForSale,
                    collections(first: 250) {
                        edges {
                            node {
                                descriptionHtml,
                                handle
                            }
                        }
                    },
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
            }
        }
    }`;
}
