import { baseModel } from 'utils/modelExtend'
import modelExtend from 'dva-model-extend'

export default modelExtend(baseModel, {
  namespace: 'admin',
  state: {
    selectProblems: []
  },
  effects: {
  },
  reducers: {}
})
