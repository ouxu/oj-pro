import dynamic from 'dva/dynamic'

export default (component, app, models) => dynamic({
  app,
  models,
  component
})