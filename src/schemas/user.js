const db = require("mongoose");

const User = new db.Schema({ 
    discord: { type: String },
    tokens: {
        discord: {
            accessToken: { type: String },
            refreshToken: { type: String }
        },
        roblox: {
            accessToken: { type: String },
            refreshToken: { type: String }
        }
    }
});


module.exports = db.model('users', User);