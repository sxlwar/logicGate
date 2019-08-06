import { Button } from "@material-ui/core";
import { withStyles, Theme } from "@material-ui/core/styles";

import { ifError } from "assert";
import { createClient, SearchCallbackResponse, SearchEntry } from "ldapjs";
import * as React from "react";
import Axios, { AxiosResponse } from "axios";
import { getEndPoint } from "../config/endpoint";
import { Record } from "../api/logicgate-api/Record";
import { connect } from "react-redux";
import { IState } from "../reducers";

/**
 * 流程：
 * 1、应用启动后，拿 client 和 secret 去换调用 logic gate api 所需的 access_token，保存到store以方便其它页面使用
 * 2、手动触发数据更新， click fetch user 按钮，取加user 数据, 暂时就挂在组件上。
 * 3、logicGate api:
 *                    /api/v1/records  --A POST 拿到返回的 `id` ---A
 *                    /api/v1/records/{`stepA.id`}/progress --- B
 *                    /api/v1/paths/record/{`stepA.id`} --- C
 *      A 创建 contact 数据时使用的put请求，从实测来看，需要先调 B接口取回一些额外的数据。注： A B 的record相同。
 *     ? record 从哪来？
 * 4、把数据映射后发给logicGate服务器。
 */

const styles = require("./Home.scss");
const adSuffix = "dc=example,dc=com";
const dn = `cn=read-only-admin,${adSuffix}`;
const pw = "password";
const client = createClient({
  url: "ldap://ldap.forumsys.com"
});

client.bind(dn, pw, err => {
  ifError(err);
});

// Search AD for user
const searchOptions = {
  filter: `(mail=*@ldap.forumsys.com)`,
  scope: "sub",
  attributes: [
    "dn",
    "cn",
    "givenName",
    "sn",
    "telephoneNumber",
    "mail",
    "manager",
    "objectClass"
  ]
};

const themes: any = (theme: Theme) => ({
  button: {
    margin: theme.spacing()
  }
});

interface HomeProps {
  classes: any;
  token: string;
}

class HomeComponent extends React.Component<HomeProps> {
  /** 状态持有在内部 */
  public state = {
    users: [] as SearchEntry[]
  };

  private fetchUser = () => {
    client.search(
      adSuffix,
      searchOptions,
      (err: Error | null, res: SearchCallbackResponse) => {
        ifError(err);
        /** 监听 searchEntry 事件 */
        res.on("searchEntry", (entry: SearchEntry) => {
          this.setState(() => this.state.users.push(entry));
        });
        res.on("end", result => {
          /** Result status 0 = success */
          // console.log(result);
          console.log(`users is`, this.state.users);
        });
      }
    );
  };

  public componentWillUnmount() {
    client.unbind(err => {
      ifError(err);
      console.log("unbind success, disconnect now!");
    });
  }

  /**
   *  /api/v1/records  --A POST 拿到返回的 `id` ---A
   *  /api/v1/records/{`stepA.id`}/progress --- B
   *  /api/v1/paths/record/{`stepA.id`} --- C
   */
  public async sendToLogicGate() {
<<<<<<< HEAD
    const { token } = this.props;

    // Step one:
    Axios.post<Record, AxiosResponse<Record>>(
      getEndPoint("records") + `?access_token=${token}`,
      {
        active: true,
        dateFormat: "LLLL",
        isPublic: false,
        step: {
          active: true,
          dateFormat: "LLLL",
          stepType: "Origin",
          priority: 1,
          xpos: 75,
          ypos: 56,
          origin: true,
          isPublic: false,
          allowEntitlements: true,
          sla: { enabled: false, duration: 0 },
          id: "7Ycf0hko",
          created: 1564684945767,
          updated: 1565069882824,
          name: "Add New Contact",
          chain: false,
          end: false
        },
        origin: {
          active: true,
          dateFormat: "LLLL",
          stepType: "Origin",
          priority: 1,
          xpos: 75,
          ypos: 56,
          origin: true,
          isPublic: false,
          allowEntitlements: true,
          sla: { enabled: false, duration: 0 },
          id: "7Ycf0hko",
          created: 1564684945767,
          updated: 1565069882824,
          name: "Add New Contact",
          chain: false,
          end: false
        }
      }
    )
      .then(res => console.log(`step1`, res))
      .catch(err => console.log(`err in logicgate API step 1`, err));

    // Step two:
    // Axios.put(
    //   getEndPoint("records") + `/awdawd2/progress/?access_token=${token}`,
    //   {}
    // )
    //   .then(res => console.log(`step2`, res))
    //   .catch(err => console.log(`err in logicgate API step 2`, err));

    // Step three:
    // Axios.get(getEndPoint("records") + `/awdawd2/?access_token=${token}`, { })
    //   .then(res => console.log(`step3`, res))
    //   .catch(err => console.log(`err in logicgate API step 3`, err));
=======
    const TOKEN  = await fetchToken();
    // Step one:
    const step1 = await Axios.post<Record, AxiosResponse<Record>>(getEndPoint('records') + `?access_token=${TOKEN}`,
      { "active": true, "dateFormat": "LLLL", "isPublic": false, "step": { "active": true, "dateFormat": "LLLL", "stepType": "Origin", "priority": 1, "xpos": 75, "ypos": 56, "origin": true, "isPublic": false, "allowEntitlements": true, "sla": { "enabled": false, "duration": 0 }, "id": "7Ycf0hko", "created": 1564684945767, "updated": 1565069882824, "name": "Add New Contact", "chain": false, "end": false }, "origin": { "active": true, "dateFormat": "LLLL", "stepType": "Origin", "priority": 1, "xpos": 75, "ypos": 56, "origin": true, "isPublic": false, "allowEntitlements": true, "sla": { "enabled": false, "duration": 0 }, "id": "7Ycf0hko", "created": 1564684945767, "updated": 1565069882824, "name": "Add New Contact", "chain": false, "end": false } });
    console.log(step1, `catch step1 id is: ${step1.data.id}`);

    // Step two:
    Axios.put(getEndPoint('records') + `/${step1.data.id}/progress?access_token=${TOKEN}`)
    .then(res => console.log(`step2`,res))
    .catch(err => console.log(`step2 err`, err));

    // Step three:
    Axios.get(getEndPoint('records') + `/${step1.data.id}?access_token=${TOKEN}`)
    .then(res => console.log(`step3`,res)).catch(err => console.log(`step3 err`, err))
    
>>>>>>> bf8f2d8... chore: :alien: connect to logicgate API
  }

  public render() {
    const { classes } = this.props;
    return (
      <div>
        <div className={styles.container} data-tid="container">
          <Button
            variant="contained"
            color="primary"
            onClick={this.fetchUser}
            className={classes.button}
          >
            Fetch User
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => this.sendToLogicGate()}
            className={classes.button}
          >
            Send To Logic Gate
          </Button>

          <br />
          <h4>Fectch 数据</h4>
          <ul className={styles.wrapper}>
            {this.state.users.map((u, index) => (
              <li className={styles.item} key={index}>
                序号: {index + 1}
                类型： {u.type}
                名称： {u.objectName}
                messageId: {u.messageID}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default connect((state: IState) => ({
  token: state.account
}))(withStyles(themes)(HomeComponent));
