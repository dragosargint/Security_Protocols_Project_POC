const app = require("express")();
const NodeCache = require('node-cache');
const appid = process.env.APPID;

const cache = new NodeCache({ stdTTL: 100 });
 
app.get("/", function(req,res) {
	try {
		let r = cache.get(req.headers["host"] + JSON.stringify(req.query));
		console.log(req.headers["host"] + JSON.stringify(req.query))
		if (r == null) {
			r = `appid: ${appid} Greetings, you mighty hacker!<script>${req.headers["x-forwarded-for"]}</script>`
			cache.set(req.headers["host"] + JSON.stringify(req.query), r, 30);
		}
		res.send(r);
	} catch (err) {
		console.log(err);
		res.sedStatus(500);
	}
});
 
app.listen(appid, ()=>console.log(`${appid} is listening on ${appid}`))
