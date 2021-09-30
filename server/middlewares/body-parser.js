const body_parser = require('body-parser');

const { json, urlencoded } = body_parser;

const bodyParser = {
  json: json(),
  urlencoded: urlencoded({
    extended: true,
  }),
};

module.exports = bodyParser;
