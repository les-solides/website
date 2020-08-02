import axios from 'axios';
import config from './../config';

export default axios.create({
    baseURL: config.shopifyBaseURL,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/graphql",
        "X-Shopify-Storefront-Access-Token": config.shopifyStorefrontToken,
    }
});
