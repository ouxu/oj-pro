import React, { Component } from 'react'
import Loading from 'components/plugins/Loading'

export default request => WrappedComponent => {
  class HocComponent extends Component {
    state = {
      loading: true
    }
    componentDidMount () {
      this.init()
    }

    init = () => {
      request(this.props).then(data => this.setState({ ...data, loading: false }))
    }

    render () {
      if (this.state.loading) {
        return <Loading />
      }
      return <WrappedComponent reInit={this.init} {...this.state} {...this.props} />
    }
  }
  return HocComponent
}
