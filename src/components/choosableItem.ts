class ChoosableItemWithButton {
  hostElement: HTMLDivElement;
  divElement: HTMLDivElement;
  pElement: HTMLParagraphElement;
  linkElement: HTMLAnchorElement;
  buttonElement: HTMLButtonElement;

  constructor(
    hostElementId: string,
    pContent: string,
    linkContent: string,
    linkUrl: string,
    callbackFn: any,
    divClass?: string,
    buttonClass?: string,
    buttonId?: string
  ) {
    this.hostElement = document.getElementById(
      hostElementId
    )! as HTMLDivElement;
    this.divElement = document.createElement("div");
    this.pElement = document.createElement("p");
    this.linkElement = document.createElement("a");
    this.buttonElement = document.createElement("button");
    if (divClass) {
      this.divElement.classList.add(divClass);
      this.divElement.classList.add("unblurred");
    }
    this.pElement.innerHTML = pContent;
    this.pElement.classList.add("unblurred");
    this.linkElement.innerHTML = linkContent;
    this.linkElement.href = linkUrl;
    this.linkElement.classList.add("unblurred");
    if (buttonClass) {
      this.buttonElement.classList.add(buttonClass);
      this.buttonElement.classList.add("unblurred");
    }
    if (buttonId) {
      this.buttonElement.id = buttonId;
    }

    this.buttonElement.addEventListener("click", callbackFn);

    this.hostElement.appendChild(this.divElement);
    this.divElement.appendChild(this.pElement);
    this.pElement.appendChild(this.linkElement);
    this.divElement.appendChild(this.buttonElement);
  }
}

export default ChoosableItemWithButton;
