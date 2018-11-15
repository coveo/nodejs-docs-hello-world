import * as jwt from "jsonwebtoken";

/**
 * Authentication token decoder.
 */
export class AuthTokenDecoder {

    /**
     * Decodes the given token using the public key
     * returns - The decoded token.
     */
    public decode(authorization: string, publicKey: string) {
        return jwt.verify(authorization, publicKey);
    }
}
