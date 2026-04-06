import { Box } from '@chakra-ui/react'

const Footer = () => {
  return (
    <Box align="center" opacity={0.4} fontSize="sm" mt={8} mb={4}>
      &copy; {new Date().getFullYear()} Xialin He. All Rights Reserved.
    </Box>
  )
}

export default Footer
