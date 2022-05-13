class customError extends Error {
  message: string;
  code: number;

  constructor(msg: string, code: any) {
    super(msg);
    //Object.setPrototypeOf(this, customError.prototype);
    this.message = msg;
    this.code = code;
  }
}
const createError = (msg: string, code: any) => {
  const err = new customError(msg, code);
  return err;
};

export default createError;
