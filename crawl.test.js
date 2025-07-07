const { normalizeUrl,getUrlsFromHtml } = require('./crawl.js');
const { test, expect } = require('@jest/globals');

test('normalizeUrl: strip protocol', () => {
    const input = 'https://mapur2.github.io/path/'
    const actual = normalizeUrl(input)
    const expected = "mapur2.github.io/path"
    expect(actual).toEqual(expected)
})

test('normalizeUrl: capitals', () => {
    const input = 'https://Mapur2.github.io/path/'
    const actual = normalizeUrl(input)
    const expected = "mapur2.github.io/path"
    expect(actual).toEqual(expected)
})

test('getUrlsFromHtml', () => {
    const inputHtmlBody = '<html><body><a href="https://mapur2.github.io">Link</a></body></html>'
    const inputBaseUrl = 'https://mapur2.github.io'
    const actual = getUrlsFromHtml(inputHtmlBody, inputBaseUrl)
    const expected = ["https://mapur2.github.io/"]
    expect(actual).toEqual(expected)
})

test('getUrlsFromHtml: relative', () => {
    const inputHtmlBody = '<html><body><a href="/path">Link</a></body></html>'
    const inputBaseUrl = 'https://mapur2.github.io'
    const actual = getUrlsFromHtml(inputHtmlBody, inputBaseUrl)
    const expected = ["https://mapur2.github.io/path"]
    expect(actual).toEqual(expected)
})