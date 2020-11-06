let currentclass = 3152
let currentweek = 9
let currentday = 0
const arrow_forward = document.getElementById('arrow_forward')
const classContainer = document.getElementById('root')
var days = ["Pühapäev", "Esmaspäev", "Teisipäev", "Kolmapäev", "Neljapäev", "Reede", "Laupäev"];
let eBox = document.getElementById(1)
let tBox = document.getElementById(2)
let kBox = document.getElementById(3)
let nBox = document.getElementById(4)
let rBox = document.getElementById(5)




function scrolltoE() {
    let eBox = document.getElementById(1)
    eBox.scrollIntoView({ behavior: 'smooth' });
}
function scrolltoT() {
    let tBox = document.getElementById(2)
    tBox.scrollIntoView({ behavior: 'smooth' });
}
function scrolltoK() {
    let kBox = document.getElementById(3)
    kBox.scrollIntoView({ behavior: 'smooth' });
}
function scrolltoN() {
    let nBox = document.getElementById(4)
    nBox.scrollIntoView({ behavior: 'smooth' });
}
function scrolltoR() {
    let rBox = document.getElementById(5)
    rBox.scrollIntoView({ behavior: 'smooth' });
}


function nextWeek() {
    console.log(currentweek)
    currentweek = currentweek + 1
    classContainer.innerHTML = ""
    getinfo();
}
function prevWeek() {
    console.log(currentweek)
    currentweek = currentweek - 1
    classContainer.innerHTML = ""
    getinfo();
}
function getinfo() {
    fetch('https://be.ta19heinsoo.itmajakas.ee/api/lessons/groups=' + currentclass + '&weeks=' + currentweek)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            //teeb tunnid
            classes = data.timetableEvents
            classes.forEach(currentData => {

                console.log(currentData)

                date = new Date(currentData.date)
                currentDate = new Date()



                dateDay = date.getDay()
                let titleDiv = document.createElement('div')
                let weekdayDiv = document.createElement('div')
                titleDiv.innerHTML = ""
                if (currentday != dateDay) {
                    currentday = dateDay
                    weekdayDiv.innerHTML = '<div class="weekdays" id="' + dateDay + '">' + days[dateDay] + '</div>'
                    console.log(dateDay)
                    classContainer.append(weekdayDiv)


                }
                titleDiv.className = "container"
                titleDiv.innerHTML = '<div class="info">' + '<div class="classtime">' + currentData.timeStart + ' - ' + currentData.timeEnd + '</div>' + '<div class="classname">' + currentData.nameEn + '</div>' + '<div class="classteacher">' + currentData.teachers[0].name + '</div>' + '</div>'
                classContainer.append(titleDiv)
                classStart = (currentData.date.split("T")[0] + "T" + currentData.timeStart)
                classEnd = (currentData.date.split("T")[0] + "T" + currentData.timeEnd)
                console.log(classStart, classEnd)

                if (currentDate > new Date(classStart) && currentDate < new Date(classEnd)) {
                    titleDiv.style.background = "#FFE55F"
                }



            });

        });
}

function search() {
    fetch('https://be.ta19heinsoo.itmajakas.ee/api/teachers')
        .then((response) => {
            return response.json()
        })
        .then((data) => {

            const options = {
                includeScore: true,
                // Search in `author` and in `tags` array
                keys: ['author', 'tags']
            }

            const fuse = new Fuse(data, options)

            const result = fuse.search('andrus')
            console.log(result)


        })
}




search();
getinfo();