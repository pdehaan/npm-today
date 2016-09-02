const { checkLatest } = require('nsp-check-remote');
const { getRecentlyUpdated } = require('./index');

getRecentlyUpdated()
  .then((packages) => packages.slice(0, 10))
  .then((packages) => packages.map(({name}) => {
    return checkLatest(name, 'summary')
      .then(({data, err, output, package}) => {
        // Inject nsp response into package.json response.
        return Object.assign(package, {_nsp: {err, data, output}});
      });
  }))
  .then((promises) => Promise.all(promises))
  .then((res) => console.log(JSON.stringify(res, null, 2)))
  .catch((err) => console.error(err));
