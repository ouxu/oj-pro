import React from 'react'
import { Modal, Tooltip, Icon } from 'antd'

import message from 'utils/message'
import API from 'config/api'
import AppConfig from 'config/app'
import copy from 'copy-to-clipboard'
import request from 'utils/request'

import { getToken, downloadRundata, delRundata, getRundataFile } from './service'

const draggerProps = (id, reInit) => ({
  name: 'upload',
  action: AppConfig.requestBaseURL + API.uploadRundata.replace(':id', id),
  accept: '.in,.out',
  multiple: true,
  headers: {
    token: getToken()
  },
  beforeUpload (file) {
    if (file.name.split('.')[1] !== 'in' && file.name.split('.')[1] !== 'out') {
      message.error('请上传 in 或 out 格式的文件')
      return false
    }
    return true
  },
  onChange (info) {
    if (info.file.status !== 'uploading') {
      message.warning('文件正在上传中')
    }
    const name = info.file.name || ''
    if (info.file.status === 'done') {
      const code = Number(info.file.response.code)
      if (code === 0) {
        message.success(name + ' 文件上传成功.')
        reInit()
      } else {
        message.error(name + ' 文件上传失败.')
      }
    }
    if (info.file.status === 'error') {
      message.error(name + '文件上传失败.')
    }
  }
})

const exportRundata = record => {
  const filename = record.files.split('/').pop()
  downloadRundata(
    {
      file_path: record.files
    },
    filename
  )
}

const onCopy = text => {
  copy(text)
  message.success('复制成功')
}

const onGetRundataFile = record => {
  const filename = record.files.split('/').pop()
  getRundataFile(
    {
      file_path: record.files
    },
    filename
  ).then(res => {
    Modal.info({
      title: <div>{record.files}</div>,
      content: (
        <div>
          <pre
            style={{
              display: 'inline',
              background: '#d2eafc',
              lineHeight: 1.2
            }}
          >
            {res.data}
          </pre>
          <div className='mt-16'>
            <Tooltip title='复制'>
              <Icon type='copy' className='hand' onClick={() => onCopy(res.data)} />
            </Tooltip>
            <Tooltip title='下载'>
              <Icon type='download' className='ml-8 hand' onClick={() => request.downFile(res.data, filename)} />
            </Tooltip>
          </div>
        </div>
      ),
      onOk () {}
    })
  })
}

const onDelRundata = (record, reInit) => {
  const filename = record.files.split('/').pop()

  Modal.confirm({
    title: '删除确认',
    content: (
      <span>
        是否删除题目数据
        <br />
        <a onClick={() => exportRundata(record)}>{record.files}</a>
      </span>
    ),
    onOk: async () => {
      await delRundata(record.id, {
        file_path: record.files
      })
      reInit()
      message.success(filename + ' 删除成功.')
    }
  })
}

const columns = (id, reInit) => [
  {
    title: '文件名',
    dataIndex: 'files',
    key: 'files',
    render: (text, record) => <a onClick={() => onGetRundataFile(record)}>{text}</a>
  },
  {
    title: '操作',
    key: 'action',
    width: 100,
    render: (text, record) => (
      <div>
        <a onClick={() => exportRundata(record)}>导出</a>
        <span className='ant-divider' />
        <a onClick={() => onDelRundata(record, reInit)}>删除</a>
      </div>
    )
  }
]

export { draggerProps, columns }
