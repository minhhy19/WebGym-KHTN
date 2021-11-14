var mongodb = require('mongodb');
var url ='mongodb://localhost:27017';

var opt ={useUnifiedTopology:true};

exports.getId = (id) => {
	return mongodb.ObjectId(id);
}

exports.fetchAll = async(table, where) => {
    var client = await mongodb.MongoClient(url,opt).connect(); //tao bien doi ket noi
    var db =client.db('Gym'); //khi co  tin hieu thi 
    if (where == undefined) {
    	return await db.collection(table).find().toArray();
    } else {
    	return await db.collection(table).find(where).toArray();
     // mo member va insert 1 oject
    }
}

exports.fetchOne = async(table, id) => {
    var client = await mongodb.MongoClient(url,opt).connect(); //tao bien doi ket noi
    var db =client.db('Gym'); //khi co  tin hieu thi 
    return await db.collection(table).findOne({_id: mongodb.ObjectId(id)});
}

exports.add = async(table, o) => {
    var client = await mongodb.MongoClient(url,opt).connect(); //tao bien doi ket noi
    var db =client.db('Gym'); //khi co  tin hieu thi 
    var ret = await db.collection(table).insertOne(o); // mo table va insert 1 oject
    return ret.result;
}

exports.edit = async(table, id, o) => {
    var client = await mongodb.MongoClient(url,opt).connect(); //tao bien doi ket noi
    var db =client.db('Gym'); //khi co  tin hieu thi 
    var ret = await db.collection(table).updateOne({_id: mongodb.ObjectId(id)}, {$set: o}); // mo member va insert 1 oject
    return ret.result;
}

exports.addMany = async(table, arr) => {
    var client = await mongodb.MongoClient(url,opt).connect(); //tao bien doi ket noi
    var db =client.db('Gym'); //khi co  tin hieu thi 
    var ret = await db.collection(table).insertMany(arr); // mo member va insert 1 oject
    return ret;
}