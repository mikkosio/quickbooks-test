import NextAuth from 'next-auth';
import { options } from './options';
import { cookies } from 'next/headers';

const handler = NextAuth(options);

const GET = async (req: Request, res: Response) => {
    // check if the request is /api/auth/callback/quickbooks
    const url = new URL(req.url || '');
    console.log("HERERE");
    if (url.pathname === '/api/auth/callback/quickbooks') {
        // print query params
        const realmId = url.searchParams.get('realmId');
        console.log(realmId, 'realmId');

        if (realmId) {
            cookies().set('realmId', realmId, { secure: true });
        }
    }
        
    // Call the handler and pass the request and response objects
    return handler(req, res);
}

export { GET as GET, handler as POST }
