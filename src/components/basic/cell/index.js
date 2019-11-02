import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'

import Arrow from '@/assets/img/arrow.png'

import './index.less'

export default class Cell extends Component {
  props = {
    title: '消费记录',
    link: '',
    direction: 'right'
  }

  onHandleCellClick() {
    console.log('click')
  }

  render() {
    return (
      <View className="c-cell" onClick={ this.onHandleCellClick.bind(this) }>
        <Text className="title">{ this.props.title }</Text>
        <Image className={ 'arrow ' + this.props.direction } mode="widthFix" src={ Arrow } />
      </View>
    )
  }
}
