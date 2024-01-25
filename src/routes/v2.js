const express = require("express")
const getToken = require("../functions/roblox/getToken");
const user = require("../schemas/user");
const userinfo = require("../functions/roblox/userinfo");
const refreshToken = require("../functions/roblox/refreshToken");
const router = express.Router()

router.get("/rbx/userinfo", async(req, res) => {

    try {
   
    const userId = req.query.user
    
    const User = await user.findOne({ discord: userId })

    if(!User) return res.json({ error: true, message: `User ID not found!` })
    
    const refresh = await refreshToken(User.tokens.roblox.refreshToken)

    User.tokens.roblox.accessToken = refresh.access_token
    User.tokens.roblox.refreshToken = refresh.refresh_token

    User.save()

    const response = await userinfo(User.tokens.roblox.accessToken)
    return res.json(response)
    } catch(err) {
        return res.json(err)
    }
    
})

module.exports = router