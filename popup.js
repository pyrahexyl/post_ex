const api_endpoint = apiBase+"/list";
const get = (api_endpoint) => {
    return new Promise ((resolve,reject) => {
        $.ajax({
            url: api_endpoint,
            type: 'get',
            dataType: 'json',
        }).then(function(response){
            resolve({'status': 200,message:response});
        }, function(err){
            reject({'status': 500,message:err});
        });
    })
}
$(document).ready(() => {
    const histories = get(api_endpoint);
    $(document).on('click', 'button', (histories) => {
        const searchWord = $('#search').value();
        const results = histories.filter(history => {
            if(history.text?.includes(searchWord)){
                return history;
            }
        })
        $('#results').text(results);
    });
});