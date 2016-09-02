const fetch = require('node-fetch');

const today_json = 'https://registry.npmjs.org/-/all/static/today.json';

function getRecentlyUpdated(url=today_json) {
  return fetch(url)
    .then((res) => res.json());
}

module.exports = {
  getRecentlyUpdated
};
