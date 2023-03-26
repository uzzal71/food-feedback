import mongoose from "mongoose";

// schema 
const userSchema = new mongoose.Schema({
    name : { type: String, required: true},
    email : { type: String, unique: true, required: true},
    username : { type: String, unique: true, required: true},
    password : { type: String, required: true},
    isVerify : { type: Boolean, required: true, default: false},
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    },
    avater: { type: String, default: 'profile/default.png' },
    deleteAt : { type: Date, default: null },
    createdAt : { type: Date },
    updatedAt : { type: Date }
});

// userSchema.pre('save', async (next) => {
//     const user = this;
//     if (user.isModified('password')) {
//       user.password = await bcrypt.hash(user.password, 8);
//     }
//     next();
//   });
  
//   userSchema.methods.checkPassword = async (password) => {
//     const user = this;
//     return await bcrypt.compare(password, user.password);
//   };

// reference model
const User = mongoose.model("User", userSchema);

export default User;