import dynamicWrapper from 'utils/dynamicWrapper'
import Homepage from './home'
import Problems from './problems'
import NotFound from './404'

import homeModel from './home/model'
import ProblemsModel from './problems/model'
import ProblemsDetailModel from './problems/_id/model'

export default (app) => {
  return [
    {
      path: '/home',
      exact: true,
      models: [homeModel],
      component: Homepage
    }, {
      path: '/problems/:id',
      exact: true,
      models: [ProblemsModel],
      component: dynamicWrapper(() => import('./problems/_id'), app, () => [ProblemsDetailModel])
    }, {
      path: '/problems',
      exact: false,
      models: [ProblemsModel],
      component: Problems
    }, {
      path: '/admin',
      component: dynamicWrapper(() => import('routes/admin'))
    }, {
      path: '/404',
      exact: true,
      component: NotFound
    }

  ]
}
