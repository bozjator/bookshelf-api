import { Request } from "express";
import { UserInReq } from "../auth/model/UserInReq.model";

export interface ApiRequest extends Request {
  user: UserInReq;
}
