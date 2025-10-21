# OJ PRO 技术概览与本地运行指引

本项目是 NEUQ Online Judge 平台的前端（Web）部分，基于 UmiJS + React + Ant Design + DVA 构建，提供题库、竞赛/作业、评测状态、排行榜、后台管理等功能模块。

- 在线预览（历史链接，可能变更）：http://oj.acmclub.cn
- 仓库名称：oj-pro

## 技术栈
- 语言与样式：
  - JavaScript (ES6+)，少量 TypeScript 配置（允许 JS 参与编译，非全量 TS）
  - Less/CSS
- 核心框架：
  - Umi 2.x（自动路由、打包构建、动态加载）
  - React 16.8.x（Hooks 可用）
  - Ant Design 3.x（UI 组件库，内置 zh_CN 本地化）
  - DVA（基于 redux-saga 的状态管理与副作用模型）
- 网络与工具：
  - axios（HTTP 客户端，经 utils/request 封装）
  - classnames、nprogress、copy-to-clipboard 等常用工具
  - markdown-it、katex、react-ace（Markdown/公式/代码编辑器）
  - recharts（图表）
- 包管理与构建：
  - Yarn（仓库包含 yarn.lock；CI 使用 yarn）
  - Umi（构建与按需加载）
  - 生产构建通过 Qiniu Webpack Plugin 上传静态资源（需 pushConfig.js）

## 目录结构（深度 2-3）
```
.
├─ .editorconfig                # 编辑器通用配置
├─ .eslintignore                # ESLint 忽略列表
├─ .eslintrc                    # ESLint 规则（standard/standard-jsx）
├─ .gitignore
├─ .travis.enc                  # CI 解密文件（生成 pushConfig.js）
├─ .travis.yml                  # Travis CI：Node 10 + yarn pub
├─ .umirc.js                    # Umi 主配置（开发）
├─ .umirc.prod.js               # Umi 生产配置（CDN、公网兼容、七牛上传）
├─ fjpublish.config.js          # fjpublish 发布工具配置（依赖 pushConfig）
├─ package.json                 # 脚本与依赖
├─ tsconfig.json                # TS 配置（含路径别名，allowJs: true）
├─ yarn.lock
├─ public/
│  └─ app/favicon.ico           # Favicon
└─ src/
   ├─ app.js                    # DVA 全局配置（onError）
   ├─ global.js                 # 全局 JS（polyfill 预留）
   ├─ global.less               # 全局样式入口
   ├─ components/
   │  └─ plugins/               # 通用组件（Loading、Markdown、AceEditor 等）
   ├─ config/
   │  ├─ api.js                 # 后端接口路径集中定义
   │  ├─ app.js                 # 前端应用配置（请求超时、BaseURL 等）
   │  ├─ sider.js               # 侧边栏菜单配置
   │  └─ tableConfig.js         # 表格配置（列、筛选等）
   ├─ images/                   # 图片资源
   ├─ layouts/
   │  ├─ index.js               # 全局布局包装（LocaleProvider + Layout）
   │  ├─ layout.js              # 主布局（Header/Sider/Content）
   │  └─ ...                    # 布局子模块（Header、Sider、Navigation 等）
   ├─ mock/                     # Mock（当前空）
   ├─ models/                   # 全局状态模块（DVA）
   │  ├─ app.js                 # 布局/查询参数同步等
   │  ├─ contests.js            # 竞赛相关状态
   │  ├─ problems.js            # 题库相关状态
   │  ├─ user.js                # 用户相关状态
   │  └─ utils.js               # 全局 loading/modal 状态
   ├─ pages/                    # 页面（Umi 约定式路由）
   │  ├─ document.ejs           # 自定义 HTML 模板（生产注入监控等）
   │  ├─ index.js               # 根路由重定向到 /home
   │  ├─ home/                  # 首页（图表、热点题目、公告、状态）
   │  ├─ problems/              # 题库列表与详情（/$id/）
   │  ├─ contests/              # 竞赛/作业
   │  ├─ status/                # 评测状态
   │  ├─ ranklist/              # 排名
   │  ├─ admin/                 # 后台管理（_layout、题目/竞赛/账户/机器等）
   │  ├─ news、newsList         # 公告/新闻
   │  ├─ register、forget、user  # 注册/找回/用户中心
   │  └─ 404.js                 # 404 页
   ├─ services/                 # 业务接口封装（调用 utils/request）
   │  ├─ contests.js
   │  ├─ problems.js
   │  └─ user.js
   ├─ style/                    # 全局样式碎片（reset、mixin、antd 覆盖等）
   └─ utils/                    # 工具库
      ├─ request.js             # axios 封装（baseURL、token 注入、下载等）
      ├─ message.js             # 统一消息
      ├─ errorHandler.js        # DVA 错误处理
      ├─ modelExtend.js         # model 扩展工具
      └─ ...
```

