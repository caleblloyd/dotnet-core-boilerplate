declare const BUILD_DEVENV: string
declare const RUNTIME_ENV: string

let config = {
    apiBase: ''
}

if (RUNTIME_ENV == 'server') {
    const DEVENV = process.env.DEVENV
    config.apiBase = 'http://nginx:8001'
}

export default config