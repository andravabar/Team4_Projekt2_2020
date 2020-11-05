let currentclass = 3148
let input = document.getElementById('myInput');
let currentweek = 9
let currentday = 0
const arrow_forward = document.getElementById('arrow_forward')
const classContainer = document.getElementById('root')
const eBox = document.getElementById('E')
const tBox = document.getElementById('T')
const kBox = document.getElementById('K')
const nBox = document.getElementById('N')
const rBox = document.getElementById('R')
var days = ["Pühapäev", "Esmaspäev", "Teisipäev", "Kolmapäev", "Neljapäev", "Reede", "Laupäev"];



function scrolltoE() {
    eBox.scrollIntoView(true);
}
function scrolltoT() {
    tBox.scrollIntoView(true);
}
function scrolltoK() {
    kBox.scrollIntoView(true);
}
function scrolltoN() {
    nBox.scrollIntoView(true);
}
function scrolltoR() {
    rBox.scrollIntoView(true);
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
                titleDiv.innerHTML = ""
                if (currentday != dateDay) {
                    currentday = dateDay
                    classContainer.append(days[dateDay])
                }
                titleDiv.className = "container"
                titleDiv.innerHTML = '<div class="info">' + '<div class="classtime">' + currentData.timeStart + ' - ' + currentData.timeEnd + '</div>' + '<div class="classname">' + currentData.nameEn + '</div>' + '<div class="classteacher">' + currentData.teachers[0].name + '</div>' + '</div>'
                classContainer.append(titleDiv)
                classStart = (currentData.date.split("T")[0] + "T" + currentData.timeStart)
                classEnd = (currentData.date.split("T")[0] + "T" + currentData.timeEnd)
                console.log(classStart, classEnd)

                if (currentDate > classStart && currentDate < classEnd) {
                    titleDiv.style.background = "yellow";
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


        })
}


search();
getinfo();

function dateCalc(classStart, classEnd) {


}
