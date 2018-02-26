/**
 * Created by out_xu on 17/8/28.
 */

import React from 'react'
import { Button, Checkbox, Divider, Icon, Modal, Select, Tooltip } from 'antd'
import Link from 'umi/link'
import AceEditor from 'react-ace'
import 'brace/theme/tomorrow'
import copy from 'copy-to-clipboard'
import 'brace/mode/golang'
import 'brace/mode/java'
import 'brace/mode/python'
import 'brace/snippets/golang'
import 'brace/ext/language_tools'
import './index.less'
import message from 'utils/message'

const {Option} = Select
const languages = [
  'golang',
  'golang',
  'java',
  'python'
]

const languageArr = [
  'C',
  'C++',
  'Java',
  'Python'
]
const ProblemEditor = ({language, value, dispatch, params, user}) => {
  const onRefresh = () => {
    Modal.confirm({
      title: '重置编辑区',
      content: '是否要清空编辑区？',
      onOk: () => {
        dispatch({type: 'problem/changeEditor', payload: {value: ''}})
        message.success('重置成功')
      }
    })
  }

  const onCopy = () => {
    copy(value)
    message.success('复制成功')
  }

  const onSubmit = () => {
    Modal.confirm({
      title: '提交确认',
      content: '是否确认提交代码？',
      onOk: () => {
        dispatch({type: 'problem/submit', payload: params.id})
      }
    })
  }

  const privateChange = (e) => {
    dispatch({type: 'problem/changeEditor', payload: {privacy: e.target.checked}})
  }
  const aceEditProps = {
    value,
    mode: languages[language],
    theme: 'tomorrow',
    className: 'ace-editor',
    onChange: (value) => dispatch({type: 'problem/changeEditor', payload: {value}}),
    enableSnippets: true,
    fontSize: 13,
    tabSize: 2,
    width: '100%',
    enableBasicAutocompletion: true,
    enableLiveAutocompletion: true,
    onFocus: () => dispatch({type: 'problem/focusEditor'})
  }
  return (
    <div className='code-edit'>
      <div className='ace-edit-header flex-lol'>
        <div>编辑代码</div>
        <div className='mr-5'>
          <Link to={'/problems/' + (params.id - 1)}>上一题</Link>
          <Divider type='vertical' />
          <Link to={'/problems/' + (+params.id + 1)}>下一题</Link>
        </div>
      </div>
      <AceEditor {...aceEditProps} />
      <div className='ace-edit-footer flex-lol'>
        <div>
          <Select
            style={{width: 80}}
            placeholder='语言'
            optionFilterProp='children'
            onChange={(language) => dispatch({type: 'problem/changeEditor', payload: {language}})}
            value={language}
          >
            {languageArr.map((item, index) => (
              <Option value={'' + index} key={index}>{item}</Option>
            ))}
          </Select>
          <Tooltip title='重置'>
            <Button onClick={onRefresh} className='mx-10'><Icon type='sync' /></Button>
          </Tooltip>
          <Tooltip title='复制'>
            <Button onClick={onCopy}><Icon type='copy' /></Button>
          </Tooltip>
        </div>
        <div>
          <Tooltip title='是否公开自己写的代码'>
            <Checkbox onChange={privateChange}>
              私有
            </Checkbox>
          </Tooltip>
          <Button disabled={!user.token} onClick={onSubmit} type='primary'><Icon type='rocket' />
            {user.token ? '提交' : '请登录'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ProblemEditor
