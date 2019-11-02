const config = {}

const merge = function() {
  if (process.env.NODE_ENV === 'development') {
    return { ...config, ...require('./config.dev').default }
  } else {
    return { ...config, ...require('./config.prod').default }
  }
}

export default merge()
