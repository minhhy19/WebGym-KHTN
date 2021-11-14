var rep = require('./Repository');

exports.add = async(o) => {
	return await rep.add('Banner', o);
}

exports.getBanners = async() => {
	return await rep.fetchAll('Banner');
}

exports.getBannerById = async(id) => {
	return await rep.fetchOne('Banner', id);
}

exports.edit = async(id, o) => {
	return await rep.edit('Banner', id, o);
}