关键入口与职责：
- Umi 入口与路由：src/pages 按目录即路由；src/pages/index.js 重定向到 /home；src/pages/document.ejs 自定义 HTML 模板。
- 全局布局：src/layouts（LocaleProvider zh_CN + AntD + Sider/Header/Content）。
- 全局状态：src/models（DVA）；页面私有状态通常放在对应页面目录（如 src/pages/home/model.js）。
- 配置与接口：src/config/app.js（请求基地址等）、src/config/api.js（接口路径）。
- 网络层：src/utils/request.js 基于 axios，自动携带本地存储 token、统一错误码处理、文件下载。

## 脚本与运行
package.json 脚本：
- 开发启动：
  - yarn start → umi dev（默认 http://localhost:8000）
- 构建：
  - yarn build → cross-env UMI_ENV=prod umi build
  - 构建分析：yarn anal → cross-env UMI_ENV=prod ANALYZE=1 umi build
- 发布（CI 使用）：
  - yarn pub → 先构建再 fjpublish env acm -y --nobuild（依赖 pushConfig.js）
- 代码检查：
  - yarn lint → eslint --fix --ext .js src

依赖工具与版本：
- Node.js：CI 使用 10.x；本地建议使用 LTS（>=14）以获得更好的兼容性，并通过 nvm 管理多版本。
- 包管理：Yarn（仓库包含 yarn.lock；.travis.yml 也配置了 yarn cache）

本地开发步骤：
1) 安装依赖：
   - yarn install
2) 启动开发服务：
   - yarn start
   - 访问 http://localhost:8000
3) 连接后端 API：
   - 默认请求基地址在 src/config/app.js 的 requestBaseURL（示例：`http://140.143.222.61:8088/`）。
   - 如需接入本地/测试后端，请修改该值，或在改进方案中采用环境变量方案（见文末建议）。

本地构建说明：
- 直接执行 yarn build 会读取 .umirc.prod.js，并启用七牛上传插件，需要存在 pushConfig.js（CI 解密生成）。
- 若仅需本地产物而不上传，可选择：
  1) 使用开发环境进行构建：`npx cross-env UMI_ENV=dev umi build`（或在 package.json 增加 build:local 脚本）。
  2) 暂时移除/注释 .umirc.prod.js 中的 qiniu 插件（不建议提交到仓库，可作为本地调试手段）。

环境变量：
- UMI_ENV：构建环境开关（prod 对应 .umirc.prod.js；dev 使用 .umirc.js）。
- ANALYZE：设置为 1 时开启构建分析。

## 配置清单
- Umi 配置：
  - .umirc.js
    - 插件：umi-plugin-react（开启 dva、antd、dynamicImport）。
    - dynamicImport：按需加载、指定 Loading 组件。
    - routes.exclude：排除 models、services、components 等目录的自动路由。
    - alias：components/config/images/pages/utils/services/layouts 别名。
    - 其他：disableCSSModules、ignoreMomentLocale。
  - .umirc.prod.js
    - hash: true、targets: { ie: 10 }、publicPath 指向 http://ojcdn.acmclub.cn/new/
    - chainWebpack：删除 splitChunks、接入 qiniu-webpack-plugin（require('./pushConfig').qiniu）。
