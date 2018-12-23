const nconf = require('nconf');

nconf.argv()
   .env()
   .file('config', `${process.cwd()}/config/config.json`);

module.exports = nconf;
