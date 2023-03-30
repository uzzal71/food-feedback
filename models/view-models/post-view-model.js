export class postViewModel {
    constructor(post) {
        this.id = post._id;
        this.title = post.title;
        this.body = post.body;
        this.thumbnail = post.thumbnail;
        this.location = post.location;
        this.totalLike = post.totalLike;
        this.comments = post.comments;
        this.author = {
            username: post.author.username,
            avatar: post.author.avatar,
        };
        this.createdAt = post.createdAt;
    }
}
