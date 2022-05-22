import styles from "../styles/Product.module.css";
import Buy from "./Buy";

export default ({product}) => {
    const {id, name, price, description, image_url, owner} = product;
    return (
        <div className={styles.product_container}>
            <img className={styles.product_image} src={image_url} alt={name} />
            <div className={styles.product_details}>
                <div className={styles.product_title}>
                    {name}
                </div>
                <div className={styles.product_description}>
                    {description}
                </div>
            </div>
            <div className={styles.product_action}>
                <div className={styles.product_price}>{price} USDC</div>
                {/* I'm hardcoding these for now, we'll fetch the hash from the API later*/}
                <Buy itemID={id} seller={owner}/>
            </div>
        </div>
    )
} 