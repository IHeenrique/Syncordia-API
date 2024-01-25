const axios = require("axios")
const querystring = require('querystring');

async function userinfo(token) {
    try {
        const response = await axios({
            method: `get`,
            url: `https://apis.roblox.com/oauth/v1/userinfo`,
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })

        return response.data

    } catch (err) {
        console.error(err)
        return {
            error: true,
            message: err.message
        }
    }
}

module.exports = userinfo