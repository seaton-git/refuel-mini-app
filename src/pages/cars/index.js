import Taro, { Component } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtListItem, AtSwipeAction } from 'taro-ui'
import api from '@/api'

import './index.less'

@connect(({ user, car }) => ({
  user,
  car
}))
export default class Cars extends Component {
  state = {
    cars: []
  }

  componentDidShow() {
    this.getCars()
  }

  getCars() {
    const { id } = this.props.user

    api.car.getCarList({ userId: id }).then(({ data = {} }) => {
      this.setState({
        cars: data.list || []
      })
    })
  }

  renderCarList() {
    const { cars = [] } = this.state
    const option = [
      {
        text: '删除',
        style: {
          backgroundColor: '#E93B3D'
        }
      }
    ]
    return cars.map((car) => {
      const note = `加油量：${car.sumVolume}升  |  油费：${car.sumMoney}元`
      return (
        <AtSwipeAction key={ car.id } onClick={ this.handleSwipeActionItem.bind(this, car) } options={ option }>
          <AtListItem note={ note } title={ car.carName }></AtListItem>
        </AtSwipeAction>
      )
    })
  }

  handleSwipeActionItem(car, e) {
    const self = this
    const { id, carName } = car
    if (e.text === '删除') {
      Taro.showModal({
        title: '提示',
        content: `确认删除 ${carName} 吗？`,
        confirmColor: '#E93B3D',
        success(res) {
          if (res.confirm) {
            api.car.delCar(id).then(({ code, data }) => {
              if (code === 0 && data && data.id) {
                const delCarIndex = self.state.cars.findIndex(item => {
                  return item.id === data.id
                })
                self.state.cars.splice(delCarIndex, 1)

                self.setState({
                  cars: self.state.cars
                })
              }
            })
          }
        }
      })
    }
  }

  addCar() {
    Taro.navigateTo({
      url: '/pages/addCar/index'
    })
  }

  config = {
    navigationBarTitleText: '车辆管理'
  }

  render() {
    return (
      <View className="cars-container">
        <View className="car-list">{ this.renderCarList() }</View>
        <Button className="btn btn-add-car" onClick={ this.addCar.bind(this) }>
          添加
        </Button>
      </View>
    )
  }
}
