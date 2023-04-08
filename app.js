const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


const app = express();
app.use(cors());
app.use(express.json());

const unicornModel = require('./models/unicorns.js');


app.post('/search', async (req, res) => {
    // todo process client request
    console.log(req.body);

    if (req.body.type == "nameSearch") {

        var selectionArgument = {}
        if (req.body.name) {
            selectionArgument = { name: req.body.name };
        }

        var projectionArgument = {};
        // Projection must ONLY include an Inlusion or Exclusion
        // see below for how fields are included by assigning a value of 1

        if (req.body.projectionFilters.name == true && req.body.projectionFilters.weight == false) {
            projectionArgument = {"name": 1, _id: 0};
        } else {
            console.log("Can't find name");
        }
        const result = await unicornModel.find(selectionArgument, projectionArgument);
        res.json(result)
    }

    //////////////////////////// 
    // This  weight search
    if (req.body.type == "weightSearch") {
        const selectionArgument = {
            name: req.body.name,
            weight: req.body.weight
        }
        if (req.body.projectionFilters.name == false && req.body.projectionFilters.weight == true) {
            projectionArgument = {"weight": 1, "weight": 1, _id: 0};
        } else {
            console.log("Can't find weight");
        }
        const result = await unicornModel.find(selectionArgument, projectionArgument);
        res.json(result)
    }

    ////////////////////////////
    // This is food search
    if (req.body.type == "foodSearch") {
        const selectionArgument = {
            name: req.body.name,
            loves: req.body.loves
        }
        if (req.body.projectionFilters.name == true && req.body.projectionFilters.weight == false && req.body.projectionFilters.loves == true) {
            projectionArgument = { "name": 1, "loves":1, _id: 0};
        } else {
            console.log("Can't find food");
        }
        const result = await unicornModel.find(selectionArgument, projectionArgument);
        res.json(result)
    }

});

module.exports = app;