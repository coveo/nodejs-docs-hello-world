// Copyright (c) 2005-2018 Coveo Solutions Inc.
import { CoveoSearchTokenGenerator, DynamicsPortalAuthTokenDecoder, IDecodedPortalAuthTokenPayload } from "coveo-search-token-generator";
import * as express from "express";

// -----------------------------------------------------------------------------
// Change this configuration accordingly to represent your environment.
const config = {
    portalUrl: "https://yourportalurl.microsoftcrmportals.com/", // Example: https://yourportalurl.microsoftcrmportals.com
    coveoApiKey: "<your_API_key>", // The API key used to query Coveo and create a search token. It must have at least the privilege "Impersonate" enabled.
    coveoPlatformUrl: "platform.cloud.coveo.com" // The Coveo Cloud URL.
};
// -----------------------------------------------------------------------------

config.portalUrl = config.portalUrl.replace(/\/$/, ""); // Remove from the address an eventual trailing slash.

const portal = new DynamicsPortalAuthTokenDecoder(config.portalUrl);
const coveo = new CoveoSearchTokenGenerator(config.coveoApiKey, config.coveoPlatformUrl);

const getCoveoToken: express.RequestHandler = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        let userEmail: string;
        if (req.headers.authorization) {
            // Decodes the authentication token from your portal to extract the payload related to the authenticated user.
            const portalAuth: IDecodedPortalAuthTokenPayload = await portal.decodeAuthToken(req.headers.authorization);
            userEmail = portalAuth.email;
        }

        // Fetches a search token from Coveo for the user passed as argument.
        const coveoSearchToken: string = await coveo.fetchSearchToken(userEmail);

        // Returns the search token to the client.
        res.status(200).send({ coveoSearchToken });
    } catch (ex) {
        const statusCode: number = ex.statusCode || 500;
        const error: string = ex.statusMessage || ex.message || (statusCode === 500 ? "An unexpected error occurred while fetching a search token." : "");
        res.status(statusCode).send({ error, statusCode });
    }
};

const port: string | number = process.env.PORT || 5950;
express().
    use((req, res, next) => {
        // Additional headers.
        res.
            header("Access-Control-Allow-Origin", config.portalUrl).
            header("Access-Control-Allow-Methods", "POST,OPTIONS").
            header("Access-Control-Allow-Headers", "Content-Type, Authorization, Content-Length, X-Requested-With");
        next();
    }).
    options("/*", (req: express.Request, res: express.Response) => res.send(200)).
    get("/", (req, res) => res.status(200).send("Server is up and running.")).
    post("/token", getCoveoToken).
    use((req, res) => res.status(400).send({ error: "This request did not match any endpoint.", status: 400 })).
    listen(port, () => console.info(`Token server listening on port ${port}.`));
