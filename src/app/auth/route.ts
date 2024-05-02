require('dotenv').config();
const OAuthClient = require('intuit-oauth');
const { redirect } = require('next/navigation');

export async function GET() {
    const oauthClient = new OAuthClient({
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        environment: process.env.ENVIRONMENT,
        redirectUri: process.env.REDIRECT_URI,
    });
    
    const authUri = oauthClient.authorizeUri({
        scope: [OAuthClient.scopes.Accounting],
        state: 'intuit-test',
    });

    redirect(authUri);
}
