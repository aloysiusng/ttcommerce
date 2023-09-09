import fetch from 'node-fetch';
import { serialize } from 'cookie';

const CLIENT_KEY = 'awzwxop17u6eilhw';
const SERVER_ENDPOINT_REDIRECT = 'localhost:3000'; 

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  const csrfState = Math.random().toString(36).substring(2);
  const cookie = serialize('csrfState', csrfState, {
    maxAge: 60 * 1, 
    path: '/',
  });

  // Set the cookie
  res.setHeader('Set-Cookie', cookie);

  const url = `https://www.tiktok.com/v2/auth/authorize/?client_key=${CLIENT_KEY}&scope=user.info.basic&response_type=code&redirect_uri=${SERVER_ENDPOINT_REDIRECT}&state=${csrfState}`;

  // Redirect to TikTok's OAuth URL
  res.redirect(url);
}
