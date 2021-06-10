/**
 * Created by out_xu on 17/8/28.
 */

import React, { Component } from 'react'
import AceEditor from 'components/plugins/AceEditor/async'
import { Button, Checkbox, Divider, Icon, Modal, Select, Tooltip } from 'antd'
import copy from 'copy-to-clipboard'
import message from 'utils/message'
import withRouter from 'umi/withRouter'
import { getStatus } from '../../service'
import { getStatus as getStatusList } from '../../../../status/service'
import './index.less'

const { Option } = Select

const languages = ['golang', 'golang', 'java', 'python']

const languageArr = ['C', 'C++', 'Java', 'Python']

const MAX_NAVI_CHECK_COUNT = 10

@withRouter
class ProblemEditor extends Component {
  state = {
    private: 0,
    source_code: '',
    language: '1'
  }

  componentDidMount () {
    const { solution = '' } = this.props.location.query
    if (solution) {
      this.initSolution(solution)
    } else {
      this.initSolutionByHistory();
    }
  }

  initSolutionByHistory = async () => {
    const { canSubmit, id, location } = this.props
    const isNotContest = location.pathname.indexOf('contests') === -1
    const userInfo = window._userInfo_ || {}
    const user_id = (userInfo.user || {}).id

    if (canSubmit && isNotContest && user_id && id) {
      const recentAC = await getStatusList({ user_id, problem_id: id, result: 4, size: 1 })
      if (recentAC && recentAC[0] && recentAC[0].id) {
        this.initSolution(recentAC[0].id)
      }
    }
  }

  initSolution = (solution) => {
    getStatus(solution).then(
      (res) => {
        if (res && res.source) {
          this.setState({ source_code: res.source })
        }
      },
      (rej) => null
    )
  }

  onRefresh = () => {
    Modal.confirm({
      title: '重置编辑区',
      content: '是否要清空编辑区？',
      onOk: () => {
        this.setState(
          {
            source_code: ''
          },
          () => {
            message.success('重置成功')
          }
        )
      }
    })
  }

  onNavigation = (link = '', gap) => async () => {
    const { jumpCheck, id, baseLink } = this.props

    if (jumpCheck && gap && id && baseLink) {
      let targetId
      let timer = setTimeout(() => {
        message.info('加载中···')
      }, 2000)
      for (let i = 1; i <= MAX_NAVI_CHECK_COUNT; i++) {
        targetId = Number(id) + gap * i
        if (targetId <= 1000 || targetId > 100000) {
          targetId = undefined
          break
        }

        const data = await jumpCheck(targetId).catch(() => false)
        if (data.id) {
          break
        }
        targetId = undefined
      }

      clearTimeout(timer)
      if (targetId) {
        this.props.history.push(baseLink + targetId)
      } else {
        message.info('暂无可用题目！')
      }
    } else {
      this.props.history.push(String(link))
    }
  }

  onSubmit = () => {
    Modal.confirm({
      title: '提交确认',
      content: '是否确认提交代码？',
      onOk: () => this.props.handleSubmit(this.state)
    })
  }

  onCopy = () => {
    copy(this.state.source_code)
    message.success('复制成功')
  }

  codeChange = (value) => {
    this.setState({ source_code: value })
  }

  privateChange = (e) => {
    this.setState({ private: e.target.checked })
  }

  languageChange = (language) => {
    this.setState({ language })
  }

  render () {
    const { canSubmit, focusEdit, preLink, afterLink } = this.props
    const { language, source_code: value } = this.state

    const aceEditProps = {
      value,
      mode: languages[language],
      theme: 'tomorrow',
      className: 'ace-editor',
      onChange: this.codeChange,
      enableSnippets: true,
      fontSize: 13,
      tabSize: 2,
      width: '100%',
      enableBasicAutocompletion: true,
      enableLiveAutocompletion: true,
      onFocus: focusEdit
    }
    return (
      <div className='code-edit'>
        <div className='ace-edit-header flex-lol'>
          <div>编辑代码</div>
          <div className='mr-5'>
            <a disabled={!preLink} onClick={this.onNavigation(preLink, -1)}>
              上一题
            </a>
            <Divider type='vertical' />
            <a disabled={!afterLink} onClick={this.onNavigation(afterLink, 1)}>
              下一题
            </a>
          </div>
        </div>
        <AceEditor {...aceEditProps} />
        <div className='ace-edit-footer flex-lol'>
          <div>
            <Select
              style={{ width: 80 }}
              placeholder='语言'
              optionFilterProp='children'
              onChange={this.languageChange}
              value={language}
            >
              {languageArr.map((item, index) => (
                <Option value={'' + index} key={index}>
                  {item}
                </Option>
              ))}
            </Select>
            <Tooltip title='重置'>
              <Button onClick={this.onRefresh} className='mx-10'>
                <Icon type='sync' />
              </Button>
            </Tooltip>
            <Tooltip title='复制'>
              <Button onClick={this.onCopy}>
                <Icon type='copy' />
              </Button>
            </Tooltip>
          </div>
          <div>
            <Tooltip title='是否公开自己写的代码'>
              <Checkbox onChange={this.privateChange}>私有</Checkbox>
            </Tooltip>
            <Button disabled={!value || !canSubmit} onClick={this.onSubmit} type='primary'>
              <Icon type='rocket' />
              {canSubmit ? '提交' : '请登录'}
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

export default ProblemEditor
