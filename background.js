'use strict'
//apiBaseに、serverless deploy後に出力されるエンドポイントをセットする
const apiBase = ''
let urlStrings = '';
{
  chrome.tabs.query({active: true, lastFocusedWindow:true}, tabs => {
      urlStrings=tabs[0].url;
  });
}

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        const strText = request.text;
		const date = new Date();
		const now = date.getFullYear() + ('0' + (date.getMonth() + 1)).slice(-2) +('0' + date.getDate()).slice(-2) +  ('0' + date.getHours()).slice(-2) + ('0' + date.getMinutes()).slice(-2) + ('0' + date.getSeconds()).slice(-2);
		const api_endpoint = apiBase+"/set/"+now+".json";
		
		$.ajax({
			url: api_endpoint,
			type: 'POST',
			data: JSON.stringify({
				data: strText, 
				url: urlStrings, 
				now: now
			}),
			dataType: 'json',
		}).then(() => {
			sendResponse({'status': 200});
		}, () => {
			sendResponse({'status': 500});
		});
    }
);
chrome.extension.onMessage.addListener((objRequest, _, sendResponse) => {
    const strText = objRequest.txt;
});
