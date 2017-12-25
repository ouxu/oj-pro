import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'dva/router'
import getRoutes from './'
import registerModel from 'utils/registerModel'

const App = ({app}) => (
  <Switch>
    {getRoutes(app).map(item => {
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

export default App
