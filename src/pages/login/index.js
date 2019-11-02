import Taro, { Component } from '@tarojs/taro'
import { View, Button, Input } from '@tarojs/components'
import { setToken, setUserInfo } from '@/utils/auth'
import { connect } from '@tarojs/redux'
import { update } from '@/actions/user'
import api from '@/api'

import './index.less'

@connect(
  () => ({}),
  dispatch => ({
    dispatchUpdateUser(data) {
      dispatch(update(data))
    }
  })
)
export default class Login extends Component {
  state = {
    phoneNumber: '',
    password: ''
  }

  // 登录
  // 若为新手机号，将自动注册
  login() {
    const { phoneNumber, password } = this.state

    api.my.login({ phoneNumber, password }).then(({ code, data, message }) => {
      if (code === 0) {
        // 保存 用户信息 和 token
        setUserInfo(data.result)
        setToken(data.accessToken)
        this.props.dispatchUpdateUser(data.result)

        Taro.switchTab({
          url: '/pages/home/index'
        })
        return
      }

      Taro.interaction.toast(message)
    }).catch(e => {
      Taro.interaction.toast(e)
    })
  }

  config = {
    navigationBarTitleText: '登录'
  }

  render() {
    return (
      <View className="login-container">
        <Input
          className="input"
          maxLength="11"
          onInput={ e => {
            this.setState({ phoneNumber: e.target.value })
          } }
          placeholder="手机号码"
          type="number"
          value={ this.state.phoneNumber }
        />
        <Input
          className="input"
          maxLength="16"
          onInput={ e => {
            this.setState({ password: e.target.value })
          } }
          placeholder="密码"
          type="password"
          value={ this.state.password }
        />
        <Button className="btn" onClick={ this.login.bind(this) }>
          登录
        </Button>
        <View className="register-explain">未注册手机号将自动注册</View>
      </View>
    )
  }
}
