'use strict'
const apiBase = ''

/* main.jsからメッセージを受け取る */
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
		if(request.url?.includes('chrome://extensions/')){
			sendResponse({'status':501,'URL':request.url});
			return true
		}
        const strText = request.text;
        const title = request.title;
		const date = new Date();
		const now = date.getFullYear() + ('0' + (date.getMonth() + 1)).slice(-2) +('0' + date.getDate()).slice(-2) +  ('0' + date.getHours()).slice(-2) + ('0' + date.getMinutes()).slice(-2) + ('0' + date.getSeconds()).slice(-2);
		const api_endpoint = apiBase+"/set/"+now+".json";
		
		$.ajax({
			url: api_endpoint,
			type: 'POST',
			data: JSON.stringify({data: strText, url: request.url, now: now, title: title}),
			dataType: 'json',
		}).then(() => {
			sendResponse({'status': 200,'URL': request.url});
		}, () => {
			sendResponse({'status': 500,'URL': request.url});
		});
		return true;
    }
);
