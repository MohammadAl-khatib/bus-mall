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

function getRandom(min, max) {

    let result = Math.floor(Math.random() * (max - min + 1) + min);
    return result;
}

function ImgObject(imgName, imgSrc) {

    this.imgName = imgName;
    this.imgSrc = imgSrc;
    this.numShown = 0;
    this.votes = 0;
    ImgObject.objArray.push(this);

}

ImgObject.objArray = [];

letx = 0;
lety = 0;
letz = 0;
function render() {

    let firstRandom = getRandom(0, ImgObject.objArray.length - 1)
    let secondRandom = getRandom(0, ImgObject.objArray.length - 1)
    let thirdRandom = getRandom(0, ImgObject.objArray.length - 1)

    while (firstRandom === secondRandom || firstRandom === thirdRandom || secondRandom === thirdRandom) {
        firstRandom = getRandom(0, ImgObject.objArray.length - 1)
        secondRandom = getRandom(0, ImgObject.objArray.length - 1)
        thirdRandom = getRandom(0, ImgObject.objArray.length - 1)
    }
    firstImage.src = './img/' + ImgObject.objArray[firstRandom].imgSrc;
    secondImage.src = './img/' + ImgObject.objArray[secondRandom].imgSrc;
    thirdImage.src = './img/' + ImgObject.objArray[thirdRandom].imgSrc;

    x = firstRandom;
    y = secondRandom;
    z = thirdRandom;

    ImgObject.objArray[firstRandom].numShown++;
    ImgObject.objArray[secondRandom].numShown++;
    ImgObject.objArray[thirdRandom].numShown++;
}

for (let i = 0; i < imageNames.length; i++) {
    let newImg = new ImgObject(imageNames[i].split('.')[0], imageNames[i]);
}
console.log(ImgObject.objArray);

render();

imgSection.addEventListener('click', clickListener);
function clickListener(eventHolder) {
    if ((eventHolder.target.id === 'firstImage' || eventHolder.target.id === 'secondImage' || eventHolder.target.id === 'thirdImage') && numClicked < numClickedLimit) {
        if (eventHolder.target.id === 'firstImage') { ImgObject.objArray[x].votes++ };
        if (eventHolder.target.id === 'secondImage') { ImgObject.objArray[y].votes++ };
        if (eventHolder.target.id === 'thirdImage') { ImgObject.objArray[z].votes++ };
        render();
        numClicked++;
    }
    if (numClicked === 25) {
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


