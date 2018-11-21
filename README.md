# Coveo Search Token Generator

Node.js module that serves Coveo search tokens for Dynamics portal.

```javascript
// Decodes the authentication token from portal to extract the payload related to the authenticated user.
const portalAuth: IDecodedPortalAuthTokenPayload = await portal.decodeAuthToken(req.headers.authorization);

// Gets a search token from Coveo for the user specified in the token.
const coveoSearchToken: string = await coveo.fetchSearchToken(portalAuth.email);
```

## Install

```bash
npm install coveo-search-token-generator
```

## Liability

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
