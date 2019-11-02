import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtAccordion } from 'taro-ui'

import './index.less'

export default class RecordList extends Component {
  state = {
    currentRecordId: ''
  }
  props = {
    list: []
  }

  // 点击加油记录，展开/关闭 手风琴
  viewRecord(id) {
    this.setState({ currentRecordId: id === this.state.currentRecordId ? '' : id })
  }

  render() {
    // 加油记录列表
    const recordList = this.props.list && this.props.list.map(item => {
      const title = new Date(item.modifyTime).toLocaleDateString().replace(/\//g, '-')
      return (
        <AtAccordion key={ item.id } onClick={ this.viewRecord.bind(this, item.id) } open={ this.state.currentRecordId === item.id } title={ title }>
          <View className="record-wrapper">
            <View className="row">
              <Text>{ item.carName }</Text>
              <Text>加注：{ item.volume }L</Text>
            </View>
            <View className="row">
              <Text>费用：{ item.money }元</Text>
              <Text>里程：{ item.mileage }KM</Text>
            </View>
          </View>
        </AtAccordion>
      )
    })

    return <View className="component-record-list">{ recordList }</View>
  }
}
