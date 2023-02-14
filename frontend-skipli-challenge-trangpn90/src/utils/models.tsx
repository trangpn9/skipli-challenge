export interface IFormInput {
  phoneNumber: string;
  accessCode: string;
}

export interface IHeader {
  onSetShowResult: (val: boolean) => void;
}

export interface IModal {
  title?: string;
  show: boolean;
  setShow: (val: boolean) => void;
}