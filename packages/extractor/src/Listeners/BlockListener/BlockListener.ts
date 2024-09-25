import * as web3 from '@solana/web3.js'

/**
 * ### Block Listener class
 * 
 * I listen to the solana chain and whenever a new block pops up, i catch it
 * and feed it into the rest of the system
 * 
 * I am the entrypoint of the system
 * 
 */
export class BlockListener {


    /** Properties */
    _wssUrl: string;
    _httpsUrl: string;
    _connection: web3.Connection; 
    _blockData: any; // This stores data about the current block


    /** Constructor */
    constructor( wssUrl: string, httpsUrl: string ) {
        this._wssUrl = wssUrl;
        this._httpsUrl = httpsUrl;
        this._connection = new web3.Connection(this._httpsUrl, {wsEndpoint: this._wssUrl});
    };


    async listen() {
        this._connection.onSlotChange(async (slotInfo) => {
            try {
                const block = await this._connection.getBlock(slotInfo.slot); // Extract slot number

                this._blockData = block;
                console.log("New block received: " + JSON.stringify(this._blockData));
            } catch (error) {
                if ((error as { code: number }).code === -32004) {
                    console.warn("Block data not available yet for slot:", slotInfo.slot);
                } else {
                    console.error("Error fetching block data:", error);
                }
            }
        });
    }


};
