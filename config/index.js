'use strict'

const config = {
  projectName: 'refuel-mini-app',
  date: '2019-5-5',
  designWidth: 750,
  deviceRatio: {
    '640': 1.17,
    '750': 1,
    '828': 0.905
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  h5: {
    esnextModules: ['taro-ui']
  },
  plugins: {
    babel: {
      sourceMap: true,
      presets: [
        [
          'env',
          {
            modules: false
          }
        ]
      ],
      plugins: ['transform-decorators-legacy', 'transform-class-properties', 'transform-object-rest-spread']
    }
  },
  defineConstants: {},
  alias: {
    '@/': 'src',
    '@/api': 'src/api',
    '@/components': 'src/components',
    '@/utils': 'src/utils',
    '@/config': 'src/config',
    '@/plugins': 'src/plugins',
    '@/assets': 'src/assets',
    '@/actions': 'src/actions'
  },
  copy: {
    patterns: [],
    options: {}
  },
  weapp: {
    module: {
      postcss: {
        autoprefixer: {
          enable: true,
          config: {
            browsers: ['last 3 versions', 'Android >= 4.1', 'ios >= 8']
          }
        },
        pxtransform: {
          enable: true,
          config: {}
        },
        url: {
          enable: true,
          config: {
            limit: 10240 // 设定转换尺寸上限
          }
        },
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: 'module', // 转换模式，取值为 global/module
            generateScopedName: '[name]__[local]___[hash:base64:5]'
          }
        }
      }
    }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    module: {
      postcss: {
        autoprefixer: {
          enable: true,
          config: {
            browsers: ['last 3 versions', 'Android >= 4.1', 'ios >= 8']
          }
        },
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: 'module', // 转换模式，取值为 global/module
            generateScopedName: '[name]__[local]___[hash:base64:5]'
          }
        }
      }
    },
    router: {
      mode: 'browser'
    }
  }
}

module.exports = function(merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev.js'))
  }
  return merge({}, config, require('./prod.js'))
}
