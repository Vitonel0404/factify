import { UserFromToken } from "src/interfaces/user-from-token.interface";

declare global {
  namespace Express {
    interface Request {
      user?: UserFromToken;
    }
  }
}
