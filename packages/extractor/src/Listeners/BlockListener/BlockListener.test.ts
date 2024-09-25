import { doesNotMatch } from 'assert';
import { BlockListener } from './BlockListener'

describe('Listener Test Suite', () => {


    // Test #1
    it('Logs a new block', () => {
        const wssUrl = 'wss://intensive-patient-diagram.solana-mainnet.quiknode.pro/d4ea94f530cb38e6f7ac727ed8eadf33a309d06b/';
        const httpsUrl = 'https://intensive-patient-diagram.solana-mainnet.quiknode.pro/d4ea94f530cb38e6f7ac727ed8eadf33a309d06b/';

        const listener = new BlockListener(wssUrl, httpsUrl);
        listener.listen();
        
        
    })

})