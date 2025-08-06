'use client';

import {
  Box,
  Container,
  Grid,
  Heading,
  Text,
  VStack,
  HStack,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Card,
  CardBody,
  Progress,
  Icon,
  SimpleGrid,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiTrendingUp, FiDollarSign, FiTarget, FiAlertCircle } from 'react-icons/fi';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/hooks/useAuth';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function Dashboard() {
  const { user } = useAuth();
  const bgColor = useColorModeValue('white', 'gray.800');

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  // Sample data - replace with real data from your backend
  const monthlySpending = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Spending',
        data: [3000, 3500, 3200, 3800, 3600, 4000],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const spendingByCategory = {
    labels: ['Housing', 'Food', 'Transport', 'Entertainment', 'Utilities'],
    datasets: [
      {
        data: [40, 25, 15, 10, 10],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
        ],
      },
    ],
  };

  return (
    <ProtectedRoute>
      <Container maxW="container.xl" py={8}>
        <VStack spacing={8} align="stretch">
          {/* Welcome Section */}
          <Box>
            <Heading size="lg">Welcome back, {user?.name}!</Heading>
            <Text color="gray.600">Here's your financial overview</Text>
          </Box>

          {/* Quick Stats */}
          <SimpleGrid columns={{ base: 1, md: 4 }} spacing={6}>
            <Card bg={bgColor}>
              <CardBody>
                <Stat>
                  <StatLabel>Total Balance</StatLabel>
                  <StatNumber>$12,345</StatNumber>
                  <StatHelpText>
                    <StatArrow type="increase" />
                    23.36%
                  </StatHelpText>
                </Stat>
              </CardBody>
            </Card>
            <Card bg={bgColor}>
              <CardBody>
                <Stat>
                  <StatLabel>Monthly Savings</StatLabel>
                  <StatNumber>$1,234</StatNumber>
                  <StatHelpText>
                    <StatArrow type="increase" />
                    12.5%
                  </StatHelpText>
                </Stat>
              </CardBody>
            </Card>
            <Card bg={bgColor}>
              <CardBody>
                <Stat>
                  <StatLabel>Investment Returns</StatLabel>
                  <StatNumber>$567</StatNumber>
                  <StatHelpText>
                    <StatArrow type="increase" />
                    8.2%
                  </StatHelpText>
                </Stat>
              </CardBody>
            </Card>
            <Card bg={bgColor}>
              <CardBody>
                <Stat>
                  <StatLabel>Budget Status</StatLabel>
                  <StatNumber>85%</StatNumber>
                  <StatHelpText>
                    <StatArrow type="decrease" />
                    15% remaining
                  </StatHelpText>
                </Stat>
              </CardBody>
            </Card>
          </SimpleGrid>

          {/* Charts Section */}
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            <Card bg={bgColor}>
              <CardBody>
                <Heading size="md" mb={4}>Monthly Spending</Heading>
                <Box height="300px">
                  <Line data={monthlySpending} options={chartOptions} />
                </Box>
              </CardBody>
            </Card>
            <Card bg={bgColor}>
              <CardBody>
                <Heading size="md" mb={4}>Spending by Category</Heading>
                <Box height="300px">
                  <Doughnut data={spendingByCategory} options={chartOptions} />
                </Box>
              </CardBody>
            </Card>
          </SimpleGrid>

          {/* Goals Progress */}
          <Card bg={bgColor}>
            <CardBody>
              <Heading size="md" mb={4}>Financial Goals</Heading>
              <VStack spacing={4} align="stretch">
                <Box>
                  <HStack justify="space-between" mb={2}>
                    <Text>Emergency Fund</Text>
                    <Text>$8,000 / $10,000</Text>
                  </HStack>
                  <Progress value={80} colorScheme="green" />
                </Box>
                <Box>
                  <HStack justify="space-between" mb={2}>
                    <Text>Vacation Fund</Text>
                    <Text>$2,000 / $5,000</Text>
                  </HStack>
                  <Progress value={40} colorScheme="blue" />
                </Box>
                <Box>
                  <HStack justify="space-between" mb={2}>
                    <Text>New Car Fund</Text>
                    <Text>$15,000 / $30,000</Text>
                  </HStack>
                  <Progress value={50} colorScheme="purple" />
                </Box>
              </VStack>
            </CardBody>
          </Card>

          {/* Insights and Recommendations */}
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            <Card bg={bgColor}>
              <CardBody>
                <Heading size="md" mb={4}>Smart Insights</Heading>
                <VStack spacing={4} align="stretch">
                  <HStack>
                    <Icon as={FiTrendingUp} color="green.500" />
                    <Text>Your savings rate has increased by 15% this month</Text>
                  </HStack>
                  <HStack>
                    <Icon as={FiDollarSign} color="blue.500" />
                    <Text>You're on track to reach your emergency fund goal in 2 months</Text>
                  </HStack>
                  <HStack>
                    <Icon as={FiTarget} color="purple.500" />
                    <Text>Consider increasing your investment contributions</Text>
                  </HStack>
                </VStack>
              </CardBody>
            </Card>
            <Card bg={bgColor}>
              <CardBody>
                <Heading size="md" mb={4}>Alerts & Notifications</Heading>
                <VStack spacing={4} align="stretch">
                  <HStack>
                    <Icon as={FiAlertCircle} color="orange.500" />
                    <Text>Your entertainment spending is 20% above budget</Text>
                  </HStack>
                  <HStack>
                    <Icon as={FiAlertCircle} color="red.500" />
                    <Text>Upcoming bill payment: Netflix - $15.99</Text>
                  </HStack>
                  <HStack>
                    <Icon as={FiAlertCircle} color="green.500" />
                    <Text>Investment dividend received: $45.67</Text>
                  </HStack>
                </VStack>
              </CardBody>
            </Card>
          </SimpleGrid>
        </VStack>
      </Container>
    </ProtectedRoute>
  );
} 