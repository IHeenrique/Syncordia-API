const express = require("express")
const getToken = require("../functions/roblox/getToken");
const passport = require("passport");
const user = require("../schemas/user");
const DiscordStrategy = require('passport-discord').Strategy;
const router = express.Router()

router.get("/rbx", async(req, res) => {
    const code = req.query.code
    const state = req.query.state

    const response = await getToken(code, state)

    if(response.error || false) return res.json(response)

    const User = await user.findOne({ discord: "1081776781226418306" }) || new user({ discord: "1081776781226418306" })

    User.tokens.roblox.accessToken = response.access_token
    User.tokens.roblox.refreshToken = response.refresh_token

    User.save()

    return res.send("You have been successfully verified on Syncord! You can now close this page")
    
})

module.exports = router