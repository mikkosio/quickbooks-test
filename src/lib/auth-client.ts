require('dotenv').config();
const OAuthClient = require('intuit-oauth');

const oauthClient = new OAuthClient({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    environment: process.env.ENVIRONMENT,
    redirectUri: process.env.REDIRECT_URI,
});
const authResponse = await oauthClient.createToken(parsedRedirect);
const oauthToken = authResponse['token']['access_token']
const realmId = authResponse['token']['realmId']
const refreshToken = authResponse['token']['refresh_token']

export default oauthClient;