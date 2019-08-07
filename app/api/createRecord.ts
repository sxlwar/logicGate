import { baseUrl } from '../config/endpoint';
import { OAuth } from './logicgate-api/Authentication';
import { Field } from './logicgate-api/Field';
import { FieldsApi } from './logicgate-api/FieldsApi';
import { WorkflowsApi } from './logicgate-api/WorkflowsApi';

export async function fetchWorkflowId(stepId: string, oauth: OAuth): Promise<string> {
  const workflowsApi = new WorkflowsApi(baseUrl);
  workflowsApi.setDefaultAuthentication(oauth);
  const res = await workflowsApi.findByStepUsingGET(stepId);

  return res.body.id!;
}

export async function fetchWorkflowFields(workflowId: string, oauth: OAuth): Promise<Field[]> {
  const fieldsApi = new FieldsApi(baseUrl);
  fieldsApi.setDefaultAuthentication(oauth);
  const res2 = await fieldsApi.findByWorkflowWithValuesUsingGET(workflowId);

  return res2.body;
}
