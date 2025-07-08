# 🕷️ Minimal CLI Web Crawler (Node.js)

A simple command-line web crawler built with Node.js. It recursively crawls a website, collecting and counting all internal links.

## 📦 Features

- Crawls all internal pages from a base URL
- Counts how many times each URL is linked
- Outputs a page map to the console

## 🚀 How to Run


```bash
1. Clone this repo:
- git clone https://github.com/Mapur2/webCrawler
- cd webCrawler
2. Install dependencies:
- npm install
3. Run the crawler:
- npm start https://example.com
- Replace https://example.com with any valid website URL.

🧠 Example Output
{
  "https://example.com": 1,
  "https://example.com/about": 1,
  "https://example.com/contact": 1
}
