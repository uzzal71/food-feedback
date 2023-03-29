import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    isVerify: { type: Boolean, required: true, default: false },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    },
    avatar: { type: String, default: 'default.png' },
    deletedAt: { type: Date, default: null },
    createdAt: { type: Date },
    updatedAt: { type: Date }
});

userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

userSchema.methods.checkPassword = async function (password) {
    const user = this;
    console.log(password);
    console.log(user.password);
    return await bcrypt.compare(password, user.password);
};

userSchema.methods.setPassword = async function (password) {
    const user = this;
    const hashedPassword = await bcrypt.hash(password, 8);
    user.password = hashedPassword;
    user.save();
};

const User = mongoose.model("User", userSchema);

export default User;
