
const main = (params) => {
	return new Promise((resolve,reject) => {
		chrome.runtime.sendMessage(params,(response) => {
			resolve(response);
		});
	})
}
const starter = async () => {
	const params = { /* background.jsに送られる */
		text: document.getElementsByTagName('body')[0].innerText,
		title: document.title,
		url: document.URL
	};
	const result = await main(params);
	console.log(result);
}
window.addEventListener("load", starter, false);