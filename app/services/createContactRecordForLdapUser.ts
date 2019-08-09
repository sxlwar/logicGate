import { createOAuth } from '../api/createOAuth';
import { OAuth } from '../api/logicgate-api/Authentication';
import { FieldsApi } from '../api/logicgate-api/FieldsApi';
import { Record } from '../api/logicgate-api/Record';
import { RecordsApi } from '../api/logicgate-api/RecordsApi';
import { WorkflowsApi } from '../api/logicgate-api/WorkflowsApi';
import { baseUrl } from '../config/endpoint';
import { buildContactRecord } from './buildContactRecord';
import { LdapUser } from './convertToLdapUser';
import { Field } from '../api/logicgate-api/Field';

async function fetchWorkflowId(baseUrl: string, stepId: string, oauth: OAuth) {
  const workflowsApi = new WorkflowsApi(baseUrl);
  workflowsApi.setDefaultAuthentication(oauth);
  const res1 = await workflowsApi.findByStepUsingGET(stepId);
  return res1.body.id!;
}

async function fetchWorkflowFields(baseUrl: string, workflowId: string, oauth: OAuth): Promise<Field[]> {
  const fieldsApi = new FieldsApi(baseUrl);
  fieldsApi.setDefaultAuthentication(oauth);
  const res2 = await fieldsApi.findByWorkflowWithValuesUsingGET(workflowId);
  return res2.body;
}

async function createRecord(baseUrl: string, record: Record, oauth: OAuth) {
  const recordsApi = new RecordsApi(baseUrl);
  recordsApi.setDefaultAuthentication(oauth);
  const res = await recordsApi.createPublicUsingPOST(record);
  return res;
}

export default async function createContactRecordForLdapUser(
  token: string,
  stepId: string,
  ldapUser: LdapUser
): Promise<Record> {
  const oauth = await createOAuth(token);

  const workflowId = await fetchWorkflowId(baseUrl, stepId, oauth);
  // console.log('workflowId: ', workflowId);

  const fields = await fetchWorkflowFields(baseUrl, workflowId, oauth);
  // console.log('fields:', fields);

  const record: Record = buildContactRecord(fields, stepId, ldapUser);
  const res = await createRecord(baseUrl, record, oauth);
  console.log('record creation response: ', res);
  return res.body;
}
