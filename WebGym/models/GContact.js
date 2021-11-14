var rep = require('./Repository');
exports.getGContacts = async() => {
	return await rep.fetchAll('GContact');
}

exports.add = async(o) => {
	o['cid'] = rep.getId(o['cid']);
	return await rep.add('GContact', o);
}

exports.edit = async(id, o) => {
	return await rep.edit('GContact', id, o);
}

exports.getGContactById = async(id) => {
	return await rep.fetchOne('GContact', id);
}