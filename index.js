const app = require("./app");

const {PORT} = process.env
// process.env.PORT

// listening at port 
app.listen(PORT, () => {
    console.log(`Listening at ${PORT}`);
});
