table = document.getElementById("table")

let row_1 = document.createElement("tr")
let head = document.createElement("th")
head.innerText = "August 2023"
head.setAttribute("colspan","7")
row_1.appendChild(head)
table.appendChild(row_1)

let row_2 = document.createElement("tr")
arr = ["mo", "tu", "we", "th", "Fr", "Sa", "Su"]

arr.forEach(i => {
    let data = document.createElement("td")
    data.innerText = i
    row_2.appendChild(data)
});

table.appendChild(row_2)

days=0

for (let i = 0; i < 5; i++) {
    let row = document.createElement("tr")
    for (let j = 0; j < 7; j++) {
        if (days>0 && days<=31) {
            let data = document.createElement("td")
            data.innerText = days
            row.appendChild(data)
            days+=1
            }
        else {
            let data = document.createElement("td")
            data.innerText = ''
            row.appendChild(data)
            days+=1
        }
    }
    table.appendChild(row)
}




