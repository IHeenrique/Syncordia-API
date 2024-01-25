const axios = require("axios")
const querystring = require('querystring');

async function refreshToken(refresh_token) {
    try {
    const requestData = {
        client_id: process.env.client_id,
        client_secret: process.env.client_secret,
        grant_type: "refresh_token",
        refresh_token: refresh_token
    }

    const formData = querystring.stringify(requestData);

        const response = await axios({
            method: `post`,
            url: `https://apis.roblox.com/oauth/v1/token`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: formData
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

module.exports = refreshToken