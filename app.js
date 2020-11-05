let currentclass = 3148
let input = document.getElementById('myInput');
let currentweek = 9
const arrow_forward = document.getElementById('arrow_forward')
const classContainer = document.getElementById('root')


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
                let titleDiv = document.createElement('div')
                titleDiv.innerHTML = ""
                titleDiv.className = "container"
                titleDiv.innerHTML = '<div class="classtime">' + currentData.timeStart + ' - ' + currentData.timeEnd + '</div>' + '<div class="classname">' + currentData.nameEn + '</div>' + '<div class="classteacher">' + currentData.teachers[0].name + '</div>'
                classContainer.append(titleDiv)
            });

        });
}

function search() {
    fetch('https://be.ta19heinsoo.itmajakas.ee/api/teachers/')
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
