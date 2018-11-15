import { ClientRequest, IncomingMessage } from "http";
import * as https from "https";
import { AuthTokenDecoder } from "./AuthTokenDecoder";

const publicKeyUrlPath = "_services/auth/publickey";

export interface IDecodedPortalAuthTokenPayload {
    readonly given_name: string;
    readonly family_name: string;
    readonly email: string;
}

export class DynamicsPortalAuthTokenHandler {
    private readonly _decoder: AuthTokenDecoder;
    private _lastPublicKey: string;

    constructor(private readonly _portalRootUrl: string) {
        if (!_portalRootUrl) {
            throw Error("The portal URL is required.");
        }
        this._decoder = new AuthTokenDecoder();
    }

    private get _publicKeyUrl() {
        const separator: string = this._portalRootUrl.endsWith("/") ? "" : "/";
        return this._portalRootUrl + separator + publicKeyUrlPath;
    }

    async decodeAuthToken(authToken: string): Promise<IDecodedPortalAuthTokenPayload> {
        const publicKey: string = await this._getPublicKey();
        try {
            return this._decoder.decode(authToken, publicKey) as IDecodedPortalAuthTokenPayload;
        } catch (ex) {
            ex.statusCode = 401;
            this._clearState();
            throw ex;
        }
    }

    private _getPublicKey(): Promise<string> {
        let fetchPromise: Promise<string>;

        if (!this._lastPublicKey) {
            fetchPromise = this._fetchPublicKey();
            fetchPromise.then((publicKey: string) => {
                this._lastPublicKey = publicKey;
            });
        } else {
            fetchPromise = Promise.resolve(this._lastPublicKey);
        }

        return fetchPromise;
    }

    private _fetchPublicKey(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            const req: ClientRequest = https.get(this._publicKeyUrl, (res: IncomingMessage) => {
                let data: string = "";
                res.on("data", (chunk) => {
                    data += chunk;
                });

                res.on("end", () => {
                    if (res.statusCode < 200 || res.statusCode > 299) {
                        reject(res);
                    } else {
                        // Public key was fetched.
                        resolve(data);
                    }
                });
            });
            req.end();
        });
    }

    private _clearState(): void {
        this._lastPublicKey = undefined;
    }
}
