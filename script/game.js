const gameConfig = {
  easy: {
    matchCount: 4,
    cardArray: [1, 2, 3, 4, 1, 2, 3, 4],
  },
  medium: {
    matchCount: 6,
    cardArray: [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6],
  },

  hard: {
    matchCount: 8,
    cardArray: [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8],
  },
  hardcore: {
    matchCount: 10,
    cardArray: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  },
};

const cards = document.querySelectorAll(".card");
let matched = 0;
let cardOne, cardTwo;
let disableDeck = false;

function flipCard({ target: clickedCard }) {
  if (cardOne !== clickedCard && !disableDeck) {
    clickedCard.classList.add("flip");
    if (!cardOne) {
      return (cardOne = clickedCard);
    }
    cardTwo = clickedCard;
    disableDeck = true;
    let cardOneImg = cardOne.querySelector(".back-view img").src,
      cardTwoImg = cardTwo.querySelector(".back-view img").src;
    matchCards(cardOneImg, cardTwoImg, currentDifficulty);
    incrementCount();
  }
}

function matchCards(img1, img2, difficulty) {
  if (img1 === img2) {
    matched++;
    if (matched === gameConfig[difficulty].matchCount) {
      let myElement = document.getElementById("win-screen");
      myElement.style.display = "flex";
      startTypewriter();
      setTimeout(() => {
        return shuffleCard(difficulty);
      }, 1000);
    }
    cardOne.removeEventListener("click", flipCard);
    cardTwo.removeEventListener("click", flipCard);
    cardOne = cardTwo = "";
    return (disableDeck = false);
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

shuffleCard();

function shuffleCard(difficulty) {
  matched = 0;
  disableDeck = false;
  cardOne = cardTwo = "";
  const arr = [...gameConfig[currentDifficulty].cardArray]; // using spread to clone
  arr.sort(() => (Math.random() > 0.5 ? 1 : -1));
  cards.forEach((card, i) => {
    card.classList.remove("flip");
    let imgTag = card.querySelector(".back-view img");
    imgTag.src = `../images/img-${arr[i]}.png`;
    card.addEventListener("click", flipCard);
  });
}

cards.forEach((card) => {
  card.addEventListener("click", flipCard);
});

let aText = new Array(
  "Congratulations on defeating the zombie army!",
  "Your bravery and quick thinking have",
  "saved humanity from a terrible fate",
  "We are in awe of your courage and determination.",
  "WELL DONE"
);
let iSpeed = 100; // time delay of print out
let iIndex = 0; // start printing array at this posision
let iArrLength = aText[0].length; // the length of the text array
let iScrollAt = 20; // start scrolling up at this many lines

let iTextPos = 0; // initialise text position
let sContents = ""; // initialise contents variable
let iRow;

function startTypewriter() {
  // Reset necessary variables
  iIndex = 0;
  iArrLength = aText[0].length;
  iTextPos = 0;
  sContents = "";
  iRow = 0;
  typewriter();
}

function typewriter() {
  sContents = " ";
  iRow = Math.max(0, iIndex - iScrollAt);
  let destination = document.getElementById("typedtext");

  while (iRow < iIndex) {
    sContents += aText[iRow++] + "<br />";
  }
  destination.innerHTML =
    sContents + aText[iIndex].substring(0, iTextPos) + "_";
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

cards.forEach((card) => {
  card.addEventListener("click", flipCard);
});

let counter = document.getElementById("counter");
let frontViewElements = document.getElementsByClassName("card");

let count = 0;

// Function to increment the counter for the clicked element
function incrementCount() {
  count++;
  counter.innerText = "turns: " + count;
  let score = document.getElementById("score");
  score.innerText = `you made ${count} turns`;
}

function resetCounter() {
  count = 0;
  counter.innerText = "turns: " + count;
}

function returnToMenu() {
  window.location.href = "../index.html";
}

// display the cards on page load
window.onload = function () {
  shuffleCard(currentDifficulty); // shuffle cards or any other initial setup you want

  // Now make cards visible and change their opacity to 1
  document.querySelectorAll(".card").forEach((card) => {
    card.style.visibility = "visible";
    card.style.opacity = "1";
  });
};
