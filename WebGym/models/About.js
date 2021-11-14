var rep = require('./Repository');

exports.getAbouts = async() => {
	return await rep.fetchAll('About');
}

exports.add = async(o) => {
	return await rep.add('About', o);
}

exports.getAboutById = async(id) => {
	return await rep.fetchOne('About', id);
}

exports.edit = async(id, o) => {
	return await rep.edit('About', id, o);
}