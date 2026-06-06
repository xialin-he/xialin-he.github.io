import Head from 'next/head'
import dynamic from 'next/dynamic'
import { Box, Container } from '@chakra-ui/react'
import Navbar from '../navbar'
import Footer from '../footer'
import VoxelGeoLoader from '../voxel-geo-loader'

const LazyVoxelGeo = dynamic(() => import('../voxel-geo'), {
  ssr: false,
  loading: () => <VoxelGeoLoader />
})

const Main = ({ children, router }) => {
  return (
    <Box as="main" pb={8}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Xialin He - PhD student at UIUC, researching Reinforcement Learning, Robot Learning, and Computer Vision" />
        <meta name="author" content="Xialin He" />
        <meta property="og:site_name" content="Xialin He" />
        <meta name="og:title" content="Xialin He" />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
        <title>Xialin He - Homepage</title>
      </Head>

      <Navbar path={router.asPath} />

      <Container maxW="container.md" pt={14}>
        {children}
        <Footer />
      </Container>
    </Box>
  )
}

export default Main
