export const useForceUpdate = () => {
  const bodyStateShow = useState<boolean>('forceupdate.body.show', () => true)
  const forceUpdate = () => {
    bodyStateShow.value = false
    setTimeout(() => (bodyStateShow.value = true), 1)
  }
  return {
    bodyStateShow,
    forceUpdate,
  }
}
