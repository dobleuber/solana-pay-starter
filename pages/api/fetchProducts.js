import Product from "../../components/Product";
import products from "./products.json";

export default function handler(req, res) {
    if (req.method === "GET") {
        const productsNoHashes = products.map((product) => {
            const {hash, filename, ...rest} = product;
            return rest
        });

        res.status(200).json(productsNoHashes)
    } else {
        res.status(405).send(`method ${req.method} not allowed`)
    }
}