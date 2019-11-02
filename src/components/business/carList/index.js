import Taro, { Component } from '@tarojs/taro'
import { View, Picker } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import util from '@/utils'
import { getLastCarIndex, setLastCarIndex } from '@/utils/auth'
import { update } from '@/actions/car'

import Cell from '@/components/basic/cell'

import './index.less'

@connect(
  ({ car }) => ({
    car
  }),
  dispatch => ({
    dispatchUpdateCar(data) {
      dispatch(update(data))
    }
  })
)
export default class CarList extends Component {
  static options = {
    addGlobalClass: true
  }

  constructor(props) {
    super(props)
  }

  state = {
    /* eslint-disable */
    selectIndex: ''
  }

  props = {
    list: []
  }

  componentDidMount() {
    const lastCarIndex = getLastCarIndex()

    this.setState({
      selectIndex: lastCarIndex || 0
    })
  }

  // 更新当前车辆
  static getDerivedStateFromProps(props, state) {
    if (state.selectIndex !== '' && props.list.length > 0 && Object.keys(props.car).length <= 0) {
      props.dispatchUpdateCar(props.list[state.selectIndex])
      setLastCarIndex(state.selectIndex)
      props.refreshRecord()
    }

    return null
  }

  // 切换车辆
  onChangeCar(e) {
    const newSelectIndex = Number(e.detail.value)

    this.setState({
      selectIndex: newSelectIndex
    })
    this.props.dispatchUpdateCar(this.props.list[newSelectIndex])

    setLastCarIndex(newSelectIndex)
    this.props.refreshRecord()
  }

  render() {
    const currentCar = util.getWithNil(this.props, `list[${this.state.selectIndex}]`, {})
    const renderList = (
      <Picker mode="selector" onChange={this.onChangeCar.bind(this)} range={this.props.list} rangeKey="carName" value={this.props.selectIndex}>
        <View className="picker section-box-shadow">
          <Cell direction="down" title={currentCar.carName}></Cell>
        </View>
      </Picker>
    )
    return <View className="component-card-list">{renderList}</View>
  }
}
