# Coveo Search Token Generator

Node.js module that serves Coveo search tokens for a Dynamics portal.

```javascript
// Decodes the authentication token from the portal and extracts from it the e-mail address of the current user (i.e. the one that made the call).
const portalAuth: IDecodedPortalAuthTokenPayload = await portal.decodeAuthToken(req.headers.authorization);

// Fetches a search token from Coveo Cloud providing the current user e-mail (or empty for anonymous users), which then returns the search token.
const coveoSearchToken: string = await coveo.fetchSearchToken(portalAuth.email);
```

## Install

```bash
npm install coveo-search-token-generator
```

## Liability

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
