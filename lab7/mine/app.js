let hours = 8;
let minutes = 55;
let seconds = 0;

let data = [
    { time: "09:00", alertWord: "Wake up" },
    { time: "11:05", alertWord: "Lunch Time" },
    { time: "15:30", alertWord: "Take a break" }
];    
appendRowsToTable(data);
let [time_table, alert_word] = getValueFromTable();
setInterval(updateTimer, 1000);
updateTimer();
let arr_AlertTime = []



function showAlert(text) {
    alert(text)
}

function getValueFromTable() {
    let cells = document.querySelectorAll("#myTable tr td");
    let time_table = []
    let alert_word = []
    for (let i = 0; i < cells.length; i++) {
        if (i % 2 == 0) {
            time_table.push(cells[i].innerHTML)
        } else {
            alert_word.push(cells[i].innerHTML)
        }
    }
    return [time_table, alert_word]
}

function AlertTime(t, w) {
    this.time = t
    this.alertMessage = w
}


function updateTimer() {
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    document.getElementById('cur_time').innerHTML = formattedTime;
    
    for (let i = 0; i < time_table.length; i++) {
        if (
            parseInt(time_table[i].split(':')[0]) === hours &&
            parseInt(time_table[i].split(':')[1]) === minutes
            ) {
            minutes++;
            showAlert(alert_word[i]);
        }
    }
    
    seconds+=5;
    if (seconds === 60) {
        seconds = 0;
        minutes++;
        if (minutes === 60) {
            minutes = 0;
            hours++;
        }
    }
    if(hours == 24){
        hours = 0 ;
    }
}

function appendRowsToTable_head() {
    let table = document.getElementById("myTable");
    let headerRow = document.createElement("tr");
    let timeHeader = document.createElement("th");
    timeHeader.textContent = "Time";
    let alertWordHeader = document.createElement("th");
    alertWordHeader.textContent = "Alert word";
    headerRow.appendChild(timeHeader);
    headerRow.appendChild(alertWordHeader);
    table.appendChild(headerRow);
}

function appendRowsToTable(data) {
    appendRowsToTable_head();
    let table = document.getElementById("myTable");
    
    for (let i = 0; i < data.length; i++) {
        let rowData = data[i];
        
        let newRow = document.createElement("tr");
        
        let timeCell = document.createElement("td");
        timeCell.textContent = rowData.time;
        let alertWordCell = document.createElement("td");
        alertWordCell.textContent = rowData.alertWord;
        
        newRow.appendChild(timeCell);
        newRow.appendChild(alertWordCell);
        
        table.appendChild(newRow);
    }
}

function edit() {
    button = document.getElementById('editBtn');
    button.innerHTML = 'Done';
    button.setAttribute('onclick', 'done()');
    let table = document.getElementById('myTable');
    table.innerHTML = "";
    for (let i = 0; i < arr_AlertTime.length; i++) {
        const tr = document.createElement('tr');
        const td1 = document.createElement('td');
        const td2 = document.createElement('td');
        const td3 = document.createElement('td');
        td1.innerHTML = `<input type="time" id="time${i}" value="${arr_AlertTime[i].time}">`;
        td2.innerHTML = `<input type="text" id="message${i}" value="${arr_AlertTime[i].alertMessage}">`;
        td3.innerHTML = `<button onclick="remove(${i})">Remove</button>`;
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        table.appendChild(tr);
    }
    let main = document.getElementById('main');
    let data = document.createElement('button')
    data.setAttribute("onclick", "addRow()")
    data.setAttribute("id", "addRow")
    data.innerText = "Add row"
    main.appendChild(data)
    
}


function done() {
    let button = document.getElementById('editBtn');
    button.innerHTML = 'Edit';
    button.setAttribute('onclick', 'edit()');

    let table = document.getElementById('myTable');
    
    console.log(arr_AlertTime)
    

    let updatedTimer = [];
    
    for (let i = 0; i < arr_AlertTime.length; i++) {
        console.log(`time${i}`)
        let timeInput = document.getElementById(`time${i}`);
        let messageInput = document.getElementById(`message${i}`);
        if (timeInput && messageInput) {
            timer[i].time = timeInput.value;
            timer[i].message = messageInput.value;
            
            if (!(timer[i].time === '' || timer[i].message === '')) {
                updatedTimer.push(timer[i]);
            }
        }
    }
    timer = updatedTimer;

    table.innerHTML = "";
    for (let i = 0; i < arr_AlertTime.length; i++) {
        const tr = document.createElement('tr');
        const td1 = document.createElement('td');
        const td2 = document.createElement('td');
        td1.textContent = arr_AlertTime[i].time;
        td2.textContent = arr_AlertTime[i].alertMessage;
        tr.appendChild(td1);
        tr.appendChild(td2);
        table.appendChild(tr);
    }
    
    let addBtn = document.getElementById('addRow')
    addBtn.parentNode.removeChild(addBtn)
}

function remove(index) {
    arr_AlertTime.splice(index,1)
    edit()
}


function addRow() {
    arr_AlertTime.push({ time: null, message: null });
    let table = document.getElementById('myTable');
    const tr = document.createElement('tr');
    const td1 = document.createElement('td');
    const td2 = document.createElement('td');
    const td3 = document.createElement('td');
    td1.innerHTML = `<input type="time" id="time${arr_AlertTime.length - 1}" value="">`;
    td2.innerHTML = `<input type="text" id="message${arr_AlertTime.length - 1}" value="">`;
    td3.innerHTML = `<button onclick="remove(${arr_AlertTime.length - 1})">Remove</button>`;
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    table.appendChild(tr);
}





function run() {    
    for (let i = 0; i < time_table.length; i++) {
        arr_AlertTime.push(new AlertTime(time_table[i],alert_word[i]))
    }
    console.log(arr_AlertTime)
    
}

run()


