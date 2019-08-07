import { createClient, SearchCallbackResponse, SearchEntry, LDAPResult, Client } from 'ldapjs';

const adSuffix = 'dc=example,dc=com';

const searchOptions = {
  filter: `(mail=*@ldap.forumsys.com)`,
  scope: 'sub',
  attributes: ['dn', 'cn', 'givenName', 'sn', 'telephoneNumber', 'mail', 'manager', 'objectClass']
};

async function getClient(): Promise<Client> {
  // TODO extract
  const dn = `cn=read-only-admin,${adSuffix}`;
  const pw = 'password';
  const client = createClient({
    url: 'ldap://ldap.forumsys.com'
  });

  return new Promise<Client>((resolve, reject) => {
    client.bind(dn, pw, err => {
      if (err) {
        return reject(err);
      } else {
        resolve(client);
      }
    });
  });
}

async function unbindClient(client: Client) {
  return new Promise((resolve, reject) => {
    client.unbind(err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

function searchUsers(client: Client): Promise<SearchEntry[]> {
  return new Promise<SearchEntry[]>((resolve, reject) => {
    client.search(adSuffix, searchOptions, (err: Error | null, res: SearchCallbackResponse) => {
      if (err) {
        return reject(err);
      }

      const entries: SearchEntry[] = [];
      res.on('searchEntry', (entry: SearchEntry) => {
        entries.push(entry);
      });

      res.on('end', (result: LDAPResult) => {
        if (result.status === 0) {
          resolve(entries);
        } else {
          reject(new Error(`Failure result with status: ${result.status}`));
        }
      });
    });
  });
}

export default class LdapClient {
  private client: Client;

  async connect() {
    this.client = await getClient();
  }

  async searchUsers(): Promise<SearchEntry[]> {
    return await searchUsers(this.client);
  }

  async disconnect() {
    if (this.client) {
      await unbindClient(this.client);
    }
  }
}
