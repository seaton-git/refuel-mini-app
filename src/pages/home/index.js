import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { View, Button, Text } from '@tarojs/components'
import api from '@/api'
import { update } from '@/actions/user'
import { getUserInfo } from '@/utils/auth'
import CarList from '@/components/business/carList'
import RecordList from '@/components/business/recordList'

import './index.less'

@connect(
  ({ car, user }) => ({
    car,
    user
  }),
  dispatch => ({
    dispatchUpdateUser(data) {
      dispatch(update(data))
    }
  })
)
export default class Index extends Component {
  state = {
    cars: [],
    records: []
  }

  async componentDidMount() {
    const { id = '' } = this.props.user

    if (id) {
      await this.getCarList()

      this.props.dispatchUpdateUser(this.props.user)
    }
  }

  goLogin() {
    Taro.redirectTo({
      url: '/pages/login/index'
    })
  }

  // 请求车辆列表数据
  async getCarList() {
    const { id } = this.props.user

    api.car.getCarList({ userId: id }).then(({ data = {} }) => {
      this.setState(
        {
          cars: data.list || []
        }
      )
    })
  }

  // 请求当前车辆加油记录列表
  async getRecordList() {
    const { user, car } = this.props

    api.record.getRecordList({
      userId: user.id,
      carId: car.id,
      pageSize: 5
    }).then(({ data }) => {
      this.setState({
        records: data.list || []
      })
    })
  }

  // 无车辆或无加油记录时跳转对应页面
  async toAddPage() {
    const { id = '' } = await getUserInfo()
    let url = ''
    const { cars, records } = this.state

    if (!id) {
      this.goLogin()
      return
    }

    if (!cars.length) {
      url = '/pages/addCar/index'
    } else if (cars.length && !records.length) {
      url = '/pages/addRecord/index'
    }

    Taro.navigateTo({
      url
    })
  }

  // 跳转添加 加油记录页面
  toAddRecordPage() {
    Taro.navigateTo({ url: '/pages/addRecord/index' })
  }

  config = {
    navigationBarTitleText: '首页'
  }

  render() {
    // 汽车列表组件
    const carList = <CarList list={ this.state.cars } refreshRecord={ this.getRecordList.bind(this) }></CarList>

    // 空数据显示文案
    const emptyText = this.state.cars.length <= 0 ? '暂无车辆，请添加' : '暂无记录，请添加'

    // 添加车辆或添加第一条加油记录入口
    const btnAddPage = (
      <View className="car-empty">
        <Text className="car-empty-title">{ emptyText }</Text>
        <View className="btn-add-car iconfont icon-add" onClick={ this.toAddPage.bind(this) }></View>
      </View>
    )

    // 添加记录入口
    const btnAddRecord = (
      <Button className="btn btn-add-recored" onClick={ this.toAddRecordPage.bind(this) }>
        添加记录
      </Button>
    )

    return (
      <View className="home-page">
        { this.state.cars.length > 0 && carList }
        <View>
          { this.state.records.length > 0 && btnAddRecord }
          { this.state.records.length > 0 && <RecordList list={ this.state.records }></RecordList> }
        </View>
        { (this.state.cars.length <= 0 || this.state.records.length <= 0) && btnAddPage }
      </View>
    )
  }
}
