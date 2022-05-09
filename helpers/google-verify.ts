import { OAuth2Client } from 'google-auth-library';


const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


export const googleVerify = async (token = '') => {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
  });

  const payload: any = ticket.getPayload();
  const {  name, given_name, family_name, picture, email } = payload;

  return { name: given_name + ' ' + family_name, username: name, img: picture, email };
}
