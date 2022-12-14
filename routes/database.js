const express = require("express");

// contentRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /task.
const contentRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This helps convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// This section will help you get a list of all the users.
contentRoutes.route("/user").get(function (req, res) {
    let db_connect = dbo.getDb();

    // is the database ready??
    if (!db_connect) {
        res.status(503).json({ message: "Error - Mongo not ready" });
        console.log("Mongo not ready");
        return;
    }

    db_connect
        .collection("content")
        .find({ username: { $exists: true } })
        .toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

// This section will help you get a single activity by id
contentRoutes.route("/userid/:id").get(function (req, res) {
    let db_connect = dbo.getDb();

    // is the database ready??
    if (!db_connect) {
        res.status(503).json({ message: "Error - Mongo not ready" });
        console.log("Mongo not ready");
        return;
    }

    let myquery = { _id: ObjectId(req.params.id) };
    db_connect.collection("content").findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
    });
});

// This section will help you get a single user by username
contentRoutes.route("/user/:username").get(function (req, res) {
    let db_connect = dbo.getDb();

    // is the database ready??
    if (!db_connect) {
        res.status(503).json({ message: "Error - Mongo not ready" });
        console.log("Mongo not ready");
        return;
    }

    let myquery = { username: req.params.username };
    db_connect.collection("content").findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
    });
});

// This section will help you get a single user by username
contentRoutes.route("/userid/:id").get(function (req, res) {
    let db_connect = dbo.getDb();

    // is the database ready??
    if (!db_connect) {
        res.status(503).json({ message: "Error - Mongo not ready" });
        console.log("Mongo not ready");
        return;
    }

    let myquery = { _id: ObjectId(req.params.id) };
    db_connect.collection("content").findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
    });
});

// This section will help you create a new user.
contentRoutes.route("/user/add").post(function (req, res) {
    let db_connect = dbo.getDb();

    // is the database ready??
    if (!db_connect) {
        res.status(503).json({ message: "Error - Mongo not ready" });
        console.log("Mongo not ready");
        return;
    }

    let myobj = {
        username: req.body.username,
        fullName: req.body.fullName,
        activities: [],
        settings: {},
    };
    db_connect.collection("content").insertOne(myobj, function (err, result) {
        if (err) throw err;
        res.json(result);
    });
});

