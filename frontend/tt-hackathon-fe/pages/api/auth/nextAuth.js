import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default NextAuth({

    providers: [
        Providers.TikTok({
            clientId: process.env.TIKTOK_CLIENT_ID,
            clientSecret: process.env.TIKTOK_CLIENT_SECRET,
            authorizationUrl: 'https://open-api.tiktok.com/platform/oauth/connect/',
            scope: 'user.info.basic user.info.avatar',
            state : Math.random().toString(36).substring(2),
        }),
    ],
});
