'use client'

import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  SimpleGrid,
  Icon,
  useColorModeValue,
  Flex,
  Badge,
  Card,
  CardBody,
  Stack,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  IconButton,
  Grid,
  GridItem,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { 
  FaChartLine, 
  FaPiggyBank, 
  FaChartPie, 
  FaBell, 
  FaShieldAlt, 
  FaRocket,
  FaMoneyBillWave,
  FaCreditCard,
  FaWallet,
  FaChartBar,
  FaUserShield,
  FaMobileAlt,
  FaLock,
  FaSync,
  FaCheckCircle
} from 'react-icons/fa'
import Link from 'next/link'

const MotionBox = motion(Box)
const MotionCard = motion(Card)

export default function Home() {
  const bgColor = useColorModeValue('white', 'gray.800')
  const textColor = useColorModeValue('gray.600', 'gray.300')
  const cardBg = useColorModeValue('white', 'gray.700')

  const features = [
    {
      icon: FaChartLine,
      title: 'Smart Analytics',
      description: 'Get detailed insights into your spending patterns and financial health.',
      color: 'blue.500'
    },
    {
      icon: FaPiggyBank,
      title: 'Goal Tracking',
      description: 'Set and track your financial goals with our intuitive progress system.',
      color: 'green.500'
    },
    {
      icon: FaChartPie,
      title: 'Budget Planning',
      description: 'Create and manage budgets with our easy-to-use planning tools.',
      color: 'purple.500'
    },
    {
      icon: FaBell,
      title: 'Smart Notifications',
      description: 'Stay informed with real-time alerts and personalized recommendations.',
      color: 'orange.500'
    },
    {
      icon: FaShieldAlt,
      title: 'Secure Platform',
      description: 'Your data is protected with bank-level security measures.',
      color: 'red.500'
    },
    {
      icon: FaRocket,
      title: 'Quick Setup',
      description: 'Get started in minutes with our simple onboarding process.',
      color: 'teal.500'
    }
  ]

  const benefits = [
    {
      icon: FaMoneyBillWave,
      title: 'Save More',
      description: 'Track your expenses and find ways to save more money.',
      color: 'green.500'
    },
    {
      icon: FaCreditCard,
      title: 'Smart Payments',
      description: 'Manage all your payments in one secure place.',
      color: 'blue.500'
    },
    {
      icon: FaWallet,
      title: 'Budget Control',
      description: 'Take control of your spending with smart budgeting tools.',
      color: 'purple.500'
    },
    {
      icon: FaChartBar,
      title: 'Visual Reports',
      description: 'Beautiful charts and reports to understand your finances.',
      color: 'orange.500'
    }
  ]

  return (
    <Box bg={bgColor}>
      {/* Hero Section */}
      <Box 
        position="relative" 
        overflow="hidden" 
        bgGradient="linear(to-r, blue.50, purple.50)"
        py={20}
      >
        <Container maxW="container.xl">
          <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={8} alignItems="center">
            <GridItem>
              <VStack spacing={6} align="start">
                <Badge 
                  colorScheme="blue" 
                  px={4} 
                  py={1} 
                  borderRadius="full"
                  className="pulse"
                >
                  New Features Available
                </Badge>
                <Heading 
                  as="h1" 
                  size="2xl" 
                  className="gradient-text"
                >
                  Take Control of Your Financial Future
                </Heading>
                <Text 
                  fontSize="xl" 
                  color={textColor}
                >
                  Track your expenses, set financial goals, and make smarter money decisions with our comprehensive financial management platform.
                </Text>
                <HStack spacing={4}>
                  <Button 
                    as={Link} 
                    href="/signup" 
                    size="lg" 
                    colorScheme="blue"
                    className="btn-gradient"
                    leftIcon={<FaRocket />}
                  >
                    Get Started Free
                  </Button>
                  <Button 
                    as={Link} 
                    href="/demo" 
                    size="lg" 
                    variant="outline"
                    className="border-gradient"
                    leftIcon={<FaChartLine />}
                  >
                    Watch Demo
                  </Button>
                </HStack>
              </VStack>
            </GridItem>
            <GridItem>
              <SimpleGrid columns={2} spacing={4}>
                {benefits.slice(0, 4).map((benefit, index) => (
                  <MotionCard
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="card-hover glass"
                    bg={cardBg}
                  >
                    <CardBody>
                      <VStack spacing={3} align="center" textAlign="center">
                        <Icon 
                          as={benefit.icon} 
                          w={8} 
                          h={8} 
                          color={benefit.color}
                        />
                        <Heading size="sm">{benefit.title}</Heading>
                      </VStack>
                    </CardBody>
                  </MotionCard>
                ))}
              </SimpleGrid>
            </GridItem>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxW="container.xl" py={20}>
        <VStack spacing={12}>
          <VStack spacing={4} textAlign="center">
            <Heading className="text-gradient-primary">Powerful Features</Heading>
            <Text fontSize="xl" color={textColor} maxW="600px">
              Everything you need to manage your finances effectively
            </Text>
          </VStack>
          <Grid 
            templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(3, 1fr)' }}
            gap={6}
            width="100%"
          >
            {features.map((feature, index) => (
              <MotionCard
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card-hover glass"
                bg={cardBg}
                height="100%"
                p={2}
              >
                <CardBody>
                  <VStack spacing={4} align="center" textAlign="center">
                    <Icon 
                      as={feature.icon} 
                      w={12} 
                      h={12} 
                      color={feature.color}
                      p={3}
                      bg={`${feature.color}10`}
                      borderRadius="xl"
                    />
                    <VStack spacing={2}>
                      <Heading size="md">{feature.title}</Heading>
                      <Text fontSize="md" color={textColor}>{feature.description}</Text>
                    </VStack>
                  </VStack>
                </CardBody>
              </MotionCard>
            ))}
          </Grid>
        </VStack>
      </Container>

      {/* Stats Section */}
      <Box bg="gray.50" py={20}>
        <Container maxW="container.xl">
          <SimpleGrid 
            columns={{ base: 1, md: 3 }} 
            spacing={8}
            className="grid-auto-fit"
          >
            <Stat className="glass" p={6} borderRadius="xl">
              <StatLabel>Active Users</StatLabel>
              <StatNumber>10,000+</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                23.36%
              </StatHelpText>
            </Stat>
            <Stat className="glass" p={6} borderRadius="xl">
              <StatLabel>Goals Achieved</StatLabel>
              <StatNumber>50,000+</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                15.05%
              </StatHelpText>
            </Stat>
            <Stat className="glass" p={6} borderRadius="xl">
              <StatLabel>Total Savings</StatLabel>
              <StatNumber>$5M+</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                45.21%
              </StatHelpText>
            </Stat>
          </SimpleGrid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box bg="gray.50" py={20}>
        <Container maxW="container.xl">
          <Flex 
            direction={{ base: 'column', md: 'row' }} 
            align="center" 
            justify="space-between"
            gap={8}
            className="glass"
            p={8}
            borderRadius="xl"
          >
            <VStack align={{ base: 'center', md: 'start' }} spacing={4} flex={1}>
              <Heading size="xl" className="text-gradient-accent">
                Ready to Start Your Financial Journey?
              </Heading>
              <Text fontSize="lg" color={textColor}>
                Join thousands of users who are already taking control of their finances.
              </Text>
              <HStack spacing={4}>
                <Button 
                  as={Link} 
                  href="/signup" 
                  size="lg" 
                  colorScheme="blue"
                  className="btn-gradient"
                  leftIcon={<FaCheckCircle />}
                >
                  Get Started Now
                </Button>
                <Button 
                  as={Link} 
                  href="/contact" 
                  size="lg" 
                  variant="outline"
                  className="border-gradient"
                  leftIcon={<FaMobileAlt />}
                >
                  Contact Us
                </Button>
              </HStack>
            </VStack>
            <HStack spacing={4} display={{ base: 'none', md: 'flex' }}>
              <IconButton
                aria-label="Security"
                icon={<FaLock />}
                size="lg"
                colorScheme="blue"
                variant="ghost"
              />
              <IconButton
                aria-label="Sync"
                icon={<FaSync />}
                size="lg"
                colorScheme="green"
                variant="ghost"
              />
              <IconButton
                aria-label="Security"
                icon={<FaUserShield />}
                size="lg"
                colorScheme="purple"
                variant="ghost"
              />
            </HStack>
          </Flex>
        </Container>
      </Box>
    </Box>
  )
} 