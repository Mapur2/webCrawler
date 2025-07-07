const {crawlPage} = require("./crawl.js")
function main() {
    if(process.argv.length!=3){
        console.log("no website provided")
        process.exit(1)
    }
    
    console.log("Starting crawl");
    const baseUrl = process.argv[2]
    crawlPage(baseUrl)
}

main()