// This section will help you update a user by id.
contentRoutes.route("/user/update/:id").post(function (req, res) {
    let db_connect = dbo.getDb();

    // is the database ready??
    if (!db_connect) {
        res.status(503).json({ message: "Error - Mongo not ready" });
        console.log("Mongo not ready");
        return;
    }

    let myquery = { _id: ObjectId(req.params.id) };
    let newvalues = {
        $set: {
            username: req.body.username,
            fullName: req.body.fullName,
            activities: req.body.activities,
            settings: req.body.settings,
        },
    };

    db_connect
        .collection("content")
        .updateOne(myquery, newvalues, function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

// This section will help you delete a user
contentRoutes.route("/user/:id").delete((req, res) => {
    let db_connect = dbo.getDb();

    // is the database ready??
    if (!db_connect) {
        res.status(503).json({ message: "Error - Mongo not ready" });
        console.log("Mongo not ready");
        return;
    }

    let myquery = { _id: ObjectId(req.params.id) };

    db_connect.collection("content").deleteOne(myquery, function (err, obj) {
        if (err) throw err;
        res.json(obj);
    });
});

// This section will help you get a single activity by id
contentRoutes.route("/activity/:id").get(function (req, res) {
    let db_connect = dbo.getDb();

    // is the database ready??
    if (!db_connect) {
        res.status(503).json({ message: "Error - Mongo not ready" });
        console.log("Mongo not ready");
        return;
    }

    let myquery = { _id: ObjectId(req.params.id) };
    db_connect.collection("content").findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
    });
});

// This section will help you create a new activity.
contentRoutes.route("/activity/add").post(function (req, res) {
    let db_connect = dbo.getDb();

    // is the database ready??
    if (!db_connect) {
        res.status(503).json({ message: "Error - Mongo not ready" });
        console.log("Mongo not ready");
        return;
    }

    let myobj = {
        name: req.body.name,
        image: req.body.image,
        description: req.body.description,
        pages: [],
        version: req.body.version,
        home: req.body.home,
        vSize: req.body.vSize,
        behavior: req.body.behavior,
        variables: req.body.variables,
    };
    db_connect.collection("content").insertOne(myobj, function (err, result) {
        if (err) throw err;
        res.json(result);
    });
});

// This section will help you update an activity by id.
contentRoutes.route("/activity/update/:id").post(function (req, res) {
    let db_connect = dbo.getDb();

    // is the database ready??
    if (!db_connect) {
        res.status(503).json({ message: "Error - Mongo not ready" });
        console.log("Mongo not ready");
        return;
    }

    let myquery = { _id: ObjectId(req.params.id) };
    let newvalues = {
        $set: {
            name: req.body.name,
            image: req.body.image,
            description: req.body.description,
            pages: req.body.pages,
            version: req.body.version,
            home: ObjectId(req.body.home),
            vSize: req.body.vSize,
            behavior: req.body.behavior,
            variables: req.body.variables,
        },
    };

    db_connect
        .collection("content")
        .updateOne(myquery, newvalues, function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

// This section will help you delete an activity
contentRoutes.route("/activity/:id").delete((req, res) => {
    let db_connect = dbo.getDb();

    // is the database ready??
    if (!db_connect) {
        res.status(503).json({ message: "Error - Mongo not ready" });
        console.log("Mongo not ready");
        return;
    }

    let myquery = { _id: ObjectId(req.params.id) };

    db_connect.collection("content").deleteOne(myquery, function (err, obj) {
        if (err) throw err;
        res.json(obj);
    });
});

// This section will help you get a single page by id
contentRoutes.route("/page/:id").get(function (req, res) {
    let db_connect = dbo.getDb();

    // is the database ready??
    if (!db_connect) {
        res.status(503).json({ message: "Error - Mongo not ready" });
        console.log("Mongo not ready");
        return;
    }

    let myquery = { _id: ObjectId(req.params.id) };
    db_connect.collection("content").findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
    });
});

// This section will help you create a new page.
contentRoutes.route("/page/add").post(function (req, res) {
    let db_connect = dbo.getDb();

    // is the database ready??
    if (!db_connect) {
        res.status(503).json({ message: "Error - Mongo not ready" });
        console.log("Mongo not ready");
        return;
    }

    let myobj = {
        name: req.body.name,
        content: req.body.content,
        version: req.body.version,
    };
    db_connect.collection("content").insertOne(myobj, function (err, result) {
        if (err) throw err;
        res.json(result);
    });
});

// This section will help you update a page by id.
contentRoutes.route("/page/update/:id").post(function (req, res) {
    let db_connect = dbo.getDb();

    // is the database ready??
    if (!db_connect) {
        res.status(503).json({ message: "Error - Mongo not ready" });
        console.log("Mongo not ready");
        return;
    }

    let myquery = { _id: ObjectId(req.params.id) };
    let newvalues = {
        $set: {
            name: req.body.name,
            content: req.body.content,
            version: req.body.version,
        },
    };

    db_connect
        .collection("content")
        .updateOne(myquery, newvalues, function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

// This section will help you delete a page
contentRoutes.route("/page/:id").delete((req, res) => {
    let db_connect = dbo.getDb();

    // is the database ready??
    if (!db_connect) {
        res.status(503).json({ message: "Error - Mongo not ready" });
        console.log("Mongo not ready");
        return;
    }

    let myquery = { _id: ObjectId(req.params.id) };

    db_connect.collection("content").deleteOne(myquery, function (err, obj) {
        if (err) throw err;
        res.json(obj);
    });
});

module.exports = contentRoutes;
