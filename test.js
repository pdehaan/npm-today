const { checkLatest } = require('nsp-check-remote');
const { getRecentlyUpdated } = require('./index');

getRecentlyUpdated(null, {count: 6})
  .then((packages) => Promise.all(packages.map(checkNsp)))
  .then((res) => console.log(JSON.stringify(res, null, 2)))
  .catch((err) => console.error(err));

function checkNsp(pkg) {
  return checkLatest(pkg.name, 'summary')
    .then(({data, err, output}) => {
      // Inject nsp response into package.json object.
      return Object.assign(pkg, {_nsp: {err, data, output}});
    });
}
