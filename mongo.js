import mongoose from "mongoose";

const uri = `mongodb+srv://Uzzalroy_96:Uzzalroy_96@cluster0.ysa2z.mongodb.net/FoodFeedback?retryWrites=true&w=majority`;

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