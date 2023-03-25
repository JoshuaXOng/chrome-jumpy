export class DomElementWrapper {
  domElement: Element

  constructor(domElement: Element) {
    this.domElement = domElement;
  }

  IsElementScrollable() {
    return this.domElement.scrollWidth > this.domElement.clientWidth || this.domElement.scrollHeight > this.domElement.clientHeight;
  }

  isElementInteractable() {
    return (this.domElement.nodeType == 1 && (
      this.domElement.tagName == "a" || this.domElement.tagName == "A" || 
      this.domElement.tagName == "input" || this.domElement.tagName == "INPUT" || 
      this.domElement.tagName == "button" || this.domElement.tagName == "BUTTON"
    ));
  }
}

export class HTMLElementsWrapper {
  htmlElements: HTMLCollectionOf<Element>
  
  constructor(htmlElement: HTMLCollectionOf<Element>) {
    this.htmlElements = htmlElement;
  }

  forDomElements(forElement: (htmlElement: Element) => void) {
    for (let i = 0; i < this.htmlElements.length; i++) {
      this.htmlElements[i] && forElement(this.htmlElements[i]!);
    }
  }
}
