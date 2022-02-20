
let results = document.getElementById('results');
const searchHistory = (searchText) => {
    return new Promise ((resolve,reject) => {
        $.ajax({
            url: "<request query to athena, lambda endpoint>",
            type: 'post',
            dataType: 'json',
            body:JSON.stringify({searchText:searchText})
        }).then((response) => {
            resolve(response);
        }).fail((err) => {
            reject(err);
        });
    })
}
const createTableBody = (history) => {
    const historyArr = history;
    for(let i=0;i<historyArr.length;i++){
        let historyText = historyArr[i].text;
        if(!historyText || historyText === 'undefined'){
            continue;
        }
        let trElem = document.createElement('tr');
        let tdUrl = document.createElement('td');
        let tdTimestamp = document.createElement('td');
        let tdText = document.createElement('td');
        let linkTag = document.createElement('a');
        linkTag.innerText = historyArr[i].title;
        linkTag.setAttribute('href',historyArr[i].url);
        tdUrl.innerHTML = linkTag;
        tdTimestamp.innerText = historyArr[i].timestamp;
        /*60bまで表示*/
        let historyTextStr = historyText.length>60?historyText.slice( 0, 60 ):historyText.text;
        tdText.innerText = historyTextStr;
        trElem.appendChild(tdUrl);
        trElem.appendChild(tdTimestamp);
        trElem.appendChild(tdText);
        results.appendChild(trElem);
    }
}
$(document).ready(() => {
    const history = localStorage.getItem('tora_histories');
    if(history){
        createTableBody(history);
    }
    $(document).on('click', 'button', async () => {
        const searchText = document.getElementById('search');
        const histories = await searchHistory(searchText);
        if(histories){
            localStorage.setItem('tora_histories', histories);
            createTableBody(histories);
        }else{
            results.innerText = "取得エラーです。";
        }
    });
});