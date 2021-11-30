1. 如果没有汇率信息的话就改成美元

| 账号 | ID  | 登录密码  | 支付密码  |||
 | ---  | ---  | ---  | ---  | ---|---|
|13968066530|954321|954321|123456|1|
| 2583691470  | 21667  | 123456  | 123456  | 1|
| 1578423960  | 22668  | 123456  | 123456  |
| 542786698  | 21669  | 123456 | 123456 |
| 2348965678 | 21670 | 123456 | 123456 |
| 586752499 | 21671 | 123456 | 123456 |
| 6493231999 | 21672 | 123456 | 123456 |
| 568797539 | 21673 | 123456 | 123456 |
| 8713949966 | 21674 | 123456 | 123456 |
| 689782136 | 21675 | 123456 | 123456 |
| 6945618694 | 21676 | 123456 | 123456 |

登录密码123456，支付密码 123456

 const global_shareInfo = localStorage.getItem('global_shareInfo')
// 登陆成功后如果有分享信息的话就直接跳转到详情页面 if (global_shareInfo) { // localStorage.removeItem('global_shareInfo')
const parse_global_shareInfo = JSON.parse(global_shareInfo);
history.push(`/goodsDetails?id=${parse_global_shareInfo.id}&shareCode=${parse_global_shareInfo.shareCode}`)

            return
        }else{
        history.push("/");
    }

    shareCode 分享逻辑是 
    用户点击分享按钮或者分享到Facebook
    别人点击进来的话就携带他的分享码
    提交的时候他有分享提成
    如果未注册的新用户的话就注册完毕后跳转到分享者的页面无法提交购物车进行购买分销



1. 修改支付密码和密码修改有问题待测试
   - 登陆密码测试了，可用。
2. 店中店
   - 新页面
3. 货币自动转换
   - 全局选项，选择货币和语言，汇率价格自动调整
   - Echo 入口待确认
4. 登陆页面改版
   - 新页面
5. 余额提现新增银行信息
  - 添加银行名称
  - 添加银行账号
  - 姓名
  - 待确认
6. 产品编号更改显示形式
  - 待确认
7. 轮播图指向某个标签
  - 某一种类型（女装/男装）
  - 根据类型 标签和商品
  - type 都穿入id
8. 详情浓缩图根据选择切换
9. 分销系统详情没有数据



1. 美元，欧元，墨西哥比索，秘鲁，哥伦比亚

货币转换
https://www.free-api.com/doc/407
富文本编辑器
不能加入购物车 不能收藏 店中店 



~~http://lictic.com/storehouse~~
~~http://lictic.com/storehouse/add~~
~~http://lictic.com/storehouse/add~~
~~http://lictic.com/storehouse/manage~~



1. ~~修改支付密码和密码修改有问题待测试~~
2. ~~余额提现新增银行信息~~
3. ~~产品编号更改显示形式~~
4. ~~轮播图指向某个标签~~
5. ~~登陆页面改版~~
6. 货币自动转换
7. 店中店
8. 详情浓缩图根据选择切换
---

### TypeScript

#### 1. 接口或者类型是首字母大写

#### 2. 普通的如果是props就加上props，state就加上state，model就加上model

#### 3. 然后变量的命名全部都采用驼峰命名

#### 4. 文件夹名称的话就首字母大写，不需要去刻意驼峰。

---

### React

#### 1. 组件首字母大写

#### 2. 函数无所谓

---

[comment]: <> (/Users/blue/Desktop/susumio/node_modules/antd/es/style/index.less)
- 去掉antd的样式
