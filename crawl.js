const { JSDOM } = require('jsdom')
async function crawlPage(currentUrl) {
    console.log("actively crawling", currentUrl);
    try {
        const response = await fetch(currentUrl)
        if(response.status>399){
            throw new Error("bad status code")
        }
        const contentType = response.headers.get("content-type")
        if(!contentType.includes("text/html")){
            throw new Error("no html response")
        }

        const htmlBody = await response.text()
        console.log(htmlBody)
    }
    catch (e) {
        console.log(e.message)
    }
}


function getUrlsFromHtml(htmlBody, baseUrl) {
    const urls = []
    const dom = new JSDOM(htmlBody)
    const links = dom.window.document.querySelectorAll('a')
    for (const link of links) {
        if (link.href.startsWith("/")) {
            // relative
            try {
                const urlObj = new URL(link.href, baseUrl)
                urls.push(normalizeUrl(urlObj.href))
            }
            catch (e) {
                console.log(e)
            }
        } else {
            urls.push(normalizeUrl(link.href))
        }
    }
    return urls;
}

function normalizeUrl(url) {
    const urlObj = new URL(url)
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`
    if (hostPath.length > 0 && hostPath.slice(hostPath.length - 1) === "/") {
        return hostPath.slice(0, hostPath.length - 1)
    }
    return hostPath.toLowerCase()
}

module.exports = {
    normalizeUrl, getUrlsFromHtml, crawlPage
}