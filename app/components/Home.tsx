import { Button } from "@material-ui/core";
import { withStyles, Theme } from "@material-ui/core/styles";

import { ifError } from "assert";
import { createClient, SearchCallbackResponse, SearchEntry } from "ldapjs";
import * as React from "react";

/**
 * 流程：1、应用启动后，拿 client 和 secret 去换调用 logic gate api 所需的 access_token，保存到store以方便其它页面使用
 * 2、手动触发数据更新， click fetch user 按钮，取加user 数据, 暂时就挂在组件上。
 * 3、logicGate api: /api/v1/records/{record}/progress --- A
 *                  /api/v1/paths/record/{record} --- B
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
    margin: theme.spacing(),
  }
});

interface HomeProps {
  classes: any;
}

class HomeComponent extends React.Component<HomeProps> {
  private entries: SearchEntry[];

  fetchUser = () => {
    client.search(
      adSuffix,
      searchOptions,
      (err: Error | null, res: SearchCallbackResponse) => {
        ifError(err);
        const entries: SearchEntry[] = [];

        res.on("searchEntry", (entry: SearchEntry) => {
          entries.push(entry);
        });
        res.on("end", result => {
          console.log("status: " + result!.status);
          this.entries = entries;
        });
      }
    );
  };

  componentWillUnmount() {
    client.unbind(err => {
      ifError(err);
      console.log("unbind");
    });
  }

  async sendToLogicGate() {
    console.log(this.entries);
  }

  render() {
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
        </div>
      </div>
    );
  }
}

export default withStyles(themes)(HomeComponent);
