export default function (id) {
	return `
	{
		productRecommendations (productId: "${ id }") {
			id
		}
	}`
}

/*availableForSale,
 collections (first: 250) {
 edges {
 cursor,
 node {
 descriptionHtml,
 handle,
 id,
 image {
 altText,
 id,
 originalSrc,
 transformedSrc
 },
 title
 }
 },
 pageInfo {
 hasNextPage,
 hasPreviousPage
 }
 },
 handle,
 images (first: 250) {
 edges {
 cursor,
 node {
 id,
 altText,
 originalSrc,
 transformedSrc
 }
 },
 pageInfo {
 hasNextPage,
 hasPreviousPage
 },
 },
 metafields (first: 250) {
 edges {
 cursor,
 node {
 description,
 id,
 key,
 value
 }
 },
 pageInfo {
 hasNextPage,
 hasPreviousPage
 }
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
 options {
 id,
 name,
 values
 },
 tags,
 title,
 variants (first: 250) {
 edges {
 cursor,
 node {
 availableForSale,
 currentlyNotInStock,
 id,
 image {
 altText,
 id,
 originalSrc,
 transformedSrc
 },
 compareAtPriceV2 {
 amount,
 currencyCode
 },
 selectedOptions {
 name,
 value
 },
 priceV2 {
 amount,
 currencyCode
 }
 }
 },
 pageInfo {
 hasNextPage,
 hasPreviousPage
 }
 }
 }*/