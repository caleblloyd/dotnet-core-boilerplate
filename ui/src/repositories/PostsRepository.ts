import config from '../config/Config'
import Post from '../models/Post'
import fetch from '../dotvue/DotvueFetch'

export default class PostRepository {

    public static async all(): Promise<object[]> {
        let response = await fetch(config.apiBase + '/api/posts')
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        return await response.json()
    }

    public static async one(id: number): Promise<object> {
        let response = await fetch(config.apiBase + '/api/posts/' + id)
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        return await response.json()
    }

}
