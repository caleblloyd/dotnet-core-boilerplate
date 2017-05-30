declare const BUILD_DEVENV: string
declare const RUNTIME_ENV: string

let config = {
    apiBase: ''
}

if (RUNTIME_ENV == 'server') {
    const DEVENV = process.env.DEVENV

    if (DEVENV == 'alpha' || DEVENV == 'beta' || DEVENV == 'prod')
        config.apiBase = 'http://localhost:8001'
    else
        config.apiBase = 'http://nginx:8001'
}

export default config
