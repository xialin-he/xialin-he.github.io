import {
  Container,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel
} from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import { PublicationCard } from '../components/publication'

// Same data as index - could be extracted to a shared data file
const leadAuthorPubs = [
  {
    title: 'ULTRA: Unified Multimodal Control for Autonomous Humanoid Whole-Body Loco-Manipulation',
    authors: '<strong>Xialin He</strong>*, Sirui Xu*, Xinyao Li, Runpei Dong, Liuyu Bian, Yu-Xiong Wang, Liang-Yan Gui',
    venue: 'arXiv2026',
    thumbnail: '/images/thumbnails/ultra.gif',
    links: {
      arxiv: 'https://arxiv.org/abs/2603.03279',
      code: 'https://github.com/ULTRA-Humanoid',
      website: 'https://ultra-humanoid.github.io/'
    },
    description: 'A unified framework for autonomous humanoid whole-body loco-manipulation combining physics-driven motion retargeting with multimodal control.'
  },
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
    description: 'Lipschitz-Constrained Policies (LCP) for smooth locomotion in legged robots.'
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
    description: 'A learning-based system for whole-body humanoid teleoperation and autonomy.'
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
    description: 'Enabling quadruped robots to manipulate objects with legs using RL and point cloud observations.'
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
    description: 'A scalable generative controller for humanoid human-object interactions.'
  },
  {
    title: 'SoFar: Language-Grounded Orientation Bridges Spatial Reasoning and Object Manipulation',
    authors: 'Zekun Qi*, Wenyao Zhang*, Yufei Ding*, Runpei Dong, ..., <strong>Xialin He</strong>, ..., Li Yi',
    venue: 'NeurIPS2025 <span style="color:#ff63c3">(Spotlight)</span>',
    thumbnail: '/images/thumbnails/sofar.gif',
    links: {
      arxiv: 'https://arxiv.org/abs/2502.13143',
      code: 'https://github.com/qizekun/SoFar',
      website: 'https://qizekun.github.io/sofar/',
      video: 'https://www.youtube.com/watch?v=RRKEABZzbwA&feature=youtu.be'
    },
    description: 'Semantic orientation using natural language for improved robotic manipulation.'
  },
  {
    title: 'AlphaOne: Reasoning Models Thinking Slow and Fast at Test Time',
    authors: 'Junyu Zhang*, Runpei Dong*, ..., <strong>Xialin He</strong>, ..., Huan Zhang',
    venue: 'EMNLP2025',
    thumbnail: '/images/thumbnails/alphaone.png',
    links: {
      arxiv: 'https://arxiv.org/abs/2505.24863',
      code: 'https://github.com/ASTRAL-Group/AlphaOne',
      website: 'https://alphaone-project.github.io/'
    },
    description: 'A test-time framework controlling reasoning speed using a universal alpha parameter.'
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
    description: 'iDP3 enables humanoid robots to perform autonomous tasks using egocentric 3D visual representations.'
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
    description: 'Terrain Transformer (TERT) for quadrupedal locomotion over multiple terrains.'
  }
]

const Publications = () => {
  return (
    <Layout title="Publications">
      <Container maxW="container.md">
        <Section delay={0.1}>
          <Heading as="h3" variant="section-title" fontSize={20} mb={6}>
            Publications
          </Heading>
        </Section>

        <Section delay={0.2}>
          <Tabs variant="soft-rounded" colorScheme="green">
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
      </Container>
    </Layout>
  )
}

export default Publications
