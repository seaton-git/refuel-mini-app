import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { View, Button, Input } from '@tarojs/components'
import api from '@/api'

import './index.less'

@connect(
  ({ user, car }) => ({
    user,
    car
  })
)
export default class AddRecord extends Component {
  state = {
    money: '',
    volume: '',
    mileage: ''
  }

  // 添加 “加油记录”
  addRecord() {
    const { user, car } = this.props
    const { money, volume, mileage } = this.state

    if(money === '' || volume === '') {
      Taro.interaction.toast('请填写金额及本次加油体积')
      return
    }

    api.record.addRecord({
      carId: car.id,
      userId: user.id,
      money: Number(money),
      volume: Number(volume),
      mileage: Number(mileage) || 0
    }).then(({ code, message }) => {
      if (code === 0) {
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
    navigationBarTitleText: '添加记录'
  }

  render() {
    return (
      <View className="add-record-container">
        <Input
          className="input"
          maxLength="8"
          onInput={ e => {
            this.setState({ money: e.target.value })
          } }
          placeholder="金额（元）"
          type="digit"
          value={ this.state.money }
        />
        <Input
          className="input"
          maxLength="10"
          onInput={ e => {
            this.setState({ volume: e.target.value })
          } }
          placeholder="本次加油体积（升）"
          type="digit"
          value={ this.state.volume }
        />
        <Input
          className="input"
          maxLength="10"
          onInput={ e => {
            this.setState({ mileage: e.target.value })
          } }
          placeholder="当前里程（公里）"
          type="digit"
          value={ this.state.mileage }
        />
        <Button className="btn" onClick={ this.addRecord.bind(this) }>
          添加
        </Button>
      </View>
    )
  }
}
