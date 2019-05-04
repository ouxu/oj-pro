import React, { Component } from 'react'
import { Table, Input, Button, Icon, Modal, Tooltip, Divider } from 'antd'
import { connect } from 'dva'
import Link from 'umi/link'
import router from 'umi/router'
import errorHandler from 'utils/errorHandler'
import message from 'utils/message'
import { delProblem } from '../problem-edit/service'
import { getProblems, searchProblems } from 'services/problems'

const Search = Input.Search
const confirm = Modal.confirm

@connect(({ user }) => ({ user }))
class ProblemList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: [],
      problems: [],
      total_count: 99999
    }
  }

  componentDidMount () {
    this.fetchData()
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.location !== this.props.location) {
      this.fetchData()
    }
  }

  fetchData = async () => {
    const { query } = this.props.location
    const body = { page: 1, size: 50, ...query }
    let data = {}
    if (query.keyword) {
      data = await searchProblems(body)
    } else {
      data = await getProblems(body)
    }
    this.setState(data)
  }

  onSearch = value => {
    const { pathname } = this.props.location
    const body = {
      keyword: value
    }
    router.replace({ pathname, query: body })
  }

  delProblem = record => {
    confirm({
      title: `是否决定要删除题目-${record.id}?删除后无法恢复！`,
      content: (
        <Input
          type="password"
          onChange={e => this.setState({ password: e.target.value })}
          placeholder="请输入您的登录密码"
        />
      ),
      onOk: async () => {
        try {
          await delProblem(record.id, { password: this.state.password })
        } catch (e) {
          errorHandler(e)
          return Promise.reject
        }
        this.fetchData()
        message.success('删除成功')
      }
    })
  }

  createContest = () => {
    router.push({
      pathname: '/admin/contest-edit',
      query: {
        withProblem: true
      }
    })
  }
  render() {
    const { problems = [], total_count: totalCount } = this.state

    const { query = {}, pathname } = this.props.location

    const { page = 1, size = 50 } = query
    const columns = [
      {
        title: '#',
        dataIndex: 'id',
        key: 'problem-id',
        width: 60
      },
      {
        title: '标题',
        render: record => (
          <Link target="_blank" to={`/problems/${record.id}`} className="mock-a">
            {record.title}
          </Link>
        ),
        key: 'problem-title'
      },
      {
        title: '操作',
        render: record => (
          <div>
            <Link to={'/admin/problem-edit?id=' + record.id}>管理题目</Link>
            <Divider type="vertical" />
            <Link to={'/admin/problem-data?id=' + record.id}>查看数据</Link>
            <Divider type="vertical" />
            <a onClick={() => this.delProblem(record)}>删除</a>
          </div>
        ),
        width: 200,
        key: 'problem-manage-action'
      }
    ]
    const rowSelection = {
      onChange: selectedRowKeys => {
        this.setState({
          selected: selectedRowKeys
        })
        this.props.dispatch({
          type: 'admin/update',
          payload: { selectProblems: selectedRowKeys }
        })
      }
    }

    const pagination = {
      pageSize: +size,
      current: +page,
      total: +totalCount,
      pageSizeOptions: ['20', '50', '100'],
      showSizeChanger: true,
      border: true,
      showTotal: () => {
        let { selected } = this.state
        return (
          <div>
            已选择 {selected.length} 道
            <Tooltip title={selected.join('、')}>
              <Button
                type="primary"
                className="mx-8"
                size="small"
                onClick={this.createContest}
                disabled={selected.length < 1}
              >
                发起竞赛
              </Button>
            </Tooltip>
          </div>
        )
      },
      onShowSizeChange: (current, pageSize) => {
        router.replace({
          pathname,
          query: {
            ...query,
            page: current,
            size: pageSize
          }
        })
      },
      onChange: current => {
        router.replace({
          pathname,
          query: {
            ...query,
            page: current
          }
        })
      }
    }
    const title = () => (
      <div className="flex-lol">
        <span>
          创建问题
          <Link to="/admin/problem-edit" className="ml-8">
            <Icon type="plus-square-o" />
          </Link>
        </span>
        <span>
          <Search
            placeholder="题号/标题"
            defaultValue={query.keyword}
            onSearch={this.onSearch}
            size="small"
            style={{ width: 180 }}
          />
        </span>
      </div>
    )
    return (
      <div className="problem-list">
        <div className="header">
          <span className="h-1">题目列表</span>
        </div>
        <div className="content">
          <Table
            columns={columns}
            rowKey={record => record.id}
            dataSource={problems}
            pagination={pagination}
            size="small"
            title={title}
            rowClassName={rowClassName}
            rowSelection={rowSelection}
          />
        </div>
      </div>
    )
  }
}

const rowClassName = (record, index) => (index % 2 ? 'color-row' : '')

export default ProblemList
