import * as web3 from '@solana/web3.js';

export class BlockListener {
    /** Properties */
    _wssUrl: string;
    _httpsUrl: string;
    _connection: web3.Connection;
    _blockData: any; // Variable to store block data
    _finalizedSlots: Array<any> = []; // Variable to store finalized slots to avoid duplicates


    /** Constructor */
    constructor(wssUrl: string, httpsUrl: string) {
        this._wssUrl = wssUrl;
        this._httpsUrl = httpsUrl;
        this._connection = new web3.Connection(this._httpsUrl, { wsEndpoint: this._wssUrl });
        this._finalizedSlots = [];
    }

    async listen() {
        this._connection.onSlotUpdate(async (slotUpdate) => {
            if (slotUpdate.type === 'root' || slotUpdate.type === 'optimisticConfirmation') {
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
                    
                    if (this._finalizedSlots.includes(slot)) {
                        return;
                    }
                    this._finalizedSlots.push(slot);

                    // Makes sure that _finalizedSlots doesn't have more than 20 elements
                    if (this._finalizedSlots.length >= 20) {
                        this._finalizedSlots.splice(0, 1);
                    }

                    this._blockData = block;
                    

                    console.log(`New block received from slot ${slot}: ` + this._blockData);
                    const date = new Date();
                    const formattedDate = `${date.getUTCDate()}/${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()}:${date.getUTCMilliseconds()}`;
                    //console.log('Block finalized at: ' + formattedDate);
                    
                    return;
                }
            } catch (error) {
                // If error -32004 happens (block data not available yet), this logs a warning
                if ((error as { code: number }).code === -32004) {
                    //console.warn(`Block data not available yet for slot: ${slot}, attempt: ${attempt}`);
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
