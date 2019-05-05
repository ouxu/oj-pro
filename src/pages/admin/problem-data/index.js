import React from 'react'
import { Icon, Upload, Table, Input, Alert } from 'antd'
import router from 'umi/router'
import withInit from 'utils/withInit'
import { draggerProps, columns } from './config'
import { getRundata } from './service'
import errorHandler from 'utils/errorHandler'

const Dragger = Upload.Dragger
const Search = Input.Search

const init = async props => {
  const { id = '' } = props.location.query
  if (!id) {
    return { id: '', error: true }
  }
  try {
    const res = await getRundata(id)
    const data = res.files
    return { id, data }
  } catch (e) {
    errorHandler(e)
    return { id, error: true }
  }
}

export default withInit(init)(props => {
  const { id, data = {}, location = {}, error } = props
  const { pathname = '' } = location
  let runData = []

  for (let key in data) {
    let item = {
      key: data[key],
      id: id,
      files: data[key]
    }
    runData.push(item)
  }

  return (
    <div>
      <div className='flex-lol'>
        <div className='h-1'>题目数据</div>
        <Search
          style={{ marginTop: 10, width: 200 }}
          placeholder='请输入题号'
          defaultValue={id}
          onSearch={value => {
            router.replace({
              pathname,
              query: { id: value }
            })
          }}
          enterButton
        />
      </div>
      {error ? (
        <div className='mt-16'>
          <Alert
            message='获取题目数据失败'
            type='error'
            showIcon
            description='请重新输入正确的题号，或者您无权限查看该题数据'
          />
        </div>
      ) : (
        <div>
          <Table
            style={{ marginTop: 16 }}
            size='small'
            columns={columns(id, props.reInit)}
            dataSource={runData}
            pagination={false}
          />
          <div style={{ marginTop: 16, height: 180 }}>
            <Dragger {...draggerProps(id, props.reInit)}>
              <p className='ant-upload-drag-icon'>
                <Icon type='inbox' />
              </p>
              <p className='ant-upload-text'>点击或者拖拽文件到此区域上传</p>
            </Dragger>
          </div>
        </div>
      )}
    </div>
  )
})
