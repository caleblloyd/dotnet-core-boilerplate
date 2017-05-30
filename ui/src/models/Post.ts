import Author from './Author'

export default class Post {

    public static convertAll(models: object[]): Post[] {
        let converted = new Array<Post>()
        for (let model of models) {
            converted.push(new Post(model))
        }
        return converted
    }

    constructor(model?: object){
        if (model){
            Object.assign(this, model)
            if (this.author){
                this.author = new Author(this.author)
            }
        }
    }

    public id: number

    public title: string

    public content: string

    public authorId: number

    public author: Author

    public get preview(): string {
        return this.content.split('<!--more-->')[0]
    }

}