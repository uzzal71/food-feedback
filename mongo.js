import mongoose from "mongoose";

const uri = `mongodb://127.0.0.1:27017/food-feedback`;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

const connectWithDb = async () => {
    const connectionResult = await mongoose.connect(uri, options);
    console.log(`Database connected`);
    return true;
};

export default connectWithDb;