import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import CarList from '@/components/business/carList'
import RecordList from '@/components/business/recordList'
import api from '@/api'

import './index.less'

@connect(({ user, car }) => ({
  user,
  car
}))
export default class Records extends Component {
  state = {
    cars: [],
    records: [],
    pageParams: {
      pageSize: 10,
      pageNumber: 1
    },
    currentRecordId: ''
  }

  componentDidShow() {
    this.getCarList()
  }

  async getCarList() {
    const { id } = this.props.user

    api.car.getCarList({ userId: id }).then(({ data = {} }) => {
      this.setState(
        {
          cars: data.list || []
        },
        this.getRecordList()
      )
    })
  }

  async getRecordList() {
    const { user, car } = this.props
    const { pageSize, pageNumber } = this.state.pageParams

    api.record.getRecordList({
      pageSize,
      pageNumber,
      userId: user.id,
      carId: car.id
    }).then(({ data = {} }) => {
      this.setState({
        records: data.list || []
      })
    })
  }

  renderRecordList() {
    const { records = [] } = this.state

    const yearObj = {}
    records.forEach(record => {
      const year = new Date(record.modifyTime).getFullYear() + '年'

      yearObj[year] ? yearObj[year].push(record) : (yearObj[year] = [record])
    })

    const result = []
    for (const year in yearObj) {
      const sumVolume = yearObj[year].reduce((total, curr) => {
        return (total * 100 + curr.volume * 100) / 100
      }, 0)

      const sumMoney = yearObj[year].reduce((total, curr) => {
        return (total * 100 + curr.money * 100) / 100
      }, 0)

      result.push({ year, sumMoney, sumVolume, list: yearObj[year] })
    }

    return result.map(item => {
      return (
        <View key={ item.year } className="calendar-item">
          <View className="year">{ item.year }</View>
          <Text className="total">加油量：{ item.sumVolume }升 | 油费：{ item.sumMoney }元</Text>
          { <RecordList list={ item.list }></RecordList> }
        </View>
      )
    })
  }

  viewRecord(id) {
    this.setState({ currentRecordId: id === this.state.currentRecordId ? '' : id })
  }

  config = {
    navigationBarTitleText: '加油记录'
  }

  render() {
    // 汽车列表组件
    const carList = <CarList list={ this.state.cars } refreshRecord={ this.getRecordList.bind(this) }></CarList>

    return (
      <View className="records-container">
        { this.props.car && carList }
        <View className="calendar-section">{ this.state.records ? this.renderRecordList() : <View>暂无记录</View> }</View>
      </View>
    )
  }
}
