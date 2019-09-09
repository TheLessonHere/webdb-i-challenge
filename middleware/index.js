const db = require('../data/db');

function validateBody(req, res, next) {
    if(!Object.keys(req.body).length) {
        res.status(400).json({ error: "No request body given" });
    } if(!req.body.name || !req.body.budget) {
        res.status(400).json({ error: "Name and Budget are required fields" });
    } if(typeof(req.body.name) !== 'string' || !Number(req.body.budget)) {
        res.status(400).json({ error: "Name or Budget incorrectly formatted." });
    } else {
        next();
    }
};

function validateId(req, res, next) {
    const { id } = req.params;
    if(!Number(id)) {
        res.status(400).json({ error: "ID incorrectly formatted." });
    } else {
        db.getAccountById(id)
        .then(account => {
            if(account){
                next();
            } else {
                res.status(404).json({ error: "Account with the given id doesn't exist." })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Server error finding account." })
        })
    }
};

module.exports = {validateBody, validateId}