import config from '../config/Config'
import Author from '../models/Author'
import fetch from '../dotvue/DotvueFetch'

export default {

    all: async () : Promise<Author[]> => {
        let response = await fetch(config.apiBase + '/api/authors')
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        let content = await response.json()
        console.log(content)
        return content
    }

}