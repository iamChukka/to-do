// import { Response } from "express";

const Response = ({
  res,
  code,
  message,
  data,
  token,
  header,
}: {
  res: any;
  code: number;
  message: string;
  data?: any;
  token?: any;
  header?: {};
}) => {
  return res.status(code).header(header).json({ message, data, token });
};

export default Response;

// 200 for getting, updating resource
// 201: for creating resource
// 422: Validation error
// 400: Bad request
// 401: Unauthorised operation
// 403:------
// 404: Not found error
