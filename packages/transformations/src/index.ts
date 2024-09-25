/**
 * Index.ts at @indexer/transformations
 * 
 * Main file descriptions, thoughts, messages for other developers
 * etc. 
 * 
 * they could go in here
 * 
 */



/**
 * Main function declaration
 */
async function main(): Promise<void> {
    console.log('Hello from the transformations layer!!');
};


/**
 * Main function execution
 */
main()
    .catch((err) => {
        console.error('index.ts > FATAL: Error in the main function: ' + err)
    });

