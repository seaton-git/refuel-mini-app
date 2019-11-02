import Taro from '@tarojs/taro'

export default {
  toast (title, icon = 'none', duration = 2000) {
    Taro.showToast({
      title,
      icon,
      duration
    })
  }
}
