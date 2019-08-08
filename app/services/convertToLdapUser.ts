import { SearchEntry } from 'ldapjs';

export type LdapUser = {
  dn?: string;
  cn?: string;
  givenName?: string;
  telephoneNumber?: string;
  mail?: string;
  manager?: string;
  objectClass?: string;
};

function itemsToString(items: string | string[] | undefined): string | undefined {
  if (Array.isArray(items)) {
    return items.join(', ');
  } else {
    return items;
  }
}

/**
 *  从 ldap 获取的 entry 的 object 字段用于构造
 *  `ldap user` 实体
 */

export default function convertToLdapUser(entry: SearchEntry): LdapUser {
//   console.log('> convertToLdapUser', entry);
  const { object } = entry;
  
  return {
    dn: entry['dn'],
    cn: itemsToString(object['cn']),
    givenName: itemsToString(object['givenName']),
    telephoneNumber: itemsToString(object['telephoneNumber']),
    mail: itemsToString(object['mail']),
    manager: itemsToString(object['manager']),
    objectClass: itemsToString(object['objectClass'])
  };
}
