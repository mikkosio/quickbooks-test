const OAuthClient = require('intuit-oauth');
const QB = require('node-quickbooks');

export async function GET(req: Request) {
    const oauthClient = new OAuthClient({
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        environment: process.env.ENVIRONMENT,
        redirectUri: process.env.REDIRECT_URI,
    });

    const parsedRedirect = req.url;
    try {
        const authResponse = await oauthClient.createToken(parsedRedirect);
        const oauthToken = authResponse['token']['access_token']
        const realmId = authResponse['token']['realmId']
        const refreshToken = authResponse['token']['refresh_token']

        return Response.json(authResponse);

        // const qbo = new QB(
        //     process.env.CLIENT_ID,
        //     process.env.CLIENT_SECRET,
        //     oauthToken,
        //     false,
        //     realmId,
        //     true,
        //     true,
        //     null,
        //     '2.0',
        //     refreshToken,
        // );

        // const transactionList = await new Promise((resolve, reject) => {
        //     qbo.reportTransactionList({ start_date: '2024-01-01', end_date: '2024-12-31' }, (err: Error, data: any) => {
        //         if (err) {
        //             reject(err);
        //         }
        //         resolve(data);
        //     });
        // });

        // return Response.json(transactionList);

        // const invoices = await new Promise((resolve, reject) => {
        //     qbo.findInvoices({}, (err: Error, data: any) => {
        //         if (err) {
        //             reject(err);
        //         }
        //         resolve(data);
        //     });
        // });

        // qbo.updateInvoice({
        //     Id: '39',
        //     SyncToken: '1',
        //     Line: [
        //         {
        //             Id: '1',
        //             Amount: 1000.00,
        //             DetailType: 'SalesItemLineDetail',
        //             SalesItemLineDetail: {
        //                 ItemRef: {
        //                     value: '1',
        //                     name: 'Services',
        //                 },
        //                 TaxCodeRef: {
        //                     value: 'TAX',
        //                 },
        //             },
        //         },
        //     ],
        // }, (err: Error, data: any) => {
        //     if (err) {
        //         console.error(err);
        //     } else {
        //         console.log(data);
        //     }
        // });

        // return Response.json(invoices);
    } catch (err) {
        console.error(err);
    }
}
