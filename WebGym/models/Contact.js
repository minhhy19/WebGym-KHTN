var rep = require('./Repository');

exports.getContacts = async() => {
	return await rep.fetchAll('Contact');
}

exports.add = async(o) => {
	return await rep.add('Contact', o);
}

exports.edit = async(id, o) => {
	return await rep.edit('Contact', id, o);
}

exports.getContactById = async(id) => {
	return await rep.fetchOne('Contact', id);
}