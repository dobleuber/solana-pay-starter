import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
    clusterApiUrl,
    Connection,
    PublicKey,
    Transaction,
} from "@solana/web3.js";
import {
    createTransferCheckedInstruction,
    getAssociatedTokenAddress,
    getMint,
} from "@solana/spl-token";

import BigNumber from "bignumber.js";
import products from "./products.json";

const usdcAddress = new PublicKey("Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr");

const createTransaction = async (req, res) => {
    try {
        const {buyer, seller, orderID, itemID} = req.body;

        if (!buyer) {
            res.status(400).json({
                message: "Missing order ID"
            });
        }

        if (!orderID) {
            res.status(400).json({
                message: "Missing order ID"
            });
        }

        const item = products.find( it => it.id === itemID);

        if (!item) {
            res.status(404).json({
                message: "Item not found. please check item ID"
            })
        }

        const {price: itemPrice} = item;
        const bigAmmount = BigNumber(itemPrice);
        const buyerPublicKey = new PublicKey(buyer);
        const sellerPublicKey = new PublicKey(seller);

        const network = WalletAdapterNetwork.Devnet;
        const endpoint = clusterApiUrl(network);
        const connection = new Connection(endpoint);

        const buyerUsdcAddress = await getAssociatedTokenAddress(usdcAddress, buyerPublicKey);
        const shopUsdcAddress = await getAssociatedTokenAddress(usdcAddress, sellerPublicKey);
        const {blockhash, lastValidBlockHeight} = await connection.getLatestBlockhash("finalized");

        const usdcMint = await getMint(connection, usdcAddress);

        const tx = new Transaction({
            blockhash,
            feePayer: buyerPublicKey,
            lastValidBlockHeight
        });

        const transferInstruction = createTransferCheckedInstruction(
            buyerUsdcAddress,
            usdcAddress,
            shopUsdcAddress,
            buyerPublicKey,
            bigAmmount.toNumber() * 10 ** (await usdcMint).decimals,
            usdcMint.decimals
        );

        transferInstruction.keys.push({
            pubkey: new PublicKey(orderID),
            isSigner: false,
            isWritable: false,
        });

        tx.add(transferInstruction);

        const serializedTransaction = tx.serialize({
            requireAllSignatures: false,
        });

        const base64 = serializedTransaction.toString("base64");

        res.status(200).json({
            transaction: base64,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "error creating tx"
        });
    }
}

export default function handler(req, res) {
    if (req.method === "POST") {
        createTransaction(req, res);
    } else {
        res.status(405).end();
    }
}