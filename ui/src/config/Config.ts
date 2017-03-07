declare const DEVENV: any

const config = {
    apiBase: ''
}

if (typeof(DEVENV) !== 'undefined' && (DEVENV == 'ssr' || DEVENV == 'prod')){
    config.apiBase = 'http://nginx'
}

export default config
