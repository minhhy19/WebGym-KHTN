var rep = require('./Repository');

exports.addMany = async (arr) => {
	return await rep.addMany('Popular', arr);
}

exports.getPopulars = async () => {
	return await rep.fetchAll('Popular');
}

