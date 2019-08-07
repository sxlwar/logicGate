/**
 * 本实例演示了如何从 ldap 协议获取数据
 *
 * 以及监听 ldap 的事件钩子
 *
 */
import { createClient } from 'ldapjs';
import { ifError } from 'assert';

// LDAP Connection Settings
const adSuffix = 'dc=example,dc=com';
const dn = `cn=read-only-admin,${adSuffix}`;
const pw = 'password';

// createServer()
// Create client and bind to AD
export const client = createClient({
  url: 'ldap://ldap.forumsys.com'
});

client.bind(dn, pw, err => {
  ifError(err);
});

// Search AD for user
export const searchOptions = {
  filter: `(mail=*@ldap.forumsys.com)`,
  scope: 'sub',
  attributes: ['dn', 'cn', 'givenName', 'sn', 'telephoneNumber', 'mail', 'manager', 'objectClass']
};

// client.search(adSuffix, searchOptions, (err, res: SearchCallbackResponse) => {
//     ifError(err);

//     res.on('searchEntry', entry => {
//         // Here's the detailed search results
//         console.log(entry.object);
//     });
//     res.on('searchReference', referral => {
//         console.log('referral: ' + referral.uris.join());
//     });
//     res.on('error', err => {
//         console.error('error: ' + err.message);
//     });
//     res.on('end', result => {
//         console.log('status: ' + result.status);
//     });
// });

// Wrap up
// client.unbind(err => {
//     ifError(err);
// });

export default client;
