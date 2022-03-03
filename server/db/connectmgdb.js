const { MongoClient } = require('mongodb');

const uri = "mongodb://wnos278Admin:12345@localhost:27017/?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";
exports.insertData = async (data) => {
    const client = await MongoClient.connect(uri, { useNewUrlParser: true })
        .catch(err => { console.log(err); });
    if (!client) {
        return;
    }
    try {
        const db = client.db("test");
        let collection = db.collection('messages');
        await collection.insertOne(data);
        console.log("1 document inserted");
        return 1;
    } catch (err) {
        console.log(err);
    } finally {
        client.close();
    }
    return null;
}

exports.selectLastestData = async () => {
    const client = await MongoClient.connect(uri, { useNewUrlParser: true })
        .catch(err => { console.log(err); });
    if (!client) {
        return;
    }
    try {
        const db = client.db("test");
        let collection = db.collection('messages');
        var query = {  };
        var sorttime = {"timestamp" : 1}; // sắp xếp theo timestamp
        let res = await collection.find(query).sort(sorttime).toArray();
        res  = res.slice(-1);
        return res[0];
    } catch (err) {
        console.log(err);
    } finally {
        client.close();
    }
    return null;
}

// main().catch(console.error);