const { JSDOM } = require('jsdom')
async function crawlPage(baseUrl,currentUrl,pages) {
    //console.log("actively crawling", currentUrl);
    try {
        const baseUrlObj = new URL(baseUrl)
        const currentUrlObj = new URL(currentUrl)
        if(baseUrlObj.hostname !== currentUrlObj.hostname){
            return pages
        }
    
        const normalizeUrlCurrentUrl = normalizeUrl(currentUrl)
        if(pages[normalizeUrlCurrentUrl]>0){
            pages[normalizeUrlCurrentUrl]++
            return pages
        }
        pages[normalizeUrlCurrentUrl] = 1
    
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
            //console.log(htmlBody)
    
            const urls = getUrlsFromHtml(htmlBody, currentUrl)
            for (const url of urls) {
                crawlPage(baseUrl, url, pages)
            }
            return pages
        }
        catch (e) {
            return pages
        }
    } catch (error) {
        return pages
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
                urls.push(urlObj.href)
            }
            catch (e) {
                console.log(e)
            }
        } else {
            urls.push(link.href)
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