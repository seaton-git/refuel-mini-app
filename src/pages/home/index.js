/* eslint-disable no-undef */
/* eslint-disable taro/props-reserve-keyword */
/* eslint-disable react/forbid-elements */
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.less'

export default class Home extends Component {
  config = {
    navigationBarTitleText: '王旭东和鲁梦雪的婚礼邀请函'
  }

  onShareAppMessage() {
    return {
      title: '邀您与我们一起分享幸福时光',
      path: '/pages/home/index',
      imageUrl: 'https://api.seaton.wang/public/24312.jpeg'
    }
  }

  render() {
    return (
      <View className="home-page">
        <video
          bindenterpictureinpicture="bindVideoEnterPictureInPicture"
          binderror="videoErrorCallback"
          bindleavepictureinpicture="bindVideoLeavePictureInPicture"
          controls
          picture-in-picture-mode={ ['push', 'pop'] }
          poster="https://api.seaton.wang/public/24363.jpeg"
          show-center-play-btn
          src="https://api.seaton.wang/public/1598346265019765.mp4"
        ></video>
        <image className="address-image" mode="widthFix" src="https://api.seaton.wang/public/24230.jpeg"></image>
      </View>

    )
  }
}
