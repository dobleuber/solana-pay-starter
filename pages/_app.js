import React, { useMemo } from "react";

import WalletProvider from "../components/WalletProvider";
import "../styles/globals.css";
import "../styles/App.css";

const App = ({ Component, pageProps }) => {

  return (
    <WalletProvider>
      <Component {...pageProps} />
    </WalletProvider>
  );
};

export default App;
