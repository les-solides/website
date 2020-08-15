export default function (handle) {
	return `{
		collectionByHandle(handle: "${ handle }") {
			products (first: 250) {
				pageInfo {
					hasNextPage,
					hasPreviousPage
				},
				edges {
					node {
						availableForSale,
						handle,
						id,
						images (first: 2) {
							edges {
								node {
									altText,
									id,
									originalSrc,
									transformedSrc
								}
							},
							pageInfo {
								hasNextPage,
								hasPreviousPage
							}
						},
						options {
							id,
							name,
							values
						},
						priceRange {
							maxVariantPrice {
								amount,
								currencyCode
							},
							minVariantPrice {
								amount,
								currencyCode
							}
						},
						productType,
						tags,
						title,
						variants (first: 250) {
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
							},
							pageInfo {
								hasNextPage,
								hasPreviousPage
							}
						}
					}
				}
			}
		}
	}`;
}
