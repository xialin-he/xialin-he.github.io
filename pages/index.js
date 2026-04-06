import NextLink from 'next/link'
import {
  Container,
  Heading,
  Box,
  Button,
  List,
  ListItem,
  useColorModeValue,
  chakra,
  Link,
  Badge,
  Text,
  Flex,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel
} from '@chakra-ui/react'
import { ChevronRightIcon, ExternalLinkIcon } from '@chakra-ui/icons'
import Paragraph from '../components/paragraph'
import { BioSection, BioYear } from '../components/bio'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import { PublicationCard } from '../components/publication'
import {
  IoLogoTwitter,
  IoLogoGithub,
  IoMail,
  IoSchool
} from 'react-icons/io5'

const ProfileImage = chakra('img', {
  shouldForwardProp: prop => ['src', 'alt', 'width', 'height'].includes(prop)
})

const SocialButton = ({ icon, href, label, colorScheme = 'teal' }) => (
  <Button
    as="a"
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    variant="ghost"
    colorScheme={colorScheme}
    leftIcon={icon}
    size="sm"
  >
    {label}
  </Button>
)

// ===== PUBLICATION DATA =====
const leadAuthorPubs = [
  {
    title: 'Learning Getting-Up Policies for Real-World Humanoid Robots',
    authors: '<strong>Xialin He</strong>*, Runpei Dong*, Zixuan Chen, Saurabh Gupta',
    venue: 'RSS2025',
    thumbnail: '/images/thumbnails/getup.gif',
    links: {
      arxiv: 'https://arxiv.org/abs/2502.12152',
      website: 'https://humanoid-getup.github.io/',
      video: 'https://www.youtube.com/watch?v=NPMUlf9soL0&t=5s'
    },
    description: 'A learning framework for humanoid fall recovery with two-stage training: discovering getting-up trajectories, then refining them for smoothness and robustness.'
  },
  {
    title: 'Learning Smooth Humanoid Locomotion through Lipschitz-Constrained Policies',
    authors: 'Zixuan Chen*, <strong>Xialin He*</strong>, Yen-Jen Wang*, Qiayuan Liao, Yanjie Ze, Zhongyu Li, S. Shankar Sastry, Jiajun Wu, Koushil Sreenath, Saurabh Gupta, Xue Bin Peng',
    venue: 'IROS2025 <span style="color:#ff63c3">(Oral)</span>',
    thumbnail: '/images/thumbnails/lcp.gif',
    links: {
      arxiv: 'https://arxiv.org/abs/2410.11825',
      code: 'https://github.com/zixuan417/smooth-humanoid-locomotion',
      website: 'https://lipschitz-constrained-policy.github.io/',
      video: 'https://www.youtube.com/watch?v=4mJCFZ--0sc'
    },
    description: 'Lipschitz-Constrained Policies (LCP) for smooth locomotion in legged robots, eliminating non-differentiable smoothing techniques.'
  },
  {
    title: 'OmniH2O: Universal and Dexterous Human-to-Humanoid Whole-Body Teleoperation and Learning',
    authors: 'Tairan He*, Zhengyi Luo*, <strong>Xialin He</strong>*, Wenli Xiao, Chong Zhang, Weinan Zhang, Kris Kitani, Changliu Liu, Guanya Shi',
    venue: 'CoRL2024',
    thumbnail: '/images/thumbnails/Preview-OmniH2O-GIF2M.gif',
    links: {
      arxiv: 'https://arxiv.org/abs/2406.08858',
      website: 'https://omni.human2humanoid.com/',
      dataset: 'https://cmu.app.box.com/s/kmayzq5ax2rxvwn97s0hzz0aq5vws9io',
      video: 'https://www.youtube.com/watch?v=ofgxZHv0GMk'
    },
    description: 'A learning-based system for whole-body humanoid teleoperation and autonomy using kinematic pose as a universal control interface.'
  },
  {
    title: 'Visual Manipulation with Legs',
    authors: '<strong>Xialin He</strong>*, Chengjing Yuan*, Wenxuan Zhou, Ruihan Yang, David Held, Xiaolong Wang',
    venue: 'CoRL2024',
    thumbnail: '/images/thumbnails/legmani.gif',
    links: {
      arxiv: 'https://arxiv.org/abs/2410.11345',
      website: 'https://legged-manipulation.github.io/',
      video: 'https://www.youtube.com/watch?v=Sl7xuA4GEpA'
    },
    description: 'A system that enables quadruped robots to manipulate objects with legs using reinforcement learning and point cloud observations.'
  }
]

