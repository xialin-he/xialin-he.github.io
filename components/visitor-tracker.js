import { useEffect, useRef } from 'react'
import { Box } from '@chakra-ui/react'

// MapMyVisitors visitor counter. The visit is logged when the browser
// fetches globe.js (the request carries the visitor IP + site token), so
// the globe itself is rendered off-screen and never shown — stats still
// land in the MapMyVisitors dashboard, but nothing appears on the page.
const VisitorTracker = () => {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || el.querySelector('#mmvst_globe')) return
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.id = 'mmvst_globe'
    script.async = true
    script.src =
      '//mapmyvisitors.com/globe.js?d=N02_PoKyU_4mhMxChvpP5_ChbR3sN7Z72OllMAje-Kc'
    el.appendChild(script)
  }, [])

  return (
    <Box
      ref={ref}
      aria-hidden="true"
      position="absolute"
      left="-9999px"
      top="0"
      width="200px"
      height="200px"
      overflow="hidden"
      pointerEvents="none"
    />
  )
}

export default VisitorTracker
