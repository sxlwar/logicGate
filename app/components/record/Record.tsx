import { Button } from '@material-ui/core';
import { Theme, withStyles } from '@material-ui/core/styles';

import { SearchEntry } from 'ldapjs';
import React from 'react';
import { connect } from 'react-redux';

import { createOAuth } from '../../api/createOAuth';
import { fetchWorkflowFields } from '../../api/createRecord';
import { Record } from '../../api/logicgate-api/Record';
import { RecordsApi } from '../../api/logicgate-api/RecordsApi';
import { baseUrl } from '../../config/endpoint';
import { contactRecord } from '../../mock/record';
import { IState } from '../../reducers';

const themes: any = (theme: Theme) => ({
  button: {
    margin: theme.spacing()
  }
});

interface RecordProps {
  classes: any;
  token: string;
  entry: SearchEntry;
}

class RecordComponent extends React.Component<RecordProps> {
  public getValues(): { name: string; email: string } {
    const { attributes } = this.props.entry.json;
    const name = attributes.find(item => item.type === 'sn')!.vals[0];
    const email = attributes.find(item => item.type === 'mail')!.vals[0];

    return { name, email };
  }

  public async addRecord() {
    const { token } = this.props;
    const oauth = await createOAuth(token);

    const recordsApi = new RecordsApi(baseUrl);
    recordsApi.setDefaultAuthentication(oauth);

    // create record first;
    const { body: initialRecord } = await recordsApi.createRecordUsingPOST1(contactRecord);
    const { id: initialRecordId } = initialRecord;

    // updated record
    const { body: updatedRecord } = await recordsApi.getRecordUsingGET1(initialRecordId as string);
    const workflowId = updatedRecord.workflow!.id as string;
    const fields = await fetchWorkflowFields(workflowId, oauth);

    /**
     * map fields then send to logic gate;
     */
    const nameCtrl = fields.find(it => it.name === 'Name (Full):')!;
    const phoneCtrl = fields.find(it => it.name === 'Phone (Business Direct):')!;
    const reportToCtrl = fields.find(it => it.name === 'Reports To:')!;
    const emailCtrl = fields.find(it => it.name === 'Email (Personal):')!;

    const { name, email } = this.getValues();
    const record: Record = {
      step: {
        id: contactRecord.step.id
      },
      currentValueMaps: [
        {
          currentValues: [
            {
              textValue: name,
              discriminator: 'Common'
            }
          ],
          field: {
            id: nameCtrl.id,
            fieldType: nameCtrl.fieldType
          }
        },
        {
          currentValues: [
            {
              textValue: '13999999999',
              discriminator: 'Common'
            }
          ],
          field: {
            id: phoneCtrl.id,
            fieldType: phoneCtrl.fieldType
          }
        },
        {
          currentValues: [
            {
              textValue: 'John SS Smith',
              discriminator: 'Common'
            }
          ],
          field: {
            id: reportToCtrl.id,
            fieldType: reportToCtrl.fieldType
          }
        },
        {
          currentValues: [
            {
              textValue: email,
              discriminator: 'Common'
            }
          ],
          field: {
            id: emailCtrl.id,
            fieldType: emailCtrl.fieldType
          }
        }
      ]
    };

    recordsApi.createPublicUsingPOST(record);
  }

  public render() {
    const { classes } = this.props;

    return (
      <Button variant="contained" color="secondary" onClick={() => this.addRecord()} className={classes.button}>
        Add Record
      </Button>
    );
  }
}

// @ts-ignore FIXME
export default connect((state: IState) => ({
  token: state.account,
  entry: state.entries![0]
  // @ts-ignore FIXME
}))(withStyles(themes)(RecordComponent));