const otherPubs = [
  {
    title: 'Learning Humanoid End-Effector Control for Open-Vocabulary Visual Loco-Manipulation',
    authors: 'Runpei Dong*, Ziyan Li*, <strong>Xialin He</strong>, Saurabh Gupta',
    venue: 'Arxiv2026',
    thumbnail: '/images/thumbnails/hero_poster.gif',
    links: {
      arxiv: 'https://arxiv.org/abs/2602.16705',
      website: 'https://hero-humanoid.github.io/'
    },
    description: 'HERO enables visual loco-manipulation of arbitrary objects with humanoid robots.'
  },
  {
    title: 'InterPrior: Scaling Generative Control for Physics-Based Human-Object Interactions',
    authors: 'Sirui Xu, Samuel Schulter, Morteza Ziyadi, <strong>Xialin He</strong>, Xiaohan Fei, Yu-Xiong Wang, Liang-Yan Gui',
    venue: 'CVPR2026',
    thumbnail: '/images/thumbnails/interprior.gif',
    links: {
      arxiv: 'https://arxiv.org/abs/2602.06035',
      website: 'https://sirui-xu.github.io/InterPrior/'
    },
    description: 'A scalable generative controller for humanoid human-object interactions via large-scale imitation distillation.'
  },
  {
    title: 'SoFar: Language-Grounded Orientation Bridges Spatial Reasoning and Object Manipulation',
    authors: 'Zekun Qi*, Wenyao Zhang*, Yufei Ding*, Runpei Dong, Xinqiang Yu, Jingwen Li, Lingyun Xu, Baoyu Li, <strong>Xialin He</strong>, Guofan Fan, Jiazhao Zhang, Jiawei He, Jiayuan Gu, Xin Jin, Kaisheng Ma, Zhizheng Zhang, He Wang, Li Yi',
    venue: 'NeurIPS2025 <span style="color:#ff63c3">(Spotlight)</span>',
    thumbnail: '/images/thumbnails/sofar.gif',
    links: {
      arxiv: 'https://arxiv.org/abs/2502.13143',
      code: 'https://github.com/qizekun/SoFar',
      website: 'https://qizekun.github.io/sofar/',
      video: 'https://www.youtube.com/watch?v=RRKEABZzbwA&feature=youtu.be'
    },
    description: 'Semantic orientation using natural language to describe object orientations for improved robotic manipulation.'
  },
  {
    title: 'AlphaOne: Reasoning Models Thinking Slow and Fast at Test Time',
    authors: 'Junyu Zhang*, Runpei Dong*, Han Wang, Xuying Ning, Haoran Geng, Peihao Li, <strong>Xialin He</strong>, Yutong Bai, Jitendra Malik, Saurabh Gupta, Huan Zhang',
    venue: 'EMNLP2025',
    thumbnail: '/images/thumbnails/alphaone.png',
    links: {
      arxiv: 'https://arxiv.org/abs/2505.24863',
      code: 'https://github.com/ASTRAL-Group/AlphaOne',
      website: 'https://alphaone-project.github.io/'
    },
    description: 'A test-time framework that controls reasoning speed of large models using a universal alpha parameter.'
  },
  {
    title: 'Generalizable Humanoid Manipulation with Improved 3D Diffusion Policies',
    authors: 'Yanjie Ze, Zixuan Chen, Wenhao Wang, Tianyi Chen, <strong>Xialin He</strong>, Ying Yuan, Xue Bin Peng, Jiajun Wu',
    venue: 'IROS2025 <span style="color:#ff63c3">(Oral)</span>',
    thumbnail: '/images/thumbnails/idp3.gif',
    links: {
      arxiv: 'https://arxiv.org/abs/2410.10803',
      code: 'https://github.com/YanjieZe/Improved-3D-Diffusion-Policy',
      website: 'https://humanoid-manipulation.github.io/',
      video: 'https://www.youtube.com/watch?v=6H2MkMetmFk'
    },
    description: 'Improved 3D Diffusion Policy (iDP3) enables humanoid robots to perform autonomous tasks using egocentric 3D visual representations.'
  },
  {
    title: 'Sim-to-Real Transfer for Quadrupedal Locomotion via Terrain Transformer',
    authors: 'Hang Lai, Weinan Zhang, <strong>Xialin He</strong>, Chen Yu, Zheng Tian, Yong Yu, Jun Wang',
    venue: 'ICRA2023',
    thumbnail: '/images/thumbnails/TERT.png',
    links: {
      arxiv: 'https://arxiv.org/abs/2212.07740',
      code: 'https://www.dropbox.com/s/hima06k5i4k0mty/TERT.zip?dl=0',
      website: 'https://terrain-transformer.github.io/'
    },
    description: 'Terrain Transformer (TERT) leverages Transformer for quadrupedal locomotion over multiple terrains.'
  }
]

