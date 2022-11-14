const mongoose = require("mongoose")
// DB url
const {MONGO_URL} = process.env


// export mongoose connection
exports.connect = () => {
    mongoose.connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(console.log(`DB connection sccess`))
    .catch( error => {
        console.log(`DB connection failed`);
        console.log(error);
        process.exit(1)
    })

}