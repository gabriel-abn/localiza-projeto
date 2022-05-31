import { Response, Request } from "express";
import { IController } from "../protocols/Controller";

export const adaptRoute = (controller: IController) => {
  return async (req: Request, res: Response) => {
    const request = {
      ...(req.body || {}),
      ...(req.params || {}),
    };
  };
};
