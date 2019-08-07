/**
 * 本地调用服务，直接
 * ```javascript
 * 1. $ node app/api/local-server-demo.js
 *
 * 2. [翻墙连接](https://sourceforge.net/projects/openldapwindows/files/openldap-2.4.32/)
 * 下载命令行工具，张大眼睛仔细寻找 2.4.32-x86.zip，别下载错了！
 *
 * 3. $ ldapsearch -H ldap://localhost:1389 -x -b o=example objectclass=*
 * ```
 */

var ldap = require('ldapjs');

var server = ldap.createServer();

server.search('o=example', function(req, res, next) {
  var obj = {
    dn: req.dn.toString(),
    attributes: {
      objectclass: ['organization', 'top'],
      o: 'example'
    }
  };

  if (req.filter.matches(obj.attributes)) res.send(obj);

  res.end();
});

server.listen(1389, function() {
  console.log('LDAP server listening at %s', server.url);
});
