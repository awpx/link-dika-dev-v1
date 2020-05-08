const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const connect = mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })

    console.log(`MongoDB Connected: ${(await connect).connection.host} ...`)
  } catch (error) {
    console.error(error);
    process.exit(1)
  }
}

module.exports = connectDB
