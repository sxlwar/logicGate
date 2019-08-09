export const baseUrl = 'https://agilegrcsolutions.logicgate.com';

/**
 * see [https://docs.logicgate.com/#/](https://docs.logicgate.com/#/)
 */
const BASE_ENDPOINT = {
  currentValues: `/api/v1/currentValues`,
  externalUsers: `/api/v1/users/external`,
  fields: `/api/v1/fields`,
  records: `/api/v1/records`,
  assignments: `/api/v1/assignments`,
  roles: `/api/v1/roles`,
  steps: `/api/v1/nodes`,
  users: `/api/v1/users`,
  valueMaps: `/api/v1/users`,
  workFlows: `/api/v1/workflows`,
  token: `/api/v1/account/token`
};

/**
 * split type 
 */
type PointType = keyof typeof BASE_ENDPOINT;

export function getEndPoint(point: PointType) {
  return baseUrl + BASE_ENDPOINT[point];
}
