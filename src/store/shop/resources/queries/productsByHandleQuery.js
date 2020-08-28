export default function (handles, first = 250) {
	if ( ! Array.isArray(handles)) {
		throw new Error('handles must be an array!');
	}
	let handleString = handles.join(' && ');
	return `query {
        products(first: ${ first } query:"${ handleString }") {
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