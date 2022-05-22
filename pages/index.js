import { useWallet } from "@solana/wallet-adapter-react";
import {useEffect, useState} from "react";
import HeadComponent from '../components/Head';
import NotConnectedContainer from "../components/NotConnectedContainer";

// Constants
const TWITTER_HANDLE = "dobleuber";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const TWITTER_BUILDSPACE_LINK = `https://twitter.com/_buildspace`;

const App = () => {
  
  const {publicKey} = useWallet();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (publicKey) {
      fetch('/api/fetchProducts')
        .then(res => res.json())
        .then(data => {
          setProducts(data);
          console.log("Products:", data)
        })
    }
  }, [publicKey])
  
  return (
    <div className="App">
      <HeadComponent/>
      <div className="container">
        <header className="header-container">
          <h1 className="header"> 🤑 My super Meme Store 🤑</h1>
          <h2 className="sub-text">Give us your money!</h2>
        </header>

        <main>
          <NotConnectedContainer publicKey={publicKey} products={products}/>
        </main>

        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src="twitter-logo.svg" />
          built by &nbsp;
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >@{TWITTER_HANDLE}</a>
          &nbsp;with&nbsp;
          <a
            className="footer-text"
            href={TWITTER_BUILDSPACE_LINK}
            target="_blank"
            rel="noreferrer"
          >@_buildspace</a>
          &nbsp;
          support
        </div>
      </div>
    </div>
  );
};

export default App;
