import { forwardRef } from 'react'
import { Box, Spinner } from '@chakra-ui/react'

export const GeoSpinner = () => (
  <Spinner
    size="xl"
    position="absolute"
    left="50%"
    top="50%"
    ml="calc(0px - var(--spinner-size) / 2)"
    mt="calc(0px - var(--spinner-size))"
  />
)

export const GeoContainer = forwardRef(({ children }, ref) => (
  <Box
    ref={ref}
    m="auto"
    mt={['-20px', '-60px', '-120px']}
    mb={['-40px', '-100px', '-160px']}
    w={[280, 480, 640]}
    h={[280, 480, 640]}
    position="relative"
  >
    {children}
  </Box>
))

GeoContainer.displayName = 'GeoContainer'

const Loader = () => {
  return (
    <GeoContainer>
      <GeoSpinner />
    </GeoContainer>
  )
}

export default Loader
