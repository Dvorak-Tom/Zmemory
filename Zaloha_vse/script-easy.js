document.getElementById('easyOption').addEventListener('click', function () {
    window.location.href = 'zmemory-easy.html'; // Replace with the actual file name for the easy game
});

const cards = document.querySelectorAll(".card");
let matched = 0;
let cardOne, cardTwo;
let disableDeck = false;


// typewriter typewriter
let aText = new Array(
    "Congratulations on defeating the zombie army!",
    "Your bravery and quick thinking have", "saved humanity from a terrible fate",
    "We are in awe of your courage and determination.", "WELL DONE"
);
let iSpeed = 100; // time delay of print out
let iIndex = 0; // start printing array at this posision
let iArrLength = aText[0].length; // the length of the text array
let iScrollAt = 20; // start scrolling up at this many lines

let iTextPos = 0; // initialise text position
let sContents = ''; // initialise contents variable
let iRow; // initialise current row

function startTypewriter() {
    // Reset necessary variables
    iIndex = 0;
    iArrLength = aText[0].length;
    iTextPos = 0;
    sContents = '';
    iRow = 0;
    typewriter();
}

function typewriter() {
    sContents = ' ';
    iRow = Math.max(0, iIndex - iScrollAt);
    let destination = document.getElementById("typedtext");

    while (iRow < iIndex) {
        sContents += aText[iRow++] + '<br />';
    }
    destination.innerHTML = sContents + aText[iIndex].substring(0, iTextPos) + "_";
    if (iTextPos++ == iArrLength) {
        iTextPos = 0;
        iIndex++;
        if (iIndex != aText.length) {
            iArrLength = aText[iIndex].length;
            setTimeout("typewriter()", 500);
        }
    } else {
        setTimeout("typewriter()", iSpeed);
    }
}




function flipCard({ target: clickedCard }) {
    if (cardOne !== clickedCard && !disableDeck) {
        clickedCard.classList.add("flip");
        if (!cardOne) {
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneImg = cardOne.querySelector(".back-view img").src,
            cardTwoImg = cardTwo.querySelector(".back-view img").src;
        matchCards(cardOneImg, cardTwoImg);
    }
}

function matchCards(img1, img2) {
    if (img1 === img2) {
        matched++;
        if (matched == 4) {

            let myElement = document.getElementById("win-screen");
            myElement.style.display = "flex";
            startTypewriter();
            setTimeout(() => {
                return shuffleCard();
            }, 1000);
        }

        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";
        return disableDeck = false;
    }
    setTimeout(() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400);
    setTimeout(() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = "";
        disableDeck = false;
    }, 1200);
}

function shuffleCard() {
    matched = 0;
    disableDeck = false;
    cardOne = cardTwo = "";
    let arr = [1, 2, 3, 4, 1, 2, 3, 4];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);
    cards.forEach((card, i) => {
        card.classList.remove("flip");
        let imgTag = card.querySelector(".back-view img");
        imgTag.src = `images/img-${arr[i]}.png`;
        card.addEventListener("click", flipCard);
    });
}


cards.forEach(card => {
    card.addEventListener("click", flipCard);
});

function toggleElements(showSelector, hideSelector) {
    const showElements = document.querySelectorAll(showSelector);

    showElements.forEach(element => {
        element.style.display = 'flex';
    });

    const hideElements = document.querySelectorAll(hideSelector);
    hideElements.forEach(element => {
        element.style.display = 'none';
    });
}

function showGameEasy() {
    toggleElements('#back-to-menu, #cards-show', '.main-menu');
    let wrapperElement = document.querySelector('.wrapper');
    wrapperElement.classList.add('game-started');
}

function hideGame() {
    toggleElements('.main-menu', '#cards-show, #back-to-menu', '.wrapper.game-started');
    let wrapperElement = document.querySelector('.wrapper');
    wrapperElement.classList.remove('game-started');
    let myElement = document.getElementById("win-screen");
    myElement.style.display = "none";
}


// Loop through each element with class "card" and add click event listener


let counter = document.getElementById('counter');
let frontViewElements = document.getElementsByClassName("card");

let count = 0;

// Function to increment the counter for the clicked element
function incrementCount() {
    count++;
    counter.innerText = "flips: " + count;
    let score = document.getElementById('score')
    score.innerText = `you made ${count} flips`;

}

// Loop through each element with class "card" and add click event listener
for (let i = 0; i < frontViewElements.length; i++) {
    frontViewElements[i].addEventListener("click", incrementCount);
}

// Reset the counter
function resetCounter() {
    count = 0;
    counter.innerText = "flips: " + count;
}



////////////////EASY EASY EASY//////////////
