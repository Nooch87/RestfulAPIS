const { MongoClient } = require('mongodb');
const data = require('./booksJson.json');

async function importData() {
    const connectionUrl = 'mongodb+srv://PS_Training_Admin:15PPKuFyzY7wOafC@banuchi-training.lm2g3.mongodb.net';
    const dbName = 'bookAPI';

    const client = new MongoClient(connectionUrl);
    await client.connect();

    const db = client.db(dbName);
    const coll = db.collection(dbName);

    await coll.deleteMany([], () => { });

    await coll.insertMany(data);

    client.close();
}

importData();