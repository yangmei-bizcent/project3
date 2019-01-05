const lazyload = (name) => (resolve) => require([`@/views/${name}`], resolve)

const changeTitle = (title) => {
  document.title = title
  document.body.scrollTop = 0
}
const generaMenu = (routers, data) => {
  data.forEach((item) => {
    let menu = {
      path: '/'+item.key,
      name: item.key,
      meta: {
          title: item.name
      },
      component: lazyload(item.key)
    }
    routers.push(menu)
  })
}
export {
  lazyload,
  changeTitle,
  generaMenu
}