import Taro, { Component } from '@tarojs/taro'
import { View, Input, Image, Text } from '@tarojs/components'
import { getToken, setUserInfo, getUserInfo } from '@/utils/auth'
import api from '@/api'
import config from '@/config'

import Arrow from '@/assets/img/arrow.png'
import DefaultHeadImage from '@/assets/img/default-head-image.svg'

import './index.less'

export default class My extends Component {
  state = {
    userInfo: {},
    entrances: [
      {
        id: 0,
        title: '车辆管理',
        link: '/pages/cars/index'
      },
      {
        id: 1,
        title: '加油记录',
        link: '/pages/records/index'
      }
    ]
  }

  async componentDidShow() {
    const token = await getToken()

    if (!token) {
      Taro.redirectTo({
        url: '/pages/login/index'
      })
      return
    }

    const userInfo = await getUserInfo()

    this.setState({
      userInfo
    })
  }

  goPage({ link }) {
    Taro.navigateTo({
      url: link
    })
  }

  updateHeadImage() {
    const { id } = this.state.userInfo

    Taro.chooseImage({
      number: 1
    }).then(({ tempFilePaths = [] }) => {
      Taro.uploadFile({
        name: 'file',
        url: `${config.baseServer}/member/head_image?id=${id}`,
        filePath: tempFilePaths[0]
      }).then(({ data }) => {
        const _data = JSON.parse(data)
        if (_data.code === 0) {
          this.setState({
            userInfo: _data.data
          })
          setUserInfo(_data.data)
        }
      })
    })
  }

  updateNickName({ detail: { value = '' } }) {
    const { id } = this.state.userInfo
    api.my.updateMemberInfo({ id, nickName: value }).then(({ code, data = {} }) => {
      if (code === 0) {
        this.setState({
          userInfo: data
        })
        setUserInfo(data)
      }
    })
  }

  logout() {
    Taro.clearStorageSync()

    Taro.redirectTo({
      url: '/pages/login/index'
    })
  }

  config = {
    navigationBarTitleText: '我'
  }

  render() {
    const entranceDom = this.state.entrances.map(item => {
      return (
        <View key={ item.id } className="entrance feedback" onClick={ this.goPage.bind(this, item) }>
          <Text className="title">{ item.title }</Text>
          <Image className="arrow" mode="widthFix" src={ Arrow } />
        </View>
      )
    })
    return (
      <View className="my-page">
        <View className="user-info">
          <View className="head-image" onClick={ this.updateHeadImage.bind(this) }>
            <Image mode="widthFix" src={ this.state.userInfo.headImage || DefaultHeadImage } />
          </View>
          <View className="nick-name">
            <Input onBlur={ this.updateNickName.bind(this) } value={ this.state.userInfo.nickName || '小车主' } />
          </View>
        </View>
        <View className="entrance-section">{ entranceDom }</View>
        <View className="logout feedback" onClick={ this.logout.bind(this) }>
          退出登录
        </View>
        <View className="version">版本：v1.0.0</View>
      </View>
    )
  }
}
