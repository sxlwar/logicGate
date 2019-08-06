import axios from "axios";
import { getEndPoint } from "../config/endpoint";
import { AUTH } from "../config/logicgate";
function base64(text: string): string {
  return Buffer.from(text).toString("base64");
}

export type Token = {
  access_token: string;
  token_type: string; //'bearer',
  expires_in: number;
  scope: string; // 'read write'
};



export async function fetchToken(): Promise<string> {
  const response = await axios.post(getEndPoint('token'), {},
    {
      headers: {
        Authorization: `Basic ${base64(AUTH.client + ":" + AUTH.secret)}`
      }
    }
  );
  const token: Token = response.data;
  return token.access_token;
}
