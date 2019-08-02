原理： 通过 ldap 从active directory上取回用户的信息，作一些映射，再作为 接口把它暴露给前端用户

数据流： LDAP => 暴露事件 => 前端 onXXX 监听
