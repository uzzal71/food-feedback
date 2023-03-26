import mongoose from "mongoose";

const uri = `mongodb://localhost:27017/food-feedback`;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

const connectWithDb = async () => {
    const connectionResult = await mongoose.connect(uri, options);
    return true;
};

export default connectWithDb;