var rep = require('./Repository');

exports.add = async(o) => {
	return await rep.add('Gallery', o);
}

exports.edit = async(id, o) => {
	return await rep.edit('Gallery', id, o);
}


exports.getImages = async() => {
	return await rep.fetchAll('Gallery');
}

exports.getImageById = async (id) => {
	return await rep.fetchOne('Gallery', id);
}