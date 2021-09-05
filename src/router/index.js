// const privateRoutes = require("./private")
const publicRoutes = require("./public")

module.exports = (app) => {
    app.use("/", publicRoutes);
    // app.use("/api", privateRoutes);
}