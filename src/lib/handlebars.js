// Isso salva o tempo de criação do produto para adicioná-lo ao banco de dados depois!
const timeago = require('timeago.js');
const timeagoInstance = timeago();
const helpers = {};

helpers.timeago = (savedTimestamp) => {
    return timeagoInstance.format(savedTimestamp);
};

module.exports = helpers;