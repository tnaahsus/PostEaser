// console.log("Hello");

// utility function to get dom element from string
// function getElementFromString(string){
//     let div =document.createElement('div');
//     div.innerHTML=string;
//     return string.firstElementChild;
// }
let getElementFromString = (string) => {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}



let parametersBox = document.getElementById('parametersBox');
parametersBox.style.display = 'none';




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


// if + is clicked add parameters
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
            let result = confirm("Want to delete?");
            if (result) {
                e.target.parentElement.remove();
            }
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
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;
    // console.log(contentType);
    // contenttype
    if (contentType == 'parameter') {
        data = {};
        for (let i = 0; i < parameterNumber; i++) {
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
    //requestType
    if (requestType == 'GET') {
        fetch(url, {
            method: 'GET'
        })
            .then(resp => resp.text())
            .then((text) => {
                // document.getElementById('responseJson').value = text
                document.getElementById('responsePrism').innerHTML = text;

                Prism.highlightAll();
            })
    }
    else {
        fetch(url, {
            method: 'POST',
            body: data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.text())
            .then((text) => {
                // document.getElementById('responseJson').value = text;
                document.getElementById('responsePrism').innerHTML = text;

                Prism.highlightAll();
            });
    }
})
