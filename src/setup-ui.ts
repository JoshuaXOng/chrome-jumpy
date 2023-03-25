import { DomElementWrapper, HTMLElementsWrapper } from "./element-wrappers";

function* getCharacterCombinationsGenerator() {
  const lowCharAlphabet = "abcdefghijklmnopqrstuvwxyz";

  let charCombIndices = [0]
  while (true) {
    let newCharComb = "";
    for (let combCharIndex of charCombIndices) {
      newCharComb += lowCharAlphabet[combCharIndex]
    }
    
    yield newCharComb

    if (charCombIndices.slice().reduce((isAllMaxed, currCharIndex) => isAllMaxed && currCharIndex === lowCharAlphabet.length - 1, true)) {
      charCombIndices = charCombIndices.fill(0)
      charCombIndices.push(0);
    } else {
      let firstNonMaxIdx = undefined
      for (let index = charCombIndices.length - 1; index >= 0; index--) {
        if (charCombIndices[index] !== lowCharAlphabet.length - 1) {
          firstNonMaxIdx = index
          break;
        }
      }
      
      charCombIndices[firstNonMaxIdx!] += 1 
      charCombIndices.fill(0, firstNonMaxIdx! + 1)
    }
  }
};

const upperKeyCombHtml = `<div class="chrome-jumpy-buttons" style="
    display: inline-block;
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    color: black;
    text-decoration: none;"
  >
    <kbd style="
      display: inline-block;
      position: absolute;
      top: 0;
      left: 0;
      padding: 0px 5px 0px 5px;
      border: 2px solid black; 
      box-shadow: 2px 2px black; 
      background: lightgrey; 
      opacity: 0.75;
      font-weight: 600;
      letter-spacing: .05em; 
      white-space: nowrap;"
    >`
const lowerKeyCombHtml = `
    </kdb>
  </div>`;

while (document.getElementsByClassName("chrome-jumpy-buttons").length > 0) {
  (new HTMLElementsWrapper(document.getElementsByClassName("chrome-jumpy-buttons")))
    .forDomElements((domElement) => domElement!.remove());
}

let characterCombinationsGenerator = getCharacterCombinationsGenerator();

(new HTMLElementsWrapper(document.getElementsByTagName("*")))
  .forDomElements((domElement) => {
    if (new DomElementWrapper(domElement).isElementInteractable()) {
      if (!(domElement as HTMLElement).style.position) {
        (domElement as HTMLElement).style.setProperty("position", "relative");
      }
      (domElement as HTMLElement).insertAdjacentHTML("beforeend", upperKeyCombHtml! + characterCombinationsGenerator.next().value + lowerKeyCombHtml);
    }
  });
