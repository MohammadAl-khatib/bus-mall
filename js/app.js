`use strict`;

let imageNames = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'water-can.jpg', 'wine-glass.jpg'];
let numClicked = 0;
let numClickedLimit = 25;
let imgSection = document.getElementById('imgSection');
let firstImage = document.getElementById('firstImage');
let secondImage = document.getElementById('secondImage');
let thirdImage = document.getElementById('thirdImage');
let viewResults = document.getElementById('viewResults');
let resultsList = document.getElementById('resultsList');
let voteArr = [];
let shownArr = [];

function getRandom(min, max) {

    let result = Math.floor(Math.random() * (max - min + 1) + min);
    return result;
}
function creatChart() {
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: imageNames,
            datasets: [{
                label: '# of Votes',
                data: voteArr,
                backgroundColor: [
                    `rgb(0, 153, 255)`
                ],
                borderColor: [
                    `rgb(0, 255, 0)`
                ],
                borderWidth: 1
            },
            {
                label: '# shown',
                data: shownArr,
                backgroundColor: [
                    `rgb(255, 204, 0)`
                ],
                borderColor: [
                    `rgb(0, 51, 102)`
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function ImgObject(imgName, imgSrc,numShown=0, votes=0) {

    this.imgName = imgName;
    this.imgSrc = imgSrc;
    this.numShown = numShown;
    this.votes = votes;
    ImgObject.objArray.push(this);
}

ImgObject.objArray = [];

let firstRandom = 0;
let secondRandom = 0;
let thirdRandom = 0;
let firstRandomSave = 20;
let secondRandomSave = 20;
let thirdRandomSave = 20;

function render() {

    do {
        firstRandom = getRandom(0, ImgObject.objArray.length - 1)
        secondRandom = getRandom(0, ImgObject.objArray.length - 1)
        thirdRandom = getRandom(0, ImgObject.objArray.length - 1)
    }
    while (firstRandom === secondRandom || firstRandom === thirdRandom || secondRandom === thirdRandom || firstRandom === firstRandomSave || firstRandom === secondRandomSave || firstRandom === thirdRandomSave || secondRandom === firstRandomSave || secondRandom === secondRandomSave || secondRandom === thirdRandomSave || thirdRandom === firstRandomSave || thirdRandom === secondRandomSave || thirdRandom === thirdRandomSave)

    firstImage.src = './img/' + ImgObject.objArray[firstRandom].imgSrc;
    secondImage.src = './img/' + ImgObject.objArray[secondRandom].imgSrc;
    thirdImage.src = './img/' + ImgObject.objArray[thirdRandom].imgSrc;

    localStorage.places = JSON.stringify(ImgObject.objArray);

    ImgObject.objArray[firstRandom].numShown++;
    ImgObject.objArray[secondRandom].numShown++;
    ImgObject.objArray[thirdRandom].numShown++;
}
if (localStorage.places){       // local storage
            let saveData = JSON.parse(localStorage.places);
            for(i=0;i<saveData.length;i++){
                new ImgObject (saveData[i].imgName,saveData[i].imgSrc,saveData[i].numShown,saveData[i].votes)
            }
}else{

    for (let i = 0; i < imageNames.length; i++) {
        let newImg = new ImgObject(imageNames[i].split('.')[0], imageNames[i]);
    }
}

render();

imgSection.addEventListener('click', clickListener);
function clickListener(eventHolder) {
    if ((eventHolder.target.id === 'firstImage' || eventHolder.target.id === 'secondImage' || eventHolder.target.id === 'thirdImage') && numClicked < numClickedLimit) {
        if (eventHolder.target.id === 'firstImage') { ImgObject.objArray[firstRandom].votes++ };
        if (eventHolder.target.id === 'secondImage') { ImgObject.objArray[secondRandom].votes++ };
        if (eventHolder.target.id === 'thirdImage') { ImgObject.objArray[thirdRandom].votes++ };
        render();
        numClicked++;
        firstRandomSave = firstRandom;
        secondRandomSave = secondRandom;
        thirdRandomSave = thirdRandom;
    }
    if (numClicked === 25) {
        for (let i = 0; i < ImgObject.objArray.length; i++) {
            voteArr.push(ImgObject.objArray[i].votes)
            shownArr.push(ImgObject.objArray[i].numShown)
        }
        creatChart();
        imgSection.removeEventListener('click', clickListener);


        viewResults.addEventListener('click', viewListener);
        function viewListener() {
            for (let i = 0; i < ImgObject.objArray.length; i++) {
                let li1 = document.createElement('li');
                resultsList.append(li1);
                li1.textContent = ImgObject.objArray[i].imgName + ' had ' + ImgObject.objArray[i].votes + ` votes, and was seen ` + ImgObject.objArray[i].numShown + ` times`
            }
            viewResults.removeEventListener('click', viewListener);
        }
    }
}


