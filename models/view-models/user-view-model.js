export class userViewModel {
    constructor(user) {
        this.id = user._id;
        this.name = user.name;
        this.email = user.email;
        this.username = user.username;
        this.role = user.role;
        this.avatar = user.avatar;
        this.createdAt = user.createdAt;
    }
}
