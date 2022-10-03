const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json({ limit: "10mb", extended: true }));
app.use(
    express.urlencoded({ limit: "10mb", extended: true, parameterLimit: 50000 })
);
app.use(require("./routes/database"));

// get driver connection
const dbo = require("./db/conn");

async function cloneCollection(_db) {
    _db.collection("content-clone")
        .find({})
        .toArray(function (err, result) {
            if (err) throw err;
            result.forEach(function (doc) {
                _db.collection("content").insertOne(doc);
            });
        });
}

app.listen(port, () => {
    // perform a database connection when server starts
    dbo.connectToServer(function (err) {
        if (err) console.error(err);
        //cloneCollection(dbo.getDb());
    });

    console.log(`Server is running on port: ${port}`);
});
