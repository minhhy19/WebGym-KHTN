var rep = require('./Repository');

exports.addMany = async (arr) => {
	return await rep.addMany('Stock', arr);
}

exports.getStocks = async () => {
	return await rep.fetchAll('Stock');
}

