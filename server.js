const {connect} = require("mongoose");

const express = require("express");

const router = require("./src/router")

const app = express();

const port = process.env.PORT || 8080

app.use(express.json());

router(app);


app.listen(port, () => {
    const url = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}`
     connect(
        url,
        { useNewUrlParser: true, useUnifiedTopology: true }
      ).then(() => console.log(`App listening at :${port}`)).catch(console.error);
})