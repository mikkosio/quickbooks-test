import oauthClient from "@/lib/auth-client";
const OAuthClient = require('intuit-oauth');

export async function GET() {


    const authUri = oauthClient.authorizeUri({
        scope: [OAuthClient.scopes.Accounting],
        state: 'intuit-test',
    });

    const authResponse = await oauthClient.createToken(authUri);
    const oauthToken = authResponse['token']['access_token']
    const realmId = authResponse['token']['realmId']
    const refreshToken = authResponse['token']['refresh_token']


}