let currentclass = 3148



function getinfo() {
    fetch('https://be.ta19heinsoo.itmajakas.ee/api/lessons/groups=' + currentclass + '&weeks=9')
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            // klassi valik
            const selectContainer = document.getElementById('selectDiv')
            selectContainer.innerHTML = '<select id="classSelect"></select>'










            //teeb tunnid
            const classContainer = document.getElementById('root')
            console.log(data)
            classes = data.timetableEvents
            classes.forEach(currentData => {

                let titleDiv = document.createElement('div')
                titleDiv.className = "container"
                titleDiv.innerHTML = '<div class="title">' + currentData.nameEn + '</div>' + currentData.timeStart + ' - ' + currentData.timeEnd + '</div>'
                classContainer.append(titleDiv)

            });




        });
}

getinfo()
