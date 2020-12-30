require('isomorphic-fetch');
const dotenv = require('dotenv');
const Koa = require('koa');
const next = require('next');
const { default: createShopifyAuth } = require('@shopify/koa-shopify-auth');
const { verifyRequest } = require('@shopify/koa-shopify-auth');
const session = require('koa-session');
const { Pool, Client } = require('pg')


dotenv.config();
const { default: graphQLProxy } = require('@shopify/koa-shopify-graphql-proxy');
const { ApiVersion } = require('@shopify/koa-shopify-graphql-proxy');
const getSubscriptionUrl = require('./server/getSubscriptionUrl');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// pools will use environment variables for connection information
const pool = new Pool({ssl: { rejectUnauthorized: false }})

const text = 'INSERT INTO public.shop(shop, access_token, date_joined, user_scope, user_first_name, user_last_name, user_email, locale, is_owner, is_collaborator, is_email_verified, is_active) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *'

const { SHOPIFY_API_SECRET_KEY, SHOPIFY_API_KEY } = process.env;

app.prepare().then(() => {
    const server = new Koa();
    server.use(session({ secure: true, sameSite: 'none' }, server));
    server.keys = [SHOPIFY_API_SECRET_KEY];

    server.use(
        createShopifyAuth({
            apiKey: SHOPIFY_API_KEY,
            secret: SHOPIFY_API_SECRET_KEY,
            scopes: ['read_products', 'write_products'],
            async afterAuth(ctx) {
                const { shop, accessToken, associatedUserScope, associatedUser } = ctx.session;
                ctx.cookies.set('shopOrigin', shop, {
                    httpOnly: false,
                    secure: true,
                    sameSite: 'none'
                });
                await getSubscriptionUrl(ctx, accessToken, shop);

                console.log("Made it here!")
                console.log(ctx.session)

                try {
                    const now = new Date()
                    const values = [
                        shop,
                        accessToken,
                        now,
                        associatedUserScope,
                        associatedUser.first_name,
                        associatedUser.last_name,
                        associatedUser.email,
                        associatedUser.locale,
                        associatedUser.account_owner,
                        associatedUser.collaborator,
                        associatedUser.email_verified,
                        true
                    ]
                    const res = await pool.query(text, values)
                    console.log(res.rows[0])
                } catch (err) {
                    console.log(err.stack)
                }
            },
        }),
    );

    server.use(graphQLProxy({version: ApiVersion.October19}))
    server.use(verifyRequest());
    server.use(async (ctx) => {
        await handle(ctx.req, ctx.res);
        ctx.respond = false;
        ctx.res.statusCode = 200;
        return
    });

    server.listen(port, () => {
        console.log(`> Ready on http://localhost:${port}`);
    });

});