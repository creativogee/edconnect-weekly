const { config } = require('../config/env');
const baseUrl = config.baseUrl ?? `http://localhost:${config.port}`;
module.exports = baseUrl;
