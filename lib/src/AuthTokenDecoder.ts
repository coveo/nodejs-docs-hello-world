import * as jwt from "jsonwebtoken";

export class AuthTokenDecoder {
    public decode(authorization: string, publicKey: string) {
        return jwt.verify(authorization, publicKey);
    }
}
