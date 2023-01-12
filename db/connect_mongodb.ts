const mongoose = require('mongoose');
mongoose.set("strictQuery", false);
const connectDB = () => mongoose.connect(process.env.MONGO_URL);
export {connectDB};
