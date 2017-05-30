import Post from './Post'

export default class Author {

    public static convertAll(models: object[]): Author[] {
        let converted = new Array<Author>()
        for (let model of models) {
            converted.push(new Author(model))
        }
        return converted
    }

    constructor(model?: object){
        if (model){
            Object.assign(this, model)
            if (this.posts){
                this.posts = Post.convertAll(this.posts)
            }
        }
    }

    public id: number;

    public name: string;

    public posts: Post[];

}