import { connect } from "mongoose";

const connectDB = async () => {
  try {
    // TODO: There is some problem with new version of mongoose, need to read the docs
    const conn = await connect(process.env.MONGO_URI!, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;
