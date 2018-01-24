import dynamicWrapper from '../utils/dynamicWrapper'

import NotFound from './404'
import Admin from './admin/route'
import Homepage from './home'

import Problems from './problems'
import ProblemDetail from './problems/_id/route'

import Contests from './contests'
import ContestsDetail from './contests/_id/route'

import homeModel from './home/model'
import ProblemsDetailModel from './problems/_id/model'
import ContestsDetailModel from './contests/_id/model'
import ContestsModel from './contests/model'
import ProblemsModel from './problems/model'

export default (app) => [
  {
    path: '/home',
    exact: true,
    models: [homeModel],
    component: Homepage
  }, {
    path: '/problems/:id',
    exact: true,
    component: dynamicWrapper(ProblemDetail, app, [ProblemsDetailModel])
  }, {
    path: '/problems',
    exact: false,
    models: [ProblemsModel],
    component: Problems
  }, {
    path: '/contests/:id',
    exact: true,
    models: [ContestsModel],
    component: dynamicWrapper(ContestsDetail, app, [ContestsDetailModel])
  }, {
    path: '/contests',
    exact: false,
    models: [ContestsModel],
    component: Contests
  }, {
    path: '/admin',
    component: Admin
  }, {
    path: '/404',
    exact: true,
    component: NotFound
  }
]