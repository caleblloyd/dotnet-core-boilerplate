var fetchPolyfill: any
if (typeof (window) !== 'undefined') {
    fetchPolyfill = fetch
} else {
    fetchPolyfill = require('node-fetch').default
}

export default fetchPolyfill as (input: RequestInfo, init?: RequestInit) => Promise<Response>
