const express = require('express');
const authorizeMiddleware = require('./authorize.js');
const app = express.Router();
const User = require("../items/user.js");
const Profile = require("../items/profiles.js");
app.get("/v1/GetSkin", authorizeMiddleware, async (req, res) => {
    const { accountId } = req.query;
    if (!accountId)
        return res.status(400).send('No AccountId provided.');
        try {
          //const user = await User.findOne({ username: username });
		  const user = await User.findOne({ accountId: accountId })
      //const skin = user ? await Profile.findOne({ username: user.username }) : null;
	  const skin = user ? await Profile.findOne({ accountId: accountId }) : null;
      const favouriteCharacter = skin?.profiles?.athena?.stats?.attributes?.favorite_character;
            if (user) 
            {
              if (favouriteCharacter == '') 
              {
                res.send("CID_001_Athena_Commando_F_Default");  
              } else 
              {
               var basicfavouriteCharacter = favouriteCharacter.replace('AthenaCharacter:', '')
              res.send(basicfavouriteCharacter);  
              }
              
            } else {
              res.send("AccountId not found.");
            }
          } catch (er) {
            console.log("Error: " + er)
            res.send("Error");
          }
      });

module.exports = app; // Export the model using CommonJS syntax