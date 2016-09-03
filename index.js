const fetch = require('node-fetch');
const Package = require('nice-package');

const today_json = 'https://registry.npmjs.org/-/all/static/today.json';

function getRecentlyUpdated(url=today_json, options={}) {
  const count = options.count ? parseInt(options.count, 10) : 100;
  return fetch(url || today_json)
    .then((res) => res.json())
    .then((packages) => count ? packages.slice(0, count) : packages)
    .then((packages) => cleanPackages(packages));
}

function cleanPackages(packages) {
  const filterFunc = (pkg) => !!pkg.modified;
  return packages.map((pkg) => {
    // Delete the `dist-tags` key, because it causes nice-package's dependency to :poop:.
    // This must be called before passing to the Package() constructor.
    delete pkg['dist-tags'];
    pkg = new Package(pkg);
    // Convert the `repository` to just the pretty HTTPS URL.
    pkg.repository = pkg.repository && pkg.repository.https_url || pkg.repository;

    // Delete a couple more unwanted keys.
    delete pkg.readmeFilename;
    delete pkg.versions;

    return pkg;
  }).filter(filterFunc); // It's possible that the package has already been deleted from the repo. ¯\_(ツ)_/¯
}

module.exports = {
  getRecentlyUpdated,
  today_json
};
