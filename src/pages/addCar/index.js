import Taro, { Component } from '@tarojs/taro'
import { View, Button, Input } from '@tarojs/components'
import api from '@/api'

import './index.less'

export default class AddCar extends Component {
  state = {
    car: {
      carName: ''
    }
  }

  // 添加新车
  addCar() {
    const { car } = this.state
    const { id } = Taro.getStorageSync('userInfo') || {}

    api.car.addCar({ ...car, userId: id }).then(({ code, message }) => {
      if (code === 0) {
        Taro.navigateBack({
          delta: 1
        })
        return
      }

      Taro.interaction.toast(message)
    }).catch(e => {
      Taro.interaction.toast(e)
    })
  }

  config = {
    navigationBarTitleText: '添加车辆'
  }

  render() {
    return (
      <View className="add-car-container">
        <Input
          className="input"
          maxLength="11"
          onInput={ e => {
            this.setState({ car: { carName: e.target.value } })
          } }
          placeholder="车辆名称"
          type="text"
          value={ this.state.car.carName }
        />
        <Button className="btn" onClick={ this.addCar.bind(this) }>
          添加
        </Button>
      </View>
    )
  }
}
