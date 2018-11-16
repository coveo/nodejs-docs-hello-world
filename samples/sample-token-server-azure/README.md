# Node.js Express Server Sample

Express server that generates Coveo search tokens for Dynamics portal.

## Configuration

Before running the sample, open `Index.ts` and change this configuration accordingly to represent your environment.

``` javascript
const config = {
    portalUrl: "<your_portal_url>", // example: https://yourportalurl.microsoftcrmportals.com/
    coveoApiKey: "<your_API_key>", // The API key used to query Coveo and create a search token. It must have at least the privileges "Execute query" and "Impersonate" enabled.
    coveoPlatformUrl: "platform.cloud.coveo.com" // The URL of the Coveo Cloud V2 platform.
};
```

## Build

First, you need to build `coveo-search-token-generator` (see [README](../../lib/README.md)).

To build this sample, open npm on the directory of this file. Then, run the following command :

`npm run setup && npm run build`