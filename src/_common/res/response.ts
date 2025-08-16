export class CustomResponse<T = any> {
  status: number;
  message: string;
  data?: T;

  constructor(status: number, message: string, data?: T) {
    this.status = status;
    this.message = message;
    this.data = data;
  }
}

export class CustomResponseCheck<T = any> {
  exists: boolean;
  data?: T;

  constructor(exist: boolean, data?: T) {
    this.exists = exist;
    this.data = data;
  }
}
