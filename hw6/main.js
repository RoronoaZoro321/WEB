let table = document.getElementById('table')
m_of_year = 1
total_days = [31,28,31,30,31,30,31,31,30,31,30,31]
space_before = [6,2,2,5,0,3,5,1,4,6,2,4]
create_row1()
create_row2()
let t_body = document.createElement('tbody')
table.appendChild(t_body)
show_month(total_days[m_of_year-1], space_before[m_of_year-1])

function create_row1() {
    let row = document.createElement('tr')
    let col1 = document.createElement('td')
    let col2 = document.createElement('td')
    let col3 = document.createElement('td')
    
    col1.innerHTML = '<button type="button" onclick="left()"><</button>'
    col2.innerText = '1/2023'
    col2.setAttribute('colspan','5')
    col2.setAttribute('id','title')
    
    col3.innerHTML = '<button type="button" onclick="right()">></button>'
    
    row.appendChild(col1)
    row.appendChild(col2)
    row.appendChild(col3)
    
    table.appendChild(row)
}

function create_row2() {
    days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    let row = document.createElement('tr')
    days.forEach(i => {
        let col = document.createElement('td')
        col.innerText = i
        row.appendChild(col) 
    });
    table.appendChild(row)
}

function left() {
    if (m_of_year > 1) {
        m_of_year-=1
        let title = document.getElementById('title')
        title.innerText = `${m_of_year}/2023`
        let index = m_of_year-1
        show_month(total_days[index], space_before[index])
    }
}

function right() {
    if (m_of_year < 12) {
        m_of_year+=1
        let title = document.getElementById('title')
        title.innerText = `${m_of_year}/2023`
        let index = m_of_year-1
        show_month(total_days[index], space_before[index])
    }
}

function show_month(days, space) {
    t_body.innerHTML = ''
    count = 1
    num_of_rows = Math.ceil((days+space)/7)
    console.log(num_of_rows)
    for (let i = 0; i < num_of_rows; i++) {
        let row = document.createElement('tr')
        for (let j = 0; j < 7; j++) {
            let col = document.createElement('td')
            if (space > 0 || count > days) {
                col.innerText = ''
                space-=1
            } else if (count<=days) {
                col.innerText = count
                if (j==6) {
                    col.style.color = 'red'
                }
                count+=1
            }
            row.appendChild(col)
        }
        t_body.appendChild(row)
    }
    console.log('done')
}
