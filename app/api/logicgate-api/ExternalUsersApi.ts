import { ClientResponse } from 'http';
import request, { Options } from 'request';

import { Authentication, VoidAuth } from './Authentication';
import { defaultBasePath } from './defaultBasePath';
import { ObjectSerializer } from './ObjectSerializer';
import { User } from './User';

export enum ExternalUsersApiApiKeys {
}

export class ExternalUsersApi {
  protected _basePath = defaultBasePath;
  protected defaultHeaders: any = {};
  protected _useQuerystring: boolean = false;

  protected authentications = {
    'default': <Authentication>new VoidAuth(),
  };

  constructor(basePath?: string);
  constructor(basePathOrUsername: string, password?: string, basePath?: string) {
    if (password) {
      if (basePath) {
        this.basePath = basePath;
      }
    } else {
      if (basePathOrUsername) {
        this.basePath = basePathOrUsername;
      }
    }
  }

  set useQuerystring(value: boolean) {
    this._useQuerystring = value;
  }

  set basePath(basePath: string) {
    this._basePath = basePath;
  }

  get basePath() {
    return this._basePath;
  }

  public setDefaultAuthentication(auth: Authentication) {
    this.authentications.default = auth;
  }

  public setApiKey(key: ExternalUsersApiApiKeys, value: string) {
    (this.authentications as any)[ExternalUsersApiApiKeys[key]].apiKey = value;
  }

  /**
   *
   * @summary Create a external user with no attached roles.
   * @param user user
   * @param {*} [options] Override http request options.
   */
  public createUsingPOST1(user: User, options: any = {}): Promise<{ response: ClientResponse; body: User; }> {
    const localVarPath = this.basePath + '/api/v1/users/external';
    const localVarQueryParameters: any = {};
    const localVarHeaderParams: any = (<any>Object).assign({}, this.defaultHeaders);
    const localVarFormParams: any = {};

    // verify required parameter 'user' is not null or undefined
    if (user === null || user === undefined) {
      throw new Error('Required parameter user was null or undefined when calling createUsingPOST1.');
    }

    (<any>Object).assign(localVarHeaderParams, options.headers);

    const localVarUseFormData = false;

    const localVarRequestOptions: Options = {
      method: 'POST',
      qs: localVarQueryParameters,
      headers: localVarHeaderParams,
      uri: localVarPath,
      useQuerystring: this._useQuerystring,
      json: true,
      body: ObjectSerializer.serialize(user, 'User'),
    };

    this.authentications.default.applyToRequest(localVarRequestOptions);

    if (Object.keys(localVarFormParams).length) {
      if (localVarUseFormData) {
        (<any>localVarRequestOptions).formData = localVarFormParams;
      } else {
        localVarRequestOptions.form = localVarFormParams;
      }
    }
    return new Promise<{ response: ClientResponse; body: User; }>((resolve, reject) => {
      request(localVarRequestOptions, (error, response, body) => {
        if (error) {
          reject(error);
        } else {
          body = ObjectSerializer.deserialize(body, 'User');
          if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
            resolve({ response: response, body: body });
          } else {
            reject({ response: response, body: body });
          }
        }
      });
    });
  }
}
