import defaultSettings from '@/settings'

// 改变页面标题
export default (pageTitle) => {
  const title = defaultSettings.title || 'Vue Element Admin'

  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
