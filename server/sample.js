const yelp = require('yelp-fusion');

const apiKey = 'KbUdeX7O906eB_dhP7FJjkhUTwvSW6VR42sZhvIiCZakOQHU8nqIX-havIf-oXq-LwRm1xF3V-OHQ6c4c3A-X8KE45ZFCZzirT64fFfdZuRY2tLrEAFs2JqEOsy4X3Yx';

const searchRequest = {
  term:'Starbucks',
  location: 'milton, on'
};

const client = yelp.client(apiKey);
const data; 
client.search(searchRequest).then(response => {
  const firstResult = response.jsonBody.businesses[0];
  const prettyJson = JSON.stringify(firstResult, null, 4);
  console.log(firstResult);
}).catch(e => {
  console.log(e);
});