- TypeScript：tsconfig.json（allowJs: true；设置 jsx、paths 别名、rootDirs 等）。
- Lint/格式化：.eslintrc（standard、standard-jsx）、.eslintignore、.editorconfig。
- CI/CD：.travis.yml（macOS + Node 10；解密 .travis.enc 产出 pushConfig.js；执行 yarn pub；仅 master 分支）。
- 发布工具：fjpublish.config.js（require('./pushConfig').fjPublish.modules）。
- 其他：public/app/favicon.ico、src/pages/document.ejs（生产注入 polyfill、fundebug、hotjar 代码）。

## 架构与模块
- 路由与布局：
  - 约定式路由（src/pages/*），支持动态路由（如 /problems/$id）。
  - 全局布局由 src/layouts 包裹；后台管理区（/admin）有独立 _layout。
- 状态管理（DVA）：
  - 全局 models（src/models）与页面级 model（如 src/pages/home/model.js）。
  - effects 中调用 services，services 统一通过 utils/request 请求后端。
- 网络层：
  - axios 实例基于 src/config/app.js 配置（超时、baseURL）。
  - 本地 token 从 localStorage 的 NEUQ-OJ 中读取并注入请求头 token。
  - 错误码统一处理（data.code !== 0 抛错并可上报）。
- 接口定义：
  - src/config/api.js 集中声明后端 RESTful 路径，通过占位符替换（如 :id）。
- 典型模块：
  - home：统计图表、热点题目、公告、最新提交。
  - problems：题库列表、题目详情与提交、评测结果轮询。
  - contests：竞赛/作业列表、报名、提交、排行榜导出。
  - status：全站评测状态流。
  - ranklist：用户排行榜。
  - admin：题目/竞赛管理、新闻公告、账户批量生成、判题机管理等。

## 本地运行小贴士
- 端口：未在 .umirc.js 自定义，umi dev 默认 8000。
- 代理：仓库未内置 devServer 代理。如需本地跨域代理，可在 .umirc.js 中增加 proxy 配置，或使用独立代理（如 nginx、本地代理工具）。
- 静态资源：生产环境使用 CDN publicPath（.umirc.prod.js）；开发环境走相对路径。

## 可执行的改进建议（3-5 条）
1) 构建与发布解耦：
   - 在 .umirc.prod.js 中以环境变量开关控制是否启用 qiniu-webpack-plugin（例如仅在 CI 或存在必要密钥时启用）。
   - 在 package.json 增加 build:local 脚本：`cross-env UMI_ENV=dev umi build`，便于本地打包。
2) 环境配置标准化：
   - 引入 .env.{development,production} 并通过 Umi define/环境变量读取 API BaseURL，避免硬编码在 src/config/app.js。
3) 包管理与 README 统一：
   - README 当前写明“包管理：Npm”，但仓库与 CI 使用 Yarn，建议改为统一使用 Yarn，并给出安装/常用命令。
4) 补充测试与质量保障：
   - 增加基础单元测试/组件快照测试（Jest + @umijs/test 或 RTL），并在 CI 中执行。
   - 增加 pre-commit/pre-push 钩子（lint-staged/husky）统一 Lint/格式化。
5) 升级与依赖健康：
   - 逐步升级到 Umi 3+/Ant Design 4+ 与较新的 React，以获得更好的生态与安全性。
   - 若计划长期维护，可考虑 TypeScript 化或移除不必要的 TS 配置。

---
如需更多说明或自动化脚本示例，可在仓库中新建 docs/dev-guide.md 并逐步沉淀。
