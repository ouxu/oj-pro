/**
 * Created by out_xu on 17/8/27.
 */
import { baseModel } from 'utils/modelExtend'
import modelExtend from 'dva-model-extend'
import { getProblem, getStatus, submit } from '../service'

const initState = {
  detail: {
    tags: []
  },
  layout: {
    left: 14,
    right: 10
  },
  activeKey: 'description',
  editor: {
    language: '1',
    value: '',
    privacy: false
  },
  solutionId: ''
}
export default modelExtend(baseModel, {
  namespace: 'problem',
  state: initState,
  effects: {
    * init ({payload}, {put, select}) {
      const {detail} = yield select(({problem}) => problem)
      if (+detail.id !== +payload.id) {
        yield put({type: 'getProblem', payload: payload.id})
      }
    },
    * getProblem ({payload}, {put, call}) {
      const detail = yield call(getProblem, payload)
      yield put({type: 'update', payload: {detail}})
    },
    * submit ({payload}, {put, call, select}) {
      const {editor, activeKey} = yield select(({problem}) => problem)
      if (activeKey !== 'submit') {
        yield put({type: 'update', payload: {activeKey: 'submit'}})
      }
      const body = {
        private: editor.privacy,
        source_code: editor.value,
        language: editor.language
      }
      const {solutionId} = yield call(submit, payload, body)
      yield put({type: 'update', payload: {solutionId}})
    },
    * getStatus ({payload}, {put, call}) {
      const {result = ''} = payload
      const {source = ''} = yield call(getStatus, result)
      yield put({type: 'changeEditor', payload: {value: source}})
    }
  },
  reducers: {
    changeEditor (state, {payload}) {
      return {
        ...state,
        editor: {
          ...state.editor,
          ...payload
        }
      }
    },
    changeLayout (state) {
      return {
        ...state,
        layout: {
          left: 24 - state.layout.left,
          right: 24 - state.layout.right
        }
      }
    },
    focusEditor (state) {
      return {
        ...state,
        layout: {
          left: 10,
          right: 14
        }
      }
    }
  }
})
