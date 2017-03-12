import config from '../config/Config'
import Post from '../models/Post'
import fetch from '../dotvue/DotvueFetch'

export default {

    all: async () : Promise<Post[]> => {
        let response = await fetch(config.apiBase + '/api/posts')
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        let content = await response.json()
        console.log(content)
        return content
    }

}