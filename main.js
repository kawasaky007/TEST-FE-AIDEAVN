document.addEventListener("DOMContentLoaded", function () {
    var arrowLeft = document.querySelector('.slick-prev');
    var arrowRight = document.querySelector('.slick-next');

    var slickTrack = document.querySelector('.slick-track');
    var slickSlice = document.querySelectorAll('.slick-slide');
    var slickDots = document.querySelectorAll('.slick-dots li');

    var btn = document.querySelectorAll('.slick-dots button');
    var eleIsClicked = 0;

    var size = slickSlice[0].clientWidth;
    var count = 1, time = 4000;
    var stateTab = true;
    var stateTranslateOfSlickTrack = true;
    var v_interval = "";

    var hidden, visibilityChange;
    if (typeof document.hidden !== "undefined") {
        hidden = "hidden";
        visibilityChange = "visibilitychange";
    } else if (typeof document.msHidden !== "undefined") {
        hidden = "msHidden";
        visibilityChange = "msvisibilitychange";
    } else if (typeof document.webkitHidden !== "undefined") {
        hidden = "webkitHidden";
        visibilityChange = "webkitvisibilitychange";
    }

    function handleVisibilityChange() {
        stateTab = (document[hidden]) ? false : true;
        if (stateTab) {
            run_setInterval();
        } else {
            run_clearInterval();
        }
    }

    document.addEventListener(visibilityChange, handleVisibilityChange, false);

    // Khi click vào arrow left
    arrowLeft.addEventListener("click", function (e) {
        if (stateTranslateOfSlickTrack) {
            run_clearInterval();
            commonFuncBothArrows(true, false, e);
            run_setInterval();
        }
    });

    // Khi click vào arrow right
    arrowRight.addEventListener("click", function (e) {
        if (stateTranslateOfSlickTrack) {
            run_clearInterval();
            commonFuncBothArrows(false, true, e);
            run_setInterval();
        }
    });

    function commonFuncBothArrows(arrowL, arrowR, e) {
        e.preventDefault();
        stateTranslateOfSlickTrack = false;
        if (arrowL) {
            if (count <= 0) { return; }
        } else {
            if (arrowR) {
                if (count >= slickSlice.length - 1) { return; }
            }
        }
        slickDots[count - 1].classList.remove('slick-active');
        slickTrack.style.transition = `transform 0.5s ease-in-out`;
        count = arrowL ? --count : ++count;
        console.log('count - ' + count);
        slickTrack.style.transform = `translate3d(${-size * count}px,0px,0px)`;
        eleIsClicked = count - 1;
        switch (count) {
            case 0:
                slickDots[slickDots.length - 1].classList.add('slick-active');
                break;
            case slickSlice.length - 1:
                slickDots[0].classList.add('slick-active');
                break;
            default:
                slickDots[count - 1].classList.add('slick-active');
                break;
        }
    }

    btn.forEach((elem) => {
        elem.addEventListener('click', () => {
            if (stateTranslateOfSlickTrack) {
                run_clearInterval();
                slickTrack.style.transition = `transform 0.5s ease-in-out`;
                count = Number(elem.textContent);
                console.log("eleIsClicked - btn - " + eleIsClicked)
                slickDots[eleIsClicked].classList.remove('slick-active');
                slickDots[count - 1].classList.add('slick-active');
                slickTrack.style.transform = `translate3d(${-size * count}px,0px,0px)`;
                eleIsClicked = count - 1;
                run_setInterval();
            }
        });
    });

    run_setInterval();
    function run_setInterval() {
        v_interval = setInterval(() => {
            slickDots[count - 1].classList.remove('slick-active');
            slickTrack.style.transition = "transform 0.5s ease-in-out";
            slickTrack.style.transform = `translate3d(${-size * (++count)}px,0px,0px)`;
            // console.log('count - ' + (count))
            eleIsClicked = count - 1;
            if (count === slickSlice.length - 1) {
                slickDots[0].classList.add('slick-active');
            } else {
                slickDots[count - 1].classList.add('slick-active');
            }
        }, time);
    }

    function run_clearInterval() {
        clearInterval(v_interval);
    }

    slickTrack.addEventListener('transitionend', () => {
        stateTranslateOfSlickTrack = true;
        let nameClassSlickSlide = slickSlice[count].id;
        if (nameClassSlickSlide === 'lastClone' || nameClassSlickSlide === 'firstClone') {
            slickTrack.style.transition = `none`;
            count = (nameClassSlickSlide === 'lastClone') ? slickSlice.length - 2 : (nameClassSlickSlide === 'firstClone') ? 1 : count;
            eleIsClicked = count - 1;
            slickTrack.style.transform = `translateX(-${size * count}px)`;
        }
    })
}, false)

function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}
let data
readTextFile("./people.json", function (text) {
    data = JSON.parse(text);
    document.getElementById('list-result').innerHTML = data.map((item) => {
        return `
        <div class="item-result">
        <div class="avatar">
           <img src="https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg?w=2000" alt="" srcset=""> 
        </div>
        <div class="info">
            <p class="name">${item.name}</p>
            <p class="address">${item.address}</p>
            <div class="category">
            ${item.category}
            </div>
        </div>
    </div>`;
    }).join('');
});
function getData(data) {
    document.getElementById('list-result').innerHTML = data.map((item) => {
        return `
        <div class="item-result">
        <div class="avatar">
           <img src="https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg?w=2000" alt="" srcset=""> 
        </div>
        <div class="info">
            <p class="name">${item.name}</p>
            <p class="address">${item.address}</p>
            <div class="category">
            ${item.category}
            </div>
        </div>
    </div>`;
    }).join('');
}
let key
document.getElementById('icon-x').style.display="none"

function searchFunc() {
    key = document.getElementById("keySearch").value.toLowerCase();
    if(key==''){
        document.getElementById('icon-x').style.display="none"
    }
    else{
        document.getElementById('icon-x').style.display="block"

    }
    let filler = data.filter(function (item) {
        return item.name.toLowerCase().indexOf(key) > -1 || item.address.toLowerCase().indexOf(key) > -1 || item.category.toLowerCase().indexOf(key) > -1;
    })
    if (filler.length == 0) {
        document.getElementById('list-result').innerHTML = 'Không có kết quả'
    }
    else {
        getData(filler)
    }

}
let boolAToZ = false
function sortFunc() {
    boolAToZ = !boolAToZ;
    var elementSort = document.getElementById("btn-sort");
    let sort
    if (boolAToZ) {
        elementSort.classList.remove('btn-to-z')
        sort = data.sort((a, b) => {
            var textA = a.name.toUpperCase();
            var textB = b.name.toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        })
    }
    else {
        elementSort.classList.add('btn-to-z')

        sort = data.sort((a, b) => {
            var textA = a.name.toUpperCase();
            var textB = b.name.toUpperCase();
            return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
        })
    }
    if (sort.length == 0) {
        document.getElementById('list-result').innerHTML = 'Không có kết quả'
    }
    else {
        getData(sort)
    }

}
function addressFun() {
    let filler = data.sort(function (a, b) {
        var textA = a.address.toUpperCase();
        var textB = b.address.toUpperCase();
        return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
    })
    if (filler.length == 0) {
        document.getElementById('list-result').innerHTML = 'Không có kết quả'
    }
    else {
        getData(filler)
    }
   
}
function clearSearch(){
    document.getElementById("keySearch").value='';
    document.getElementById('icon-x').style.display="none"
    getData(data)
}