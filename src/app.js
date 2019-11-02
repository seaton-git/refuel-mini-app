import '@tarojs/async-await'
import Taro, { Component } from '@tarojs/taro'
import { Provider, connect } from '@tarojs/redux'
import interaction from '@/plugins/interaction'
import config from '@/config'
import 'taro-ui/dist/style/index.scss'
import { update } from '@/actions/user'
import { getUserInfo } from '@/utils/auth'
import Index from './pages/index'

import configStore from './store'

// common style
import './app.less'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore()

@connect(() => ({}),
  dispatch => ({
    dispatchUpdateUser(data) {
      dispatch(update(data))
    }
  })
)
class App extends Component {
  async componentDidMount() {
    // 挂载全局方法
    // 仅挂载使用频繁并且必须的工具类
    Taro.interaction = interaction
    Taro.config = config

    this.checkUpdate()

    // 全局注入当前用户信息
    const user = await getUserInfo()
    this.props.dispatchUpdateUser(user)
  }

  // 小程序版本更新
  checkUpdate() {
    const updateManager = Taro.getUpdateManager()

    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      console.log(`是否有新版本：${res.hasUpdate}`)
    })

    updateManager.onUpdateReady(function () {
      Taro.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function (res) {
          if (res.confirm) {
            updateManager.applyUpdate()
          }
        }
      })
    })

    updateManager.onUpdateFailed(function () {
      // 新版本下载失败
      Taro.showModal({
        title: '已经有新版本了哟~',
        content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
      })
    })
  }

  config = {
    pages: [
      'pages/home/index',
      'pages/my/index',
      'pages/login/index',
      'pages/addCar/index',
      'pages/addRecord/index',
      'pages/cars/index',
      'pages/records/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'Car',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: '#BFCBD9',
      selectedColor: '#13227a',
      backgroundColor: '#ffffff',
      list: [
        {
          pagePath: 'pages/home/index',
          text: '首页',
          iconPath: './assets/img/tab/index.png',
          selectedIconPath: './assets/img/tab/index_select.png'
        },
        {
          pagePath: 'pages/my/index',
          text: '我',
          iconPath: './assets/img/tab/my.png',
          selectedIconPath: './assets/img/tab/my_select.png'
        }
      ]
    },
    networkTimeout: {
      request: 4000
    }
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={ store }>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
