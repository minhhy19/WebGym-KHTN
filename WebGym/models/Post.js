var rep = require('./Repository');

exports.getPosts = async() => {
	return await rep.fetchAll('Post');
}

exports.add = async(o) => {
	return await rep.add('Post', o);
}

exports.edit = async(id, o) => {
	return await rep.edit('Post', id, o);
}

exports.getPostById = async(id) => {
	return await rep.fetchOne('Post', id);
} 