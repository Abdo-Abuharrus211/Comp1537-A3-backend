const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


const app = express();
app.use(cors());
app.use(express.json());

const unicornModel = require('./models/unicorns.js');


app.post('/search', async (req, res) => {
    console.log(req.body);
    let selectionArgument = {};
    let projectionArgument = {};

    if (req.body.type === "nameSearch") {
        if (req.body.name) {
            selectionArgument = { name: { $regex: new RegExp(req.body.name, "i") } };
        }

        if (req.body.includeWeight) {
            projectionArgument.weight = 1;
        }
    } else if (req.body.type === "foodSearch") {
        let foodQuery = [];

        if (req.body.includeApple) {
            foodQuery.push("apple");
        }

        if (req.body.includeCarrot) {
            foodQuery.push("carrot");
        }

        if (foodQuery.length) {
            selectionArgument.loves = { $all: foodQuery };
        }
    } else if (req.body.type === "weightSearch") {
        if (req.body.minimumWeight) {
            selectionArgument.weight = { $gte: parseInt(req.body.minimumWeight) };
        }

        if (req.body.includeName) {
            projectionArgument.name = 1;
        }
    } else {
        res.status(400).json({ error: "Invalid search type" });
        return;
    }

    try {
        const result = await unicornModel.find(selectionArgument, projectionArgument);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = app;