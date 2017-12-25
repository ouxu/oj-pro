import Homepage from './'
import homeModel from './model'

export default (app) => {
  return [
    {
      path: '/home',
      exact: true,
      models: [homeModel],
      component: Homepage
    }
  ]
}
