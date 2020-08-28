/* A simple AJAX implementation*/
const ajax = (url, data, method, headers, callOk, callError) => {

    if(url === undefined){
        throw Error("URL not defined");
    }
    
    if(method === undefined){
        throw Error("HTTP method not defined");
    }

    const xhttp = new XMLHttpRequest();
    xhttp.open(method, url);
    
    // Set headers
    if(headers !== null){
        headers.forEach(h => {
            xhttp.setRequestHeader(h[0], h[1]);
        });
    }

    // Set callbacks
    xhttp.onreadystatechange = function() {

        if(this.readyState === 4){
            if (this.status === 200) {
                if(callOk !== null){
                    callOk(this.responseText);
                }
            }
            if (this.status >= 400) {
                if(callOk !== null){
                    callError(this.responseText);
                }
            }
        }
    }

    if(data !== null){
        if(typeof data === 'object'){
            xhttp.send(JSON.stringify(data));
        }
        else{
            xhttp.send(data);
        }
    }
    else{
        xhttp.send();
    }
}

export default ajax;