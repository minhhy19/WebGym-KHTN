var rep = require('./Repository');

exports.add = async(o) => {
	return await rep.add('Client', o);
}

exports.edit = async(id, o) => {
	return await rep.edit('Client', id, o);
}


exports.getClients = async() => {
	return await rep.fetchAll('Client');
}

exports.getClientById = async (id) => {
	return await rep.fetchOne('Client', id);
}