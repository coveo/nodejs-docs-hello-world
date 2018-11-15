// Copyright (c) 2005-2018 Coveo Solutions Inc.
import { CoveoSearchTokenHandler, DynamicsPortalAuthTokenHandler, IDecodedPortalAuthTokenPayload } from "coveo-search-token-generator";
import * as expServer from "express";

// -----------------------------------------------------------------------------
// Change this configuration accordingly to represent your environment.
const config = {
    portalUrl: "<your_portal_url>", // example: https://yourportalurl.microsoftcrmportals.com/
    coveoApiKey: "<your_API_key>", // The API key used to query Coveo and create a search token. It must have at least the privileges "Execute query" and "Impersonate" enabled.
    coveoPlatformUrl: "platform.cloud.coveo.com" // The URL of the Coveo Cloud V2 platform.
};
// -----------------------------------------------------------------------------

const portal = new DynamicsPortalAuthTokenHandler(config.portalUrl);
const coveo = new CoveoSearchTokenHandler(config.coveoApiKey, config.coveoPlatformUrl);

const getCoveoToken: expServer.RequestHandler = async (req: expServer.Request, res: expServer.Response): Promise<void> => {
    try {
        // Decodes the authentication token from portal to extract the payload.
        const portalAuth: IDecodedPortalAuthTokenPayload = await portal.decodeAuthToken(req.headers.authorization);
        // Gets a search token from Coveo for the user specified in the token.
        const coveoSearchToken: string = await coveo.getSearchToken(portalAuth.email);
        // Returns the search token to the client.
        res.status(200).send({ coveoSearchToken });
    } catch (ex) {
        const statusCode: number = ex.statusCode || 500;
        const error: string = ex.statusMessage || ex.message || (statusCode === 500 ? "An unexpected error occurred while fetching a search token." : "");
        res.status(statusCode).send({ error, statusCode });
    }
};

const port: string | number = process.env.PORT || 5950;
expServer().
    use((req, res, next) => {
        // Additional headers.
        res.
            header("Access-Control-Allow-Origin", config.portalUrl).
            header("Access-Control-Allow-Methods", "POST,OPTIONS").
            header("Access-Control-Allow-Headers", "Content-Type, Authorization, Content-Length, X-Requested-With");
        next();
    }).
    options("/*", (req: expServer.Request, res: expServer.Response) => res.send(200)).
    post("/token", getCoveoToken).
    use((req, res) => res.status(400).send({ error: "This request did not match any endpoint.", status: 400 })).
    listen(process.env.PORT || 5950, () => console.log(`Echo Listening on port ${port}`));
