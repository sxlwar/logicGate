import { Field } from '../api/logicgate-api/Field';
import { LdapUser } from './convertToLdapUser';
import { Record } from '../api/logicgate-api/Record';

function buildTextField(fields: Field[], fieldName: string, value: string = '') {
  const field = fields.find(it => it.name === fieldName)!;
  return {
    currentValues: [
      {
        textValue: value,
        discriminator: 'Common'
      }
    ],
    field: {
      id: field.id,
      fieldType: field.fieldType
    }
  };
}

export function buildContactRecord(fields: Field[], stepId: string, ldapUser: LdapUser): Record {
  return {
    step: {
      id: stepId
    },
    currentValueMaps: [
      buildTextField(fields, 'Company Name:', ldapUser.dn),
      buildTextField(fields, 'Reports To:', ldapUser.manager),
      buildTextField(fields, 'Phone (Business Direct):', ldapUser.telephoneNumber),
      buildTextField(fields, 'Email (Personal):', ldapUser.mail),
      buildTextField(fields, 'Name (Full):', ldapUser.cn)
    ]
  };
}
