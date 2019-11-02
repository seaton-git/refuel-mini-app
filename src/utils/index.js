/**
 * 基础、公共工具类
 */
export default {
  getWithNil(source, path, defaultValue = '') {
    const paths = path.replace(/\[(\d+)\]/g, '.$1').split('.')
    let result = source
    for (const p of paths) {
      result = Object(result)[p]
      if (result === undefined || result === null) {
        return defaultValue
      }
    }
    return result
  }
}
