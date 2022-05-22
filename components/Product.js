import styles from "../styles/Product.module.css";
import IpfsDownload from "./IpfsDownload";

export default ({product}) => {
    const {id, name, price, description, image_url} = product;
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
                <IpfsDownload filename="avatar.jpg" hash="QmYbtgfZ5pMbTZnHMFSDi67pREaWJ2527jkkbwrG2YgBZu" cta="avatar"/>
            </div>
        </div>
    )
} 