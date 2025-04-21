import axios from "axios";

const API_URL = "https://www.coba-grills.hk.myshopify.com/admin/api/2024-01/products.json";
const ACCESS_TOKEN = "d058b833a1a31ac8e8304091da3e4a11"; // From Shopify

const fetchProducts = async () => {
    try {
        const response = await axios.get(API_URL, {
            headers: {
                "X-Shopify-Access-Token": ACCESS_TOKEN,
                "Content-Type": "application/json",
            },
        });
        console.log(response.data);
    } catch (error) {
        console.error("Error fetching products:", error);
    }
};

fetchProducts();
