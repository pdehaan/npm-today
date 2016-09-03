const { getRecentlyUpdated } = require('./index');

getRecentlyUpdated(null, {count:2})
  .then((packages) => console.log(JSON.stringify(packages, null, 2)))
  .catch((err) => console.error(err));
