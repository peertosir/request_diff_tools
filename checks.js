const fetch = require('node-fetch');
const diff = require('json-diff').diff;
const fs = require('fs');

const makeCheck = (url, url2, method, headers, resultFile) => {
  Promise.all([
    makeRequest(url, method, headers),
    makeRequest(url2, method, headers),
  ]).then((results) => {
    const diffResult = diff(results[0], results[1]);
    const answer =
      JSON.stringify({
        handler: url.split('/').slice(-2).join(' ').toUpperCase(),
        diffs: diffResult ? diffResult : 'NO DIFF',
      }) + '\n';
    fs.appendFileSync(resultFile, answer);
  });
};

const makeRequest = (url, method, headers) => {
  return fetch(url, {
    method,
    headers,
  }).then((data) => data.json());
};

module.exports = makeCheck;
