// const fetch = require('node-fetch');
const fs = require('fs');
const makeChecks = require('./checks');

let rawSettingsData = fs.readFileSync('preset.json');

const { handlers, host1, host2, resultsFileName } = JSON.parse(rawSettingsData);

for (let api of handlers) {
  for (let version of api['versions']) {
    const request1 = host1 + `v${version}` + api['url'] + api['queryParams'];
    const request2 = host2 + `v${version}` + api['url'] + api['queryParams'];
    makeChecks(
      request1,
      request2,
      api['method'],
      api['headers'],
      resultsFileName
    );
  }
}
