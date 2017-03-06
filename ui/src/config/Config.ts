declare const DEVENV: any

const config = {
    apiBase: ''
}

if (typeof(DEVENV) !== 'undefined' && (DEVENV == 'ssr' || DEVENV == 'prod')){
    config.apiBase = 'http://dockerhost:48000'
}

export default config
