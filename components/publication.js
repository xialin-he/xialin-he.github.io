import {
  Box,
  Text,
  LinkBox,
  LinkOverlay,
  Badge,
  HStack,
  useColorModeValue,
  Flex
} from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'

export const PublicationCard = ({
  title,
  authors,
  venue,
  thumbnail,
  links = {},
  description,
  award,
  awardVariant = 'red',
  isLeadAuthor
}) => {
  const cardBg = useColorModeValue('whiteAlpha.700', 'whiteAlpha.100')
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.200')
  const hoverBg = useColorModeValue('whiteAlpha.900', 'whiteAlpha.200')
  const descColor = useColorModeValue('gray.600', 'gray.400')

  const awardStyles = {
    red: {
      bg: 'linear(to-r, #ff1e1e, #ff5252)',
      shadow: '0 0 10px rgba(255,30,30,0.55)'
    },
    gold: {
      bg: 'linear(to-r, #92400e, #d97706)',
      shadow: '0 0 10px rgba(217,119,6,0.5)'
    }
  }
  const aw = awardStyles[awardVariant] || awardStyles.red

  return (
    <Box
      bg={cardBg}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="lg"
      overflow="hidden"
      p={4}
      mb={4}
      transition="all 0.3s"
      _hover={{
        bg: hoverBg,
        transform: 'translateY(-2px)',
        shadow: 'lg'
      }}
    >
      <Flex direction={{ base: 'column', md: 'row' }} gap={4}>
        {thumbnail && (
          <Box
            flexShrink={0}
            w={{ base: '100%', md: '180px' }}
            maxW={{ base: '260px', md: '180px' }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={thumbnail}
              alt={title}
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '8px'
              }}
            />
          </Box>
        )}
        <Box flex={1}>
          {award && (
            <Badge
              mb={2}
              px={2}
              py={0.5}
              borderRadius="full"
              color="white"
              bgGradient={aw.bg}
              boxShadow={aw.shadow}
              fontSize="0.72em"
              fontWeight="bold"
              letterSpacing="0.02em"
              textTransform="none"
              display="inline-flex"
              alignItems="center"
              gap="4px"
            >
              {award}
            </Badge>
          )}
          <Text fontWeight="bold" fontSize="md" mb={1}>
            {title}
          </Text>
          <Text
            fontSize="sm"
            color={descColor}
            mb={1}
            dangerouslySetInnerHTML={{ __html: authors }}
          />
          <Text fontSize="sm" mb={2}>
            <em dangerouslySetInnerHTML={{ __html: venue }} />
          </Text>
          <HStack spacing={2} flexWrap="wrap">
            {links.arxiv && (
              <PaperLink href={links.arxiv} label="arxiv" />
            )}
            {links.video && (
              <PaperLink href={links.video} label="video" />
            )}
            {links.code && (
              <PaperLink href={links.code} label="code" />
            )}
            {links.website && (
              <PaperLink href={links.website} label="website" />
            )}
            {links.dataset && (
              <PaperLink href={links.dataset} label="dataset" />
            )}
          </HStack>
          {description && (
            <Text fontSize="xs" color={descColor} mt={2} noOfLines={2}>
              {description}
            </Text>
          )}
        </Box>
      </Flex>
    </Box>
  )
}

const PaperLink = ({ href, label }) => {
  const bg = useColorModeValue('gray.100', 'whiteAlpha.200')
  const hoverBg = useColorModeValue('#3d7aed', '#ff63c3')

  return (
    <Box
      as="a"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      px={3}
      py={1}
      fontSize="xs"
      fontWeight={500}
      borderRadius="full"
      bg={bg}
      transition="all 0.2s"
      _hover={{
        bg: hoverBg,
        color: 'white',
        transform: 'translateY(-1px)'
      }}
    >
      {label}
    </Box>
  )
}

export default PublicationCard
