function insert(data) {

    const mongoClient = require("mongodb").MongoClient;
    mongoClient.connect("mongodb://localhost", (err, client) => {
        if (err) return console.log(err)
        var db = client.db('payments')
        db.collection('payment').save(data, (err, result) => {
            if (err) return console.log(err)
        })
    })


}


module.exports = {
    insert: insert
}