const Page = () => {
  return (
    <Layout title="Home">
      <Container maxW="container.md">
        {/* ===== HERO SECTION ===== */}
        <Section delay={0.1}>
          <Box display={{ md: 'flex' }} mt={6}>
            <Box flexGrow={1}>
              <Heading as="h2" variant="page-title" fontSize={36} fontWeight={700}>
                Xialin He
              </Heading>
              <Text fontSize="lg" color={useColorModeValue('gray.600', 'gray.400')}>
                何夏麟
              </Text>
              <Text mt={1} fontSize="sm" color={useColorModeValue('gray.500', 'gray.500')}>
                Ph.D. Student in Computer Science @ UIUC
              </Text>
            </Box>
            <Box
              flexShrink={0}
              mt={{ base: 4, md: 0 }}
              ml={{ md: 6 }}
              textAlign="center"
            >
              <Box
                borderColor={useColorModeValue('gray.300', 'whiteAlpha.400')}
                borderWidth={2}
                borderStyle="solid"
                w="120px"
                h="120px"
                display="inline-block"
                borderRadius="full"
                overflow="hidden"
              >
                <ProfileImage
                  src="/images/IMG_5935.jpg"
                  alt="Profile photo"
                  width="120"
                  height="120"
                />
              </Box>
            </Box>
          </Box>
        </Section>

        {/* ===== BIO ===== */}
        <Section delay={0.2}>
          <Heading as="h3" variant="section-title" fontSize={20}>
            About
          </Heading>
          <Paragraph>
            I&apos;m a 2nd year Ph.D. student in Computer Science at{' '}
            <Link href="https://illinois.edu/" target="_blank">
              University of Illinois Urbana-Champaign
            </Link>{' '}
            supervised by Prof.{' '}
            <Link href="https://saurabhg.web.illinois.edu/" target="_blank">
              Saurabh Gupta
            </Link>
            .
          </Paragraph>
          <Paragraph>
            Before that, I earned my bachelor degree at{' '}
            <Link href="https://acm.sjtu.edu.cn/home" target="_blank">
              ACM Honors Class
            </Link>
            ,{' '}
            <Link href="https://en.sjtu.edu.cn/" target="_blank">
              Shanghai Jiao Tong University
            </Link>{' '}
            and I was privileged to delve into the application of Reinforcement
            Learning in Quadruped Robot&apos;s locomotion while collaborating with
            the{' '}
            <Link href="https://apex.sjtu.edu.cn/" target="_blank">
              SJTU APEX lab
            </Link>{' '}
            under the guidance of Prof.{' '}
            <Link href="http://wnzhang.net/" target="_blank">
              Weinan Zhang
            </Link>
            .
          </Paragraph>
          <Paragraph>
            During my senior year, I was fortunate to work with Prof.{' '}
            <Link href="https://xiaolonw.github.io/" target="_blank">
              Xiaolong Wang
            </Link>{' '}
            at UCSD Wang Lab as a research intern. During my time there, I also
            had the opportunity to collaborate closely with Prof.{' '}
            <Link href="https://davheld.github.io/" target="_blank">
              David Held
            </Link>
            .
          </Paragraph>
          <Paragraph>
            My research interests lie in{' '}
            <strong>Reinforcement Learning</strong>,{' '}
            <strong>Robot Learning</strong>,{' '}
            <strong>Computer Vision</strong> and{' '}
            <strong>Control Theory</strong>.
          </Paragraph>
          <Text mt={4} fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>
            If you are interested in my work, feel free to contact me for
            further discussions or potential collaborations.
          </Text>
        </Section>

        {/* ===== SOCIAL LINKS ===== */}
        <Section delay={0.3}>
          <Flex wrap="wrap" gap={2} justify="center">
            <SocialButton
              icon={<IoMail />}
              href="mailto:mulinjiu1129@gmail.com"
              label="Email"
            />
            <SocialButton
              icon={<IoLogoGithub />}
              href="https://github.com/mulinjiu"
              label="GitHub"
            />
            <SocialButton
              icon={<IoSchool />}
              href="https://scholar.google.com/citations?user=-oy5DaIAAAAJ&"
              label="Scholar"
            />
            <SocialButton
              icon={<IoLogoTwitter />}
              href="https://x.com/Xialin_He"
              label="Twitter"
            />
          </Flex>
        </Section>

        {/* ===== PUBLICATIONS ===== */}
        <Section delay={0.4}>
          <Tabs variant="soft-rounded" colorScheme="green" mt={4}>
            <TabList mb={4}>
              <Tab fontSize="sm">Lead Author</Tab>
              <Tab fontSize="sm">Collaborations</Tab>
            </TabList>
            <TabPanels>
              <TabPanel p={0}>
                {leadAuthorPubs.map((pub, i) => (
                  <PublicationCard key={i} {...pub} />
                ))}
              </TabPanel>
              <TabPanel p={0}>
                {otherPubs.map((pub, i) => (
                  <PublicationCard key={i} {...pub} />
                ))}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Section>

        {/* ===== EDUCATION ===== */}
        <Section delay={0.5}>
          <Heading as="h3" variant="section-title" fontSize={20}>
            Education
          </Heading>
          <BioSection>
            <BioYear>2024 -</BioYear>
            Ph.D. in Computer Science,{' '}
            <Link href="https://illinois.edu/" target="_blank">
              University of Illinois Urbana-Champaign
            </Link>
          </BioSection>
          <BioSection>
            <BioYear>2020 - 2024</BioYear>
            B.S. in Computer Science (ACM Honors Class),{' '}
            <Link href="https://en.sjtu.edu.cn/" target="_blank">
              Shanghai Jiao Tong University
            </Link>
          </BioSection>
        </Section>

        {/* ===== LOVE CORNER ===== */}
        <Box
          as="a"
          href="https://xwx84768.github.io/"
          target="_blank"
          position="fixed"
          bottom={5}
          right={5}
          fontSize="20px"
          opacity={0.5}
          transition="0.2s"
          zIndex={9999}
          _hover={{ opacity: 1, transform: 'scale(1.2)' }}
        >
          ❤️
        </Box>
      </Container>
    </Layout>
  )
}

export default Page
