const app = require("./app");

const {PORT} = process.env
// process.env.PORT


app.listen(PORT, () => {
    "Listening at 4000"
});
