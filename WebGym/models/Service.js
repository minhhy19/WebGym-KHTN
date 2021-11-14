var rep = require('./Repository');

exports.getServices = async() => {
	return await rep.fetchAll('Service');
}

exports.add = async(o) => {
	return await rep.add('Service', o);
}

exports.edit = async(id, o) => {
	return await rep.edit('Service', id, o);
}

exports.getServiceById = async(id) => {
	return await rep.fetchOne('Service', id);
}