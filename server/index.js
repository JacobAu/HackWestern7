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

app.get('/api/nearbyBusinesses/:latitude/:longitude', (req, res) => {
  let { latitude, longitude } = req.params;
  if(latitude === 0 || longitude === 0){
    res.send({message:"loading"})
  }  

  const searchRequest = {
    latitude: latitude,
    longitude: longitude,
    limit: 20,
  };  
  client.search(searchRequest).then(response => {
    const result = response.jsonBody.businesses
    res.send({result});
  }).catch(e => {
    console.log(e);
    res.send({message:"error"});
  });
  
})

