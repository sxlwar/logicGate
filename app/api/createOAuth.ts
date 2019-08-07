import { fetchToken } from './fetchToken';
import { OAuth } from './logicgate-api/Authentication';

export async function createOAuth(t?: string): Promise<OAuth> {
  const token = !!t ? t : await fetchToken();
  const oauth = new OAuth();
  oauth.accessToken = token;
  return oauth;
}
