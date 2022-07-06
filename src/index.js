/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npx wrangler dev src/index.js` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npx wrangler publish src/index.js --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

const qr = require('qr-image');

async function generate(request) {
	const { text} = await request.json();
	const headers = {"Content-Type":"image/png"};
	const qr_png = qr.imageSync(text || "https://github.com/eniolajayi");
	return new Response(qr_png,{headers});
}

export default {

	async fetch(request) {
		if (request.method === "POST") {
			return generate(request);
		}
		return new Response("Expected POST", { status: 405 });
	},
};
