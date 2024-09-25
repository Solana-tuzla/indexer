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
import { config } from 'dotenv'
config({
    path: './.env'
});

/**
 * Main function declaration
 */
async function main() : Promise<void> {
    console.log('Extractor has started!')
    const wssUrl = process.env.WSS_URL || ''
    const httpsUrl = process.env.HTTPS_URL || ''

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