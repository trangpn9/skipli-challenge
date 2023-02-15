export interface IFormInput {
  phoneNumber: string;
  accessCode: string;
}

export interface IHeader {
  onSetShowResult: (val: boolean) => void;
}

export interface IModal {
  title?: string | null | undefined;
  show: boolean;
  content: any;
  setShow: (val: boolean) => void;
}