export interface VendorList {
  gvlSpecificationVersion: number;
  vendorListVersion: number;
  tcfPolicyVersion: number;
  lastUpdated: string;
  purposes: any;
  specialPurposes: any;
  features: any;
  specialFeatures: any;
  stacks: any;
  vendors: any;
}

export enum ElementPosition {
  Start = "afterbegin",
  End = "beforeend",
}
