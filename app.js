let currentclass = 3148
let input = document.getElementById('myInput');


function getinfo() {
    fetch('https://be.ta19heinsoo.itmajakas.ee/api/lessons/groups=' + currentclass + '&weeks=9')
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            //teeb tunnid
            const classContainer = document.getElementById('root')
            classes = data.timetableEvents
            classes.forEach(currentData => {
                let titleDiv = document.createElement('div')
                titleDiv.className = "container"
                titleDiv.innerHTML = '<div class="title">' + currentData.nameEn + '</div>' + currentData.timeStart + ' - ' + currentData.timeEnd + '</div>'
                classContainer.append(titleDiv)


            });

        });
}
function search() {
    fetch('http://be.ta19heinsoo.itmajakas.ee/api/teachers/')
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            console.log(data)
            fname = data.FirstName



            const options = {
                includeScore: true,
                // Search in `author` and in `tags` array
                keys: ['author', 'tags']
            }

            const fuse = new Fuse(data, options)

            const result = fuse.search(input)
            console.log(result)


        });
};


search();
getinfo();
