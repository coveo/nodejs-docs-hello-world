# Node.js Express Server Sample

Express server that generates Coveo search tokens for Dynamics portal.

## Configuration

Before running the sample, open `Index.ts` and change this configuration accordingly to represent your environment.

```javascript
const config = {
    portalUrl: "<your_portal_url>", // Example: https://yourportalurl.microsoftcrmportals.com (without slash at the end)
    coveoApiKey: "<your_API_key>", // The API key used to query Coveo and create a search token. It must have at least the privilege "Impersonate" enabled.
    coveoPlatformUrl: "platform.cloud.coveo.com" // The URL of the Coveo Cloud V2 platform.
};
```

## Build

To build this sample, open npm on the directory of this file. Then, run the following command :

```bash
npm run setup
npm run build
```

## Liability

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.