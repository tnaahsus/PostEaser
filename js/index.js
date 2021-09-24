// console.log("Hello");
// utility function to get dom element from string
let getElementFromString = (string) => {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}



let requestJsonBox = document.getElementById('requestJsonBox');
requestJsonBox.style.display = 'none';

let parametersBox = document.getElementById('parametersBox');
parametersBox.style.display = 'none';

let headerBox = document.getElementById('headerBox');
headerBox.style.display = 'none';




// if user click on custom header
let customheaderRadio = document.getElementById('customheaderRadio')
customheaderRadio.addEventListener('click', () => {
    document.getElementById('headerBox').style.display = 'block';
    document.getElementById('tokenBox').style.display = 'none';
})
// if user click on default header header
let defaultheaderRadio = document.getElementById('defaultheaderRadio')
defaultheaderRadio.addEventListener('click', () => {
    document.getElementById('headerBox').style.display = 'none';
    document.getElementById('tokenBox').style.display = 'block';
})


// if user click on paramter
let parameterRadio = document.getElementById('parameterRadio')
parameterRadio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'none';
    document.getElementById('parametersBox').style.display = 'block';
})


// if user click on json
let jsonRadio = document.getElementById('jsonRadio')
jsonRadio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'block';
    document.getElementById('parametersBox').style.display = 'none';
})


// if + is clicked add header
let headerNumber = 0;
let addHeaders = document.getElementById('addHeaders');
addHeaders.addEventListener('click', () => {
    let header = document.getElementById('header');
    let string = `<div class="input-group  mt-2">
                        
                        <input
                        type="text"
                        class="form-control"
                        id="headerKey${headerNumber + 2}"
                        placeholder="Content-Type"
                        />
                        <input
                        type="text"
                        class="form-control ms-2"
                        id="headerValue${headerNumber + 2}"
                        placeholder="application/json"
                        />
                        <button
                        type="button"
                        class="btn btn-outline-secondary ms-2 removeHeader"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Remove Header"
                        >
                        -
                        </button>
                </div>`;
    // converting element string to dom
    let headerElement = getElementFromString(string);
    // console.log(parameterElement);
    header.appendChild(headerElement);
    // deleting parameters
    let removeHeader = document.getElementsByClassName('removeHeader');
    for (item of removeHeader) {
        item.addEventListener('click', (e) => {
            e.target.parentElement.remove();
        })
    }
    headerNumber++;
})

// if + is clicked add parameter
let parameterNumber = 0;
let addParameters = document.getElementById('addParameters');
addParameters.addEventListener('click', () => {
    let parameter = document.getElementById('parameter');
    let string = `<div class="input-group  mt-2">
                        <span class="input-group-text">Parameter ${parameterNumber + 2}</span>
                        <input
                        type="text"
                        class="form-control"
                        id="parameterKey${parameterNumber + 2}"
                        placeholder="Enter Key"
                        />
                        <input
                        type="text"
                        class="form-control"
                        id="parameterValue${parameterNumber + 2}"
                        placeholder="Enter Value"
                        />
                        <button
                        type="button"
                        class="btn btn-outline-secondary ms-2 removeParameters"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Remove Parameter"
                        >
                        -
                        </button>
                </div>`;
    // converting element string to dom
    let parameterElement = getElementFromString(string);
    // console.log(parameterElement);
    parameter.appendChild(parameterElement);
    // deleting parameters
    let removeParameters = document.getElementsByClassName('removeParameters');
    for (item of removeParameters) {
        item.addEventListener('click', (e) => {
            e.target.parentElement.remove();
        })
    }
    parameterNumber++;
})


// Submit Button
let submit = document.getElementById('submit');
submit.addEventListener('click', () => {
    // document.getElementById('responseJson').value = "Please wait.."
    document.getElementById('responsePrism').innerHTML = "Please wait.."
    // fetching all values
    let url = document.getElementById('url').value;
    let token = document.getElementById('token').value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;
    let headerType = document.querySelector("input[name='headerType']:checked").value;
    // console.log(headerType);
    // contenttype
    if (contentType == 'parameter') {
        data = {};
        for (let i = 0; i < parameterNumber + 1; i++) {
            if (document.getElementById('parameterKey' + (i + 1)) != undefined) {
                let key = document.getElementById('parameterKey' + (i + 1)).value;
                let value = document.getElementById('parameterValue' + (i + 1)).value;
                // console.log(key,value)
                data[key] = value;
            }
        }
        data = JSON.stringify(data);
    }
    else {
        data = document.getElementById('requestJson').value;
    }

    if (headerType == 'customheader') {
        header = {};
        for (let i = 0; i < headerNumber + 1; i++) {
            if (document.getElementById('headerKey' + (i + 1)) != undefined) {
                let key = document.getElementById('headerKey' + (i + 1)).value;
                let value = document.getElementById('headerValue' + (i + 1)).value;
                // console.log(key,value)
                header[key] = value;
            }
        }
        // console.log(header);
    }
    else {
        header = {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': `Bearer ${token}`
        }
        // console.log(header)
    }
    //requestType
    if (requestType == 'GET') {
        fetch(url, {
            method: 'GET',
            headers: header,
        }
        )
            .then(resp => resp.text())
            .then((text) => {
                // document.getElementById('responseJson').value = text
                document.getElementById('responsePrism').innerHTML = text;
                Prism.highlightAll();
            })
    }
    else if (requestType == 'POST') {
        fetch(url, {
            method: 'POST',
            body: data,
            headers: header
        })
            .then((response) => response.text())
            .then((text) => {
                // document.getElementById('responseJson').value = text;
                document.getElementById('responsePrism').innerHTML = text;
                Prism.highlightAll();
            });
    }
    else if (requestType == 'PATCH') {
        fetch(url, {
            method: 'PATCH',
            body: data,
            headers:header
        })
            .then((response) => response.text())
            .then((text) => {
                // document.getElementById('responseJson').value = text;
                document.getElementById('responsePrism').innerHTML = text;
                Prism.highlightAll();
            });
    }
    else if (requestType == 'PUT') {
        fetch(url, {
            method: 'PUT',
            body: data,
            headers: header
        })
            .then((response) => response.text())
            .then((text) => {
                // document.getElementById('responseJson').value = text;
                document.getElementById('responsePrism').innerHTML = text;
                Prism.highlightAll();
            });
    }
    else {
        fetch(url, {
            method: 'DELETE',
            headers: header
        })
            .then(() => {
                // console.log(text);
                // document.getElementById('responseJson').value = text;
                document.getElementById('responsePrism').innerHTML = "Deleted";
                Prism.highlightAll();
            });
    }
})
