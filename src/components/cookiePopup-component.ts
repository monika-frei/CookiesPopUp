import cookieStorage from "../storage/cookieStorage";
import PopUp from "./popup-component";
import ChoosableItemWithButton from "./choosableItem";
import { fetchItems } from "../utils/fetchItems";
import { ElementPosition } from "../interfaces/index";

const url = "https://optad360.mgr.consensu.org/cmp/v2/vendor-list.json";
const cookiePropertyName = "gdpr_consent";

class CookiePopUp extends PopUp<HTMLDivElement, HTMLDivElement> {
  popupHeadingElement: HTMLHeadingElement;
  hostElement: HTMLDivElement;
  contentWrapperElement: HTMLDivElement;
  appElement: HTMLDivElement;
  bodyElement: HTMLBodyElement;

  private acceptedVendors: string[];

  constructor(newPopupId: string, popupTitle: string) {
    super("popup", "app", newPopupId, ElementPosition.End);
    this.hostElement = document.getElementById(newPopupId)! as HTMLDivElement;
    this.appElement = document.getElementById("app")! as HTMLDivElement;
    this.contentWrapperElement = document.getElementsByClassName(
      "popup-content"
    )[0]! as HTMLDivElement;
    this.bodyElement = document.getElementsByTagName(
      "body"
    )[0]! as HTMLBodyElement;
    this.contentWrapperElement.id = "vendors-list";
    this.popupHeadingElement = this.hostElement.getElementsByClassName(
      "popup-heading"
    )[0]! as HTMLHeadingElement;
    this.popupHeadingElement.innerHTML = popupTitle;

    this.acceptedVendors = [];

    fetchItems(url).then((data: any) => {
      const vendors = data.vendors;
      const keysArray = Object.keys(vendors);
      keysArray.forEach((key) => {
        if (vendors[key].usesCookies) {
          const divClass = "vendor-element";
          const vendorName = vendors[key].name;
          const policyUrl = vendors[key].policyUrl;
          const buttonClass = "acceptance-button";
          const vendorId = vendors[key].id;

          new ChoosableItemWithButton(
            "vendors-list",
            vendorName,
            policyUrl,
            policyUrl,
            () => this.acceptVendorHandler(vendorName, vendorId),
            divClass,
            buttonClass,
            vendorId
          );
        }
      });
    });

    const rejectButton = this.hostElement.getElementsByClassName(
      "reject-button"
    )[0]!;
    const acceptButton = this.hostElement.getElementsByClassName(
      "accept-button"
    )[0]!;
    rejectButton.addEventListener("click", () => this.saveToStorage(false));
    acceptButton.addEventListener("click", () => this.saveToStorage(true));

    this.shouldShowPopUp();
  }

  acceptVendorHandler = (name: string, id: string) => {
    const vendorButton = document.getElementById(id)! as HTMLButtonElement;
    if (this.acceptedVendors.includes(name)) {
      this.acceptedVendors = this.acceptedVendors.filter(
        (vendor) => vendor !== name && vendor
      );
      vendorButton.classList.remove("accepted");
    } else {
      this.acceptedVendors.push(name);
      vendorButton.classList.add("accepted");
    }
  };

  shouldShowPopUp = () => {
    if (!cookieStorage.getItem(cookiePropertyName)) {
      this.hostElement.classList.remove("hidden");
      this.appElement.classList.add("unactive");
      this.bodyElement.classList.add("unactive-scroll");
    }
  };
  saveToStorage = (bool: boolean) => {
    let date: any = new Date(Date.now() + 86400e3);
    date = date.toUTCString();
    cookieStorage.setItem(
      cookiePropertyName,
      bool
        ? "accepted," +
            this.acceptedVendorsList +
            ";expires=" +
            date +
            ";secure = true"
        : "rejected" + ";secure = true"
    );
    this.hostElement.classList.add("hidden");
    this.appElement.classList.remove("unactive");
    this.bodyElement.classList.remove("unactive-scroll");
  };

  get acceptedVendorsList() {
    return this.acceptedVendors;
  }
}

export default CookiePopUp;
