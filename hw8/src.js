async function readFile() {
    try {
        const response = await fetch('transcript.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

function fillInForm(data) {
    document.getElementById("student_name").value = data.student_name;
    document.getElementById("student_id").value = data.student_id;
    document.getElementById("date_of_birth").value = data.date_of_birth;
    document.getElementById("date_of_admission").value = data.date_of_admission;
    document.getElementById("date_of_graduation").value = data.date_of_graduation;
    document.getElementById("degree").value = data.degree;
    document.getElementById("major").value = data.major;
}

function fillInTable(data) {
    const tableBody = document.getElementById("content_body");
    tableBody.innerHTML = '';
    let totalCredit = 0;
    let totalGrade = 0;

    for (const year in data) {
        for (const semester in data[year]) {
            // console.log(data[year][semester]);
            const semRow = tableBody.insertRow();
            const semCell0 = semRow.insertCell(0);
            const semCell1 = semRow.insertCell(1);
            const semCell2 = semRow.insertCell(2);
            semCell0.textContent = `${semester} ${year}`;
            semCell0.style.fontWeight = "bold";
            semCell0.style.textDecoration = "underline";


            const courses = data[year][semester];
            courses.forEach(course => {
                const newRow = tableBody.insertRow();
                const courseTitleCell = newRow.insertCell(0);
                const creditCell = newRow.insertCell(1);
                const gradeCell = newRow.insertCell(2);

                courseTitleCell.textContent = `${course.subject_id} ${course.name}`;
                courseTitleCell.style.textAlign = "left";
                creditCell.textContent = course.credit;
                gradeCell.textContent = course.grade;

                totalCredit += parseInt(course.credit);
                totalGrade += parseInt(course.credit) * parseFloat(course.grade);
            });

            const gpaRow = tableBody.insertRow();
            const gpaCell0 = gpaRow.insertCell(0);
            const gpaCell1 = gpaRow.insertCell(1);
            const gpaCell2 = gpaRow.insertCell(2);
            const gps = (totalGrade / totalCredit).toFixed(2);

            gpaCell0.textContent = "GPS:" + gps + "GPA:" + calculateGPA(data[year][semester]);
            gpaCell0.style.fontWeight = "bold";
        }
    }
}

function calculateGPA(semester) {
    let totalCredit = 0;
    let totalGrade = 0;
    semester.forEach(course => {
        totalCredit += parseInt(course.credit);
        totalGrade += parseInt(course.credit) * parseFloat(course.grade);
    });
    return (totalGrade / totalCredit).toFixed(2);
    
}

function calculateGPS(semester) {
    let totalCredit = 0;
    let totalGrade = 0;
    semester.forEach(course => {
        totalCredit += parseInt(course.credit);
        totalGrade += parseInt(course.credit) * parseFloat(course.grade);
    });
    return (totalGrade / totalCredit).toFixed(2);
}


async function start() {
    // const data = await readFile();
    const fileBtn = document.getElementById("fileInput");
    fileBtn.addEventListener('change', function (e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = function (e) {
            const text = e.target.result;
            const data = JSON.parse(text);
            fillInForm(data);
            fillInTable(data.credit);
        };
        reader.readAsText(file);
    });
}

document.addEventListener('DOMContentLoaded', start);

