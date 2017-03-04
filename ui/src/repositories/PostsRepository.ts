import Post from '../models/Post'

export default {

    all: async () : Promise<Post[]> => {
        let response = await fetch('/api/posts')
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        let content = await response.json()
        console.log(content)
        return content
    }

}