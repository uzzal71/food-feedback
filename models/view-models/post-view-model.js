export class postViewModel {
    constructor(post) {
        this.id = post._id;
        this.title = post.title;
        this.body = post.body;
        this.location = post.location;
        this.owner = post.owner;
        this.totalLike = post.totalLike;
        this.comments = post.comments;
        this.createdAt = post.createdAt;
    }
}