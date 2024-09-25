/**
 * ### Extractor Layer
 * - for the Solana ETL pipeline (onchain data)
 * 
 * I am the extractor, i make sure that onchain data is passed to the system
 * so that they can work on it and use it
 * 
 * My main goal is to make sure that no data is missed and that it is passed 
 * downstream
 * 
 */

import * as web3 from '@solana/web3.js'
import { BlockListener } from './Listeners/BlockListener/BlockListener'


/**
 * Main function declaration
 */
async function main() : Promise<void> {
    console.log('Hello from the extractor!!!')
    const wssUrl = 'wss://intensive-patient-diagram.solana-mainnet.quiknode.pro/d4ea94f530cb38e6f7ac727ed8eadf33a309d06b/';
    const httpsUrl = 'https://intensive-patient-diagram.solana-mainnet.quiknode.pro/d4ea94f530cb38e6f7ac727ed8eadf33a309d06b/';

    const listener = new BlockListener(wssUrl, httpsUrl)

    listener.listen();

};


/**
 * Main function execution
 */
main()
    .catch((error) => {
        console.error(`@indexer/extractor - FATAL - Error encountered while running main function: `, error)
    });