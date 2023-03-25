import { HTMLElementsWrapper } from "./element-wrappers";

while (document.getElementsByClassName("chrome-jumpy-buttons").length > 0) {
  (new HTMLElementsWrapper(document.getElementsByClassName("chrome-jumpy-buttons")))
    .forDomElements((domElement) => domElement!.remove());
}
