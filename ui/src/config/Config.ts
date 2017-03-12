declare const DEVENV: string
declare const RUNTIMEENV: string

let config = {
    apiBase: ''
}

if (RUNTIMEENV == 'server'){
    if (DEVENV == 'alpha' || DEVENV == 'beta' || DEVENV == 'prod')
        config.apiBase = 'http://localhost:8000'
    else
        config.apiBase = 'http://nginx:8000'
}

export default config
