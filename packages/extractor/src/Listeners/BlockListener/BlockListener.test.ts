/** 
 * I got no idea how to make this test work LOL, ignore this for now
*/

import { BlockListener } from './BlockListener'

import { config } from 'dotenv';
config({
    path: '../../../.env'
});


const wssUrl = 'wss://intensive-patient-diagram.solana-mainnet.quiknode.pro/d4ea94f530cb38e6f7ac727ed8eadf33a309d06b/'
const httpsUrl = 'https://intensive-patient-diagram.solana-mainnet.quiknode.pro/d4ea94f530cb38e6f7ac727ed8eadf33a309d06b/'

describe('Listener Test Suite', () => {
    

    console.log(httpsUrl + ' asdasdasd');


    // Test #1
    it('Logs a new block', async () => {

        const listener = new BlockListener(wssUrl, httpsUrl);
        
        if (listener._blockData) {
            console.log('Block data: ' + listener._blockData);
        }

        expect(listener._blockData).toBeDefined();

    })

})