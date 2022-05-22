import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Product from "./Product";

export default ({ publicKey, products }) => {
  if (!publicKey) {
    return (
      <>
        <img
          src="https://media.giphy.com/media/WcpaItX5JHYkw/giphy.gif"
          alt="meme"
        />
        <div className="button-container">
          <WalletMultiButton className="cta-button connect-wallet-button" />
        </div>
      </>
    );
  }

  return (
    <div className="products-container">
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
};
