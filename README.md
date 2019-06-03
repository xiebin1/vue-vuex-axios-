# vue_one

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```
#使用vue+vuex+axios 请求数据管理

####在ｖｕｅ项目中组件间相互传值或者后台获取的数据需要供多个组件使用的情况很多的话，有必要考虑引入ｖｕｅｘ来管理这些凌乱的状态，今天这边博文用来记录这一整个的过程，后台ａｐｉ接口是使用的是自己本地node搭建的服务器接口，有需要的同学联系。

####整个的流程是在组件的ｃｒｅａｔｅｄ中提交ｄｉｓｐａｔｃｈ，然后通过ａｃｔｉｏｎ调用一个封装好的ａｘｉｏｓ然后再触发ｍｕｔａｔｉｏｎ来提交状态改变ｓｔａｔｅ中的数据，然后在组件的计算属性中获取ｓｔａｔｅ的数据并渲染在页面上

####首先新需要在项目中安装ｖｕｅｘ：
#运行命令　ｎｐｍ　ｉｎｓｔａｌｌ　ｖｕｅｘ　－－ｓａｖｅ－ｄｅｖ

####在项目的入口ｊｓ文件ｍａｉｎ．ｊｓ中

#import store from './store/index'

* 并将ｓｔｏｒｅ挂载到ｖｕｅ上：

> new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  render: (createElement) => createElement(App)
})

#然后看下整个ｓｔｏｒｅ的目录结构，ｍｏｄｕｌｅｓ文件夹用来将不同功能也面的状态分成模块，ｉｎｄｅｘ．ｊｓ文件夹是ｓｔｏｒｅ的入口文件，ｔｙｐｅｓ文件夹是定义常量ｍｕｔａｔｉｏｎ的文件夹

#整个ｖｕｅｘ的目录结构如下：
![目录结构](https://images2015.cnblogs.com/blog/1013797/201703/1013797-20170323191426768-1519914264.png)

* 这里我新建了文件夹ｆｅｔｃｈ用来编写所有的ａｘｉｏｓ处理和ａｘｉｏｓ封装

* 在ｆｅｔｃｈ文件夹下新建ａｐｉ．ｊｓ文件：
> import axios from 'axios'

export function fetch(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(response => {
                 alert('Api--ok');
                resolve(response.data);
            })
            .catch((error) => {
              console.log(error)
               reject(error)
            })
    })
}

export default {
  // 获取我的页面的后台数据
  mineBaseMsgApi() {
     alert('进入api.js')
    return fetch('/api/getBoardList');
  }
}

* 在store的入口文件index.js中：

> import Vue from 'vue'
import Vuex from 'vuex'

import mine from './modules/mine';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    mine
  }
});

* 在你需要请求后台数据并想使用ｖｕｅｘ的组件中的ｃｒｅａｔｅｄ分发第一个ｄｉｓｐａｔｃｈ：
> created() {
    this.$store.dispatch('getMineBaseApi');
  }
* 然后在ｓｔｏｒｅ／ｍｏｄｕｌｅｓ下的对应模块ｊｓ文件中，这里我使用的ｍｉｎｅ．ｊｓ文件中编写ｓｔａｔｅ、ａｃｔｉｏｎ和ｍｕｔａｔｉｏｎ
> import api from './../../fetch/api';
import * as types from './../types.js';

const state = {
  getMineBaseMsg: {
    errno: 1,
    msg: {}
  }
}

const actions = {
  getMineBaseApi({commit}) {
    alert('进入action');
    api.mineBaseMsgApi()
    .then(res => {
        alert('action中调用封装后的axios成功');
        console.log('action中调用封装后的axios成功')
        commit(types.GET_BASE_API, res)
    })
  }
}

const getters = {
  getMineBaseMsg: state => state.getMineBaseMsg
}

const mutations = {
  [types.GET_BASE_API](state, res) {
    alert('进入mutation');
    state.getMineBaseMsg = { ...state.getMineBaseMsg, msg: res.data.msg }
    alert('进入mutations修改state成功');
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}

* 然后在想取回ｓｔａｔｅ的组件中使用ｍａｐＧｅｔｔｅｒｓ获取ｓｔａｔｅ：
>  import { mapGetters } from 'vuex';

export default {
  ．．．
  computed: {
    ...mapGetters([
      'getMineBaseMsg'
    ])
  }，
  ．．．      
｝

##完整代码请自行查阅！！
