import { OAuth } from './logicgate-api/Authentication';

export async function createOAuth(token: string): Promise<OAuth> {
  const oauth = new OAuth();
  oauth.accessToken = token;
  return oauth;
}
