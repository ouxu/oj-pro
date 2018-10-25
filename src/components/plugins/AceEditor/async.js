import dynamic from 'umi/dynamic'

export default dynamic({
  loader: () => import('./index')
})
