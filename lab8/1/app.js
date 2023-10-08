
function start() {
    let table = document.getElementById("originalTable");
    let th = table.querySelectorAll("th");
    let tr = table.querySelectorAll("tr");

    let head = [];
    let body = [];
    let foot = [];

    th.forEach(i => {
        head.push(i.innerText);
    });

    for (let i = 1; i < tr.length; i++) {
        if (i == tr.length - 1) {
            let td = tr[i].querySelectorAll("td");
            for (let j = 0; j <= td.length - 1; j++) {
                foot.push(td[j].innerText);
            }
        }
        else {
            let inner_array = []
            let td = tr[i].querySelectorAll("td");
    
            td.forEach(j => {
                inner_array.push(j.innerText);
            });
            body.push(inner_array)
        }
    }
    return [head,body,foot]
}

function toJson(head,body,foot) {

    foot = []
    foot.push({ "value": "Total", "span": 4 });
    foot.push({ "value": 3000 });

    let jsonData = {
        "Header": head,
        "Body": [],
        "Foot": foot
    };
    
    for (let i = 0; i < body.length; i++) {
        let rowData = {};
        for (let j = 0; j < head.length; j++) {
            rowData[head[j]] = body[i][j];
        }
        jsonData["Body"].push(rowData);
    }
    
    
    
    // console.log(jsonData)
    // console.log(JSON.stringify(jsonData, null, 2));
    
    let area = document.getElementById('displayTextarea')
    area.value = JSON.stringify(jsonData, null, 4)
}

function convert() {
    let area = document.getElementById('displayTextarea');
    let jsonData = JSON.parse(area.value);

    console.log(jsonData)

    let newTable = document.getElementById('newTable');

    let headerRow = newTable.insertRow();
    jsonData.Header.forEach(headerText => {
        let th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
    });

    jsonData.Body.forEach(rowData => {
        let bodyRow = newTable.insertRow();
        jsonData.Header.forEach(headerText => {
            let td = bodyRow.insertCell();
            td.textContent = rowData[headerText];
        });
    });

    let footerRow = newTable.insertRow();
    jsonData.Foot.forEach(footerData => {
        let td = footerRow.insertCell();
        td.textContent = footerData.value;
        console.log(footerData.span)
        if (footerData.span > 0) {
            td.colSpan = footerData.span
        }
        else {
            td.colspan = "1"
        }

    });

    document.body.appendChild(newTable);
}


function run() {
    [head, body, foot] = start();
    toJson(head,body,foot)
}

run();