import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'dva/router'
import registerModel from 'utils/registerModel'
import dynamicWrapper from 'utils/dynamicWrapper'
import Homepage from './home'
import Problems from './problems'
import NotFound from './404'

import homeModel from './home/model'
import ProblemsModel from './problems/model'
import ProblemsDetailModel from './problems/_id/model'

const ProblemDetail = () => import('./problems/_id')
const App = ({app}) => {
  const routes = [
    {
      path: '/home',
      exact: true,
      models: [homeModel],
      component: Homepage
    }, {
      path: '/problems/:id',
      exact: true,
      models: [ProblemsModel],
      component: dynamicWrapper(ProblemDetail, app, () => [ProblemsDetailModel])
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
  return (
    <Switch>
      {routes.map(item => {
        if (item.models) {
          item.models.forEach(e => registerModel(app, e))
        }
        return (
          <Route
            exact={item.exact}
            key={item.path}
            path={item.path}
            component={item.component}
          />
        )
      })}
      <Redirect exact from='/' to='/home' />
    <Redirect from='*' to='/404' />
  </Switch>
  )
}

export default App
