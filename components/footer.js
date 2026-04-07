import { Box, Link } from '@chakra-ui/react'

const Footer = () => {
  return (
    <Box align="center" opacity={0.4} fontSize="sm" mt={8} mb={4}>
      &copy; {new Date().getFullYear()} Xialin He. 3D cat model by{' '}
      <Link href="https://sketchfab.com/DreamNoms" target="_blank">
        DreamNoms
      </Link>{' '}
      (CC-BY-4.0).
    </Box>
  )
}

export default Footer
