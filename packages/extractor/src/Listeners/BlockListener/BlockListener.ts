import * as web3 from '@solana/web3.js';

export class BlockListener {
    /** Properties */
    _wssUrl: string;
    _httpsUrl: string;
    _connection: web3.Connection;
    _blockData: any; // Variable to store block data

    /** Constructor */
    constructor(wssUrl: string, httpsUrl: string) {
        this._wssUrl = wssUrl;
        this._httpsUrl = httpsUrl;
        this._connection = new web3.Connection(this._httpsUrl, { wsEndpoint: this._wssUrl });
    }

    async listen() {
        this._connection.onSlotUpdate(async (slotUpdate) => {
            if (slotUpdate.type === 'root') {
                // console.log(`Slot finalized: ${slotUpdate.slot}`);
                
                await this.fetchBlockDataWithRetry(slotUpdate.slot);
            }
        });
    }



    // This code fetches block data with retries to make sure that no blocks are skipped
    async fetchBlockDataWithRetry(slot: number, retries: number = 40, delay: number = 600) {

        for (let attempt = 1; attempt <= retries; attempt++) {
            
            try {
                // Fetch block data
                const block = await this._connection.getBlock(slot, {
                    commitment: 'finalized',
                    maxSupportedTransactionVersion: 0
                });

                // If block data is available, store it and return
                if (block) {
                    this._blockData = block;
                    

                    console.log(`New block received from slot ${slot}: ` + this._blockData);

                    return;
                }
            } catch (error) {
                // If error -32004 happens (block data not available yet), this logs a warning
                if ((error as { code: number }).code === -32004) {
                    console.warn(`Block data not available yet for slot: ${slot}, attempt: ${attempt}`);
                } else {
                    console.error("Error fetching block data:", error);
                    return;
                }
            }
            await this.delay(delay);
        }
        console.error(`Failed to fetch block data for slot: ${slot} after ${retries} attempts`);
    }

    // This code adds a delay between retries
    delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
