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
