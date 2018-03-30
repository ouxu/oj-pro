/**
 * Created by out_xu on 16/12/20.
 */

export default {
  host: '',
  // user
  tokenVerify: 'token-verify',
  register: 'user/register',
  userActive: 'user/active',
  userMail: 'user/active-mail/send',
  forgotPassword: 'user/forgot-password',
  resetPassword: 'user/reset-password',
  findPassword: 'user/reset-password/verify',
  login: 'user/login',
  logout: 'user/logout',
  userMe: 'user/me',
  userInfo: 'user/',
  updateUserInfo: 'user/update',
  messageCount: 'message/getMessageCount',
  checkMessage: 'message/checkMessage/',
  // Problems
  problems: 'problems',
  problem: 'problem/:id',
  problemSubmit: 'problem/:id/submit',
  problemsSearch: 'problems/search',
  problemsMine: 'problems/mine',
  problemsImport: 'problems/import',
  queryResult: 'judge/:id/result',
  // Tags
  tag: 'tag/',
  tagCreate: 'tag/createTag',
  tagDelete: 'tag/deleteTag/',
  tagSearchProblem: 'tag/getSameTagProblem',
  // UserGroup
  groups: 'user-groups',
  group: 'user-group/',
  groupsSearch: 'user-groups/search',
  groupCreate: 'user-group/create',
  groupNoticeDetail: 'user-group/notices/show/',
  groupJoined: 'user-groups/joined',
  solution: 'solution/',
  // Status
  status: 'status',
  statusDetail: 'status/source-code/:id',

  // Contests
  contests: 'contests',
  contestsSearch: 'contest/search',
  contest: 'contest/:id',
  contestRankList: 'contest/:id/ranklist',
  contestSubmit: 'contest/:cid/problem/:pnum/submit',
  joinContest: 'contest/:id/join',
  createContest: 'contest/create',

  contestsMine: 'contests/mine',

  // Ranklist
  ranklist: 'user/ranklist',
  test: 'test',

  // Home
  homeChart: 'status/statistics',

  // News
  news: 'news',
  newsDetail: 'news/:id',
  editNews: 'news/:id/update',
  delNews: 'news/:id/delete',
  createNews: 'news/create',
  newsIndex: 'news/index'
}
