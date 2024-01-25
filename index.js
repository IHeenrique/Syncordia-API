const express = require("express")
const app = express()
const mg = require("mongoose")

const authenticateRouter = require("./src/routes/authenticate")
const api = require("./src/routes/v2")

require("dotenv").config()

mg.set("strictQuery", true);
mg.connect(process.env.mongo_uri, {})

app.use("/auth", authenticateRouter)
app.use("/v2", api)

app.get("/rbx", async(req, res) => {
    res.redirect("https://authorize.roblox.com/?client_id=4141362268669915168&response_type=code&redirect_uri=https%3A%2F%2Fsyncordia-api-vercel.vercel.app%2Fauth%2Frbx&scope=openid&state=6789&nonce=12345&step=accountConfirm")
})

app.get("*", async(req, res) => {
    res.json({ message: `Welcome!` })
})

app.listen(process.env.PORT || 3000)
