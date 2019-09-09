const express = require('express');
const router = express.Router();
const db = require('../data/db');
const {
    validateBody,
    validateId,
} = require('../middleware');

router.post('/', validateBody, (req, res) => {
    const newAccount = req.body;
    db.addAccount(newAccount)
    .then(response => {
        console.log(response);
        res.status(201).json({ message: "Account successfully created." });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: "Server error creating Account." });
    })
});

router.get('/', (req, res) => {
    db.getAccounts()
    .then(accounts => {
        res.status(200).json(accounts);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: "Server error getting accounts." });
    })
});

router.get('/:id', validateId, (req, res) => {
    const { id } = req.params;

    db.getAccountById(id)
    .then(account => {
        res.status(200).json(account);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: "Server error getting account by ID." });
    })
});

router.put('/:id',validateId, validateBody, (req, res) => {
    const { id } = req.params;

    db.updateAccount(id, req.body)
    .then(account => {
        res.status(201).json({ message: "Account updated successfully." });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: "Server error updating account." });
    })
});

router.delete('/:id', validateId, (req, res) => {
    const { id } = req.params;

    db.deleteAccount(id)
    .then(response => {
        res.status(200).json({ message: "Account deleted successfully." });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: "Server error deleting account." });
    })
})

module.exports = router;