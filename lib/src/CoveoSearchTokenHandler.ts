import { ClientRequest, IncomingMessage } from "http";
import * as https from "https";

interface ISearchTokenBodyRequest {
    userIds: {
        name: string;
        provider: string;
    }[];
}

interface ISearchTokenResponse {
    token: string;
}

/**
 * Gets or create a search token.
 */
export class CoveoSearchTokenHandler {
    constructor(private readonly _apiKey: string, private readonly _platformUrl: string) { }

    /**
     * Gets or create a search token for the given user.
     */
    getSearchToken(userEmail: string): Promise<string> {
        const impersonatedUser: ISearchTokenBodyRequest = {
            userIds: [{
                name: userEmail,
                provider: "Email Security Provider"
            }]
        };
        const body: string = JSON.stringify(impersonatedUser);

        const options: https.RequestOptions = {
            host: this._platformUrl,
            port: 443,
            path: "/rest/search/v2/token",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Content-Length": body.length,
                "Authorization": `Bearer ${this._apiKey}`
            }
        };

        return this._fetchSearchToken(body, options);
    }

    private _fetchSearchToken(body: string, options: https.RequestOptions): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            const req: ClientRequest = https.request(options, (res: IncomingMessage): void => {
                res.setEncoding("utf-8");

                let data: string = "";
                res.on("data", (chunk) => {
                    data += chunk;
                });

                res.on("end", () => {
                    if (res.statusCode < 200 || res.statusCode > 299) {
                        reject(res);
                    } else {
                        const tokenResponse: ISearchTokenResponse = JSON.parse(data);
                        resolve(tokenResponse.token);
                    }
                });
            });

            req.write(body);
            req.end();
        });
    }
}
