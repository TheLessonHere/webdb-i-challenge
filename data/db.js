const db = require('./dbConfig');

function getAccounts() {
    return db('accounts')
};

function getAccountById(id) {
    return db('accounts')
            .where({id})
            .first()
};

function addAccount(account) {
    return db('accounts')
            .returning(['id','name','budget'])
            .insert(account)
            .then(id=> getAccountById(id[0]))
};

function updateAccount(id, account) {
    return db('accounts')
            .where({id})
            .update(account)
            .then(ids=> {
                if(ids>= 1) {
                    return getAccountById(id)
                }
            })
}

function deleteAccount(id) {
    return db('accounts')
            .where({id})
};


module.exports = {
    getAccounts, 
    addAccount, 
    getAccountById,
    updateAccount,
    deleteAccount
};