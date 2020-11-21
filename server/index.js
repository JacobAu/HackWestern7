const express = require("express");
const cors = require("cors");
const app = express();
const yelp = require('yelp-fusion');

const apiKey = 'KbUdeX7O906eB_dhP7FJjkhUTwvSW6VR42sZhvIiCZakOQHU8nqIX-havIf-oXq-LwRm1xF3V-OHQ6c4c3A-X8KE45ZFCZzirT64fFfdZuRY2tLrEAFs2JqEOsy4X3Yx';
const client = yelp.client(apiKey);

const PORT = process.env.PORT || 5000; 

app.use(cors());

app.listen(PORT, () =>{
  console.log(`Listening to ${PORT}`);
})

app.get('/api', (req, res) => {

  client.search(searchRequest).then(response => {
    const firstResult = response.jsonBody.businesses[0];
    const prettyJson = JSON.stringify(firstResult, null, 4);
    res.send({data : firstResult});
  }).catch(e => {
    console.log(e);
    res.send({message:"error"});
  });
  
})
const searchRequest = {
  term:'Starbucks',
  location: 'milton, on'
};


