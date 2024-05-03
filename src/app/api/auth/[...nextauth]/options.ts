import type { NextAuthOptions } from 'next-auth';
import { cookies } from 'next/headers';

export const options: NextAuthOptions = {
    providers: [
        {
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            id: 'quickbooks',
            name: 'QuickBooks',
            type: 'oauth',
            wellKnown: 'https://developer.api.intuit.com/.well-known/openid_sandbox_configuration',
            authorization: {
                params: {
                    scope: 'com.intuit.quickbooks.accounting openid profile email phone address',
                },
            },
            userinfo: {
                async request(context) {
                    if (context?.tokens?.access_token) {
                        return await context.client.userinfo(context?.tokens?.access_token)
                    } else {
                        throw new Error('No access token')
                    }
                }
            },
            idToken: true,
            checks: ['pkce', 'state'],
            profile(profile) {
                return {
                    id: profile.sub,
                    name: profile.givenName + ' ' + profile.familyName,
                    email: profile.email
                }
            },
        }
    ],
    callbacks: {
        async jwt({ token, account, profile }) {
            if (account) {
                token.userId = profile?.sub;
                token.accessToken = account.access_token;
                token.refreshToken = account.refresh_token;
            }
            return token
        },
        async session({ session, token }) {
            session.userId = token.userId;
            session.accessToken = token.accessToken;
            session.refreshToken = token.refreshToken;
            session.realmId = cookies().get('realmId')?.value;
            
            cookies().delete('realmId');
            return session
        }
    }
}
