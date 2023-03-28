export class postViewModel {
    constructor(post) {
        this.id = post._id;
        this.title = post.title;
        this.body = post.body;
        this.location = post.location;
        this.totalLike = post.totalLike;
        this.comments = post.comments;
        this.owner = {
            username: post.owner.username,
            avatar: post.owner.avatar,
        };
        this.createdAt = post.createdAt;
    }
}