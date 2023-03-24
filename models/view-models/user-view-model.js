export class userViewModel {
    constructor(user) {
        this.id = user._id;
        this.username = user.username;
        this.createdAt = user.createdAt;
    }
}