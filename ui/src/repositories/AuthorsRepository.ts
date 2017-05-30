import config from '../config/Config'
import Author from '../models/Author'
import fetch from '../dotvue/DotvueFetch'

export default class AuthorsRepository {

    public static async all(): Promise<object[]> {
        let response = await fetch(config.apiBase + '/api/authors')
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        return await response.json()
    }

    public static async one(id: number): Promise<object> {
        let response = await fetch(config.apiBase + '/api/authors/' + id)
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        return await response.json()
    }

}
