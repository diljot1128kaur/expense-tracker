'use client';

import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Card,
  CardBody,
  Select,
  SimpleGrid,
  useColorModeValue,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Icon,
} from '@chakra-ui/react';
import { FiTrendingUp, FiTrendingDown, FiDollarSign, FiPieChart } from 'react-icons/fi';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import ProtectedRoute from '@/components/ProtectedRoute';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function Reports() {
  const bgColor = useColorModeValue('white', 'gray.800');

  // Sample data - replace with real data from your backend
  const monthlyIncome = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Income',
        data: [5000, 5500, 5200, 5800, 5600, 6000],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const monthlyExpenses = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Expenses',
        data: [3000, 3200, 3100, 3300, 3250, 3400],
        borderColor: 'rgb(255, 99, 132)',
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

  const savingsTrend = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Savings',
        data: [2000, 2300, 2100, 2500, 2350, 2600],
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  };

  return (
    <ProtectedRoute>
      <Container maxW="container.xl" py={8}>
        <VStack spacing={8} align="stretch">
          <Box>
            <Heading size="lg">Financial Reports</Heading>
            <Text color="gray.600">Comprehensive analysis of your financial data</Text>
          </Box>

          {/* Quick Stats */}
          <SimpleGrid columns={{ base: 1, md: 4 }} spacing={6}>
            <Card bg={bgColor}>
              <CardBody>
                <VStack align="start" spacing={2}>
                  <HStack>
                    <Icon as={FiTrendingUp} color="green.500" />
                    <Text fontWeight="bold">Monthly Income</Text>
                  </HStack>
                  <Text fontSize="2xl">$5,800</Text>
                  <Text color="green.500">+5.2% from last month</Text>
                </VStack>
              </CardBody>
            </Card>
            <Card bg={bgColor}>
              <CardBody>
                <VStack align="start" spacing={2}>
                  <HStack>
                    <Icon as={FiTrendingDown} color="red.500" />
                    <Text fontWeight="bold">Monthly Expenses</Text>
                  </HStack>
                  <Text fontSize="2xl">$3,300</Text>
                  <Text color="red.500">+3.1% from last month</Text>
                </VStack>
              </CardBody>
            </Card>
            <Card bg={bgColor}>
              <CardBody>
                <VStack align="start" spacing={2}>
                  <HStack>
                    <Icon as={FiDollarSign} color="blue.500" />
                    <Text fontWeight="bold">Monthly Savings</Text>
                  </HStack>
                  <Text fontSize="2xl">$2,500</Text>
                  <Text color="green.500">+8.7% from last month</Text>
                </VStack>
              </CardBody>
            </Card>
            <Card bg={bgColor}>
              <CardBody>
                <VStack align="start" spacing={2}>
                  <HStack>
                    <Icon as={FiPieChart} color="purple.500" />
                    <Text fontWeight="bold">Savings Rate</Text>
                  </HStack>
                  <Text fontSize="2xl">43.1%</Text>
                  <Text color="green.500">+2.3% from last month</Text>
                </VStack>
              </CardBody>
            </Card>
          </SimpleGrid>

          {/* Detailed Reports */}
          <Tabs variant="enclosed">
            <TabList>
              <Tab>Income & Expenses</Tab>
              <Tab>Spending Analysis</Tab>
              <Tab>Savings Trends</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                  <Card bg={bgColor}>
                    <CardBody>
                      <Heading size="md" mb={4}>Monthly Income Trend</Heading>
                      <Line data={monthlyIncome} />
                    </CardBody>
                  </Card>
                  <Card bg={bgColor}>
                    <CardBody>
                      <Heading size="md" mb={4}>Monthly Expenses Trend</Heading>
                      <Line data={monthlyExpenses} />
                    </CardBody>
                  </Card>
                </SimpleGrid>
              </TabPanel>

              <TabPanel>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                  <Card bg={bgColor}>
                    <CardBody>
                      <Heading size="md" mb={4}>Spending by Category</Heading>
                      <Doughnut data={spendingByCategory} />
                    </CardBody>
                  </Card>
                  <Card bg={bgColor}>
                    <CardBody>
                      <Heading size="md" mb={4}>Category Breakdown</Heading>
                      <VStack align="stretch" spacing={4}>
                        <HStack justify="space-between">
                          <Text>Housing</Text>
                          <Text fontWeight="bold">40%</Text>
                        </HStack>
                        <HStack justify="space-between">
                          <Text>Food</Text>
                          <Text fontWeight="bold">25%</Text>
                        </HStack>
                        <HStack justify="space-between">
                          <Text>Transport</Text>
                          <Text fontWeight="bold">15%</Text>
                        </HStack>
                        <HStack justify="space-between">
                          <Text>Entertainment</Text>
                          <Text fontWeight="bold">10%</Text>
                        </HStack>
                        <HStack justify="space-between">
                          <Text>Utilities</Text>
                          <Text fontWeight="bold">10%</Text>
                        </HStack>
                      </VStack>
                    </CardBody>
                  </Card>
                </SimpleGrid>
              </TabPanel>

              <TabPanel>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                  <Card bg={bgColor}>
                    <CardBody>
                      <Heading size="md" mb={4}>Savings Trend</Heading>
                      <Bar data={savingsTrend} />
                    </CardBody>
                  </Card>
                  <Card bg={bgColor}>
                    <CardBody>
                      <Heading size="md" mb={4}>Savings Insights</Heading>
                      <VStack align="stretch" spacing={4}>
                        <Box>
                          <Text fontWeight="bold">Average Monthly Savings</Text>
                          <Text fontSize="xl">$2,308</Text>
                        </Box>
                        <Box>
                          <Text fontWeight="bold">Highest Savings Month</Text>
                          <Text fontSize="xl">June - $2,600</Text>
                        </Box>
                        <Box>
                          <Text fontWeight="bold">Savings Growth Rate</Text>
                          <Text fontSize="xl">+8.7% monthly</Text>
                        </Box>
                        <Box>
                          <Text fontWeight="bold">Projected Annual Savings</Text>
                          <Text fontSize="xl">$27,696</Text>
                        </Box>
                      </VStack>
                    </CardBody>
                  </Card>
                </SimpleGrid>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </VStack>
      </Container>
    </ProtectedRoute>
  );
} 