const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();
app.set("json spaces", 2);
const port = 3000;

async function igstalk(query) {
return new Promise(async (resolve, reject) => {
			try {
	    const {
            data
        } = await axios.get(`https://instasupersave.com/api/ig/userInfoByUsername/mrbeast`);
	const res = data.result.user;
        const result = {
username: res.username,
fullname: res.full_name,
post_count: res.media_count,
followers: res.follower_count,
following: res.following_count,
verifed: res.is_verified,
private: res.is_private,
external_url: res.external_url,
biography: res.biography 
}
					resolve(result)
				} catch (e) {
					reject(e)
				}
			})
		}

app.get("/", async (req, res) => {
  try {
    const q = req.query.text
    if (!q) return res.json('masukan prompt text')
    const result = await igstalk(q);
    res.json(result);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
