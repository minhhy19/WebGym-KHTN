var rep = require('./Repository');

exports.add = async(o) => {
	return await rep.add('Trainer', o);
}

exports.edit = async(id, o) => {
	return await rep.edit('Trainer', id, o);
}


exports.getTrainers = async() => {
	return await rep.fetchAll('Trainer');
}

exports.getTrainerById = async (id) => {
	return await rep.fetchOne('Trainer', id);
}