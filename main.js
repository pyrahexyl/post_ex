

$(function(){
    $(document).ready(function(){
		chrome.runtime.sendMessage({
			text: document.getElementsByTagName('body')[0].outerText
		});
    });
})