'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  Button,
  VStack,
  HStack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Select,
  useToast,
  Card,
  CardBody,
  IconButton,
  Text,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Flex,
  Stack,
  useColorModeValue,
  Icon,
} from '@chakra-ui/react';
import { AddIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/hooks/useAuth';
import { Line } from 'react-chartjs-2';
import '@/utils/chartConfig';
import { FiCheck } from 'react-icons/fi';

interface Investment {
  _id: string;
  name: string;
  type: string;
  amount: number;
  purchaseDate: string;
  currentValue: number;
  description: string;
}

export default function Investments() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [editingInvestment, setEditingInvestment] = useState<Investment | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    type: 'stock',
    amount: '',
    purchaseDate: '',
    currentValue: '',
    description: '',
  });
  const { getToken, user } = useAuth();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: '',
  });

  useEffect(() => {
    fetchInvestments();
  }, []);

  const fetchInvestments = async () => {
    try {
      const token = getToken();
      const response = await fetch('http://localhost:5001/api/investments', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setInvestments(data);
    } catch (error) {
      console.error('Error fetching investments:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = getToken();

    try {
      const url = editingInvestment
        ? `http://localhost:5001/api/investments/${editingInvestment._id}`
        : 'http://localhost:5001/api/investments';
      
      const method = editingInvestment ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to save investment');
      }

      toast({
        title: `Investment ${editingInvestment ? 'updated' : 'created'} successfully`,
        status: 'success',
        duration: 3000,
      });

      fetchInvestments();
      onClose();
      resetForm();
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to save investment',
        status: 'error',
        duration: 3000,
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this investment?')) {
      return;
    }

    try {
      const token = getToken();
      const response = await fetch(`http://localhost:5001/api/investments/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete investment');
      }

      toast({
        title: 'Investment deleted successfully',
        status: 'success',
        duration: 3000,
      });

      fetchInvestments();
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to delete investment',
        status: 'error',
        duration: 3000,
      });
    }
  };

  const handleEdit = (investment: Investment) => {
    setEditingInvestment(investment);
    setFormData({
      name: investment.name,
      type: investment.type,
      amount: investment.amount.toString(),
      purchaseDate: new Date(investment.purchaseDate).toISOString().split('T')[0],
      currentValue: investment.currentValue.toString(),
      description: investment.description,
    });
    onOpen();
  };

  const resetForm = () => {
    setEditingInvestment(null);
    setFormData({
      name: '',
      type: 'stock',
      amount: '',
      purchaseDate: '',
      currentValue: '',
      description: '',
    });
  };

  const calculateTotalInvestment = () => {
    return investments.reduce((total, inv) => total + inv.amount, 0);
  };

  const calculateTotalValue = () => {
    return investments.reduce((total, inv) => total + inv.currentValue, 0);
  };

  const calculateReturn = () => {
    const totalInvestment = calculateTotalInvestment();
    const totalValue = calculateTotalValue();
    return ((totalValue - totalInvestment) / totalInvestment) * 100;
  };

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Portfolio Value',
        data: [10000, 12000, 11500, 13000, 14500, 15000],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Portfolio Performance',
      },
    },
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Here you would typically integrate with a payment processor
      // For now, we'll just simulate a successful payment
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Update subscription status
      const token = getToken();
      const response = await fetch('http://localhost:5001/api/users/subscription', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isPro: true }),
      });

      if (!response.ok) {
        throw new Error('Failed to update subscription');
      }

      const result = await response.json();

      if (result.success) {
        toast({
          title: 'Upgrade Successful',
          description: 'You are now a Pro user!',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        onClose();
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to process payment',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!user?.isPro) {
    return (
      <ProtectedRoute>
        <Container maxW="container.xl" py={8}>
          <VStack spacing={8} align="center" textAlign="center">
            <Heading
              as="h1"
              fontSize={{ base: '4xl', sm: '5xl' }}
              bgGradient="linear(to-r, primary.400, primary.600)"
              bgClip="text"
            >
              Unlock Investment Tracking
            </Heading>
            <Text fontSize="xl" color="gray.600" maxW="2xl">
              Upgrade to Pro to access advanced investment tracking features, portfolio analytics, and more.
            </Text>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} w="full">
              <Box
                p={6}
                bg={useColorModeValue('white', 'gray.800')}
                rounded="xl"
                shadow="lg"
                borderWidth="1px"
                borderColor={useColorModeValue('gray.200', 'gray.700')}
              >
                <VStack spacing={4}>
                  <Heading size="md">Basic Plan</Heading>
                  <Text color="gray.500">Current Plan</Text>
                  <List spacing={3}>
                    <ListItem>Basic expense tracking</ListItem>
                    <ListItem>Up to 50 transactions/month</ListItem>
                    <ListItem>Basic analytics</ListItem>
                  </List>
                </VStack>
              </Box>
              <Box
                p={6}
                bg={useColorModeValue('white', 'gray.800')}
                rounded="xl"
                shadow="lg"
                borderWidth="1px"
                borderColor={useColorModeValue('gray.200', 'gray.700')}
                transform="scale(1.05)"
                position="relative"
              >
                <Badge
                  position="absolute"
                  top={4}
                  right={4}
                  colorScheme="blue"
                  px={3}
                  py={1}
                  rounded="md"
                >
                  Recommended
                </Badge>
                <VStack spacing={4}>
                  <Heading size="md">Pro Plan</Heading>
                  <Text fontSize="2xl" fontWeight="bold">
                    $9.99<Text as="span" fontSize="md" fontWeight="normal">/month</Text>
                  </Text>
                  <List spacing={3}>
                    <ListItem>Unlimited transactions</ListItem>
                    <ListItem>Investment tracking</ListItem>
                    <ListItem>Advanced analytics</ListItem>
                    <ListItem>Portfolio management</ListItem>
                    <ListItem>Export reports</ListItem>
                  </List>
                  <Button
                    w="full"
                    colorScheme="blue"
                    onClick={onOpen}
                    size="lg"
                  >
                    Upgrade to Pro
                  </Button>
                </VStack>
              </Box>
              <Box
                p={6}
                bg={useColorModeValue('white', 'gray.800')}
                rounded="xl"
                shadow="lg"
                borderWidth="1px"
                borderColor={useColorModeValue('gray.200', 'gray.700')}
              >
                <VStack spacing={4}>
                  <Heading size="md">Enterprise</Heading>
                  <Text fontSize="2xl" fontWeight="bold">
                    $29.99<Text as="span" fontSize="md" fontWeight="normal">/month</Text>
                  </Text>
                  <List spacing={3}>
                    <ListItem>All Pro features</ListItem>
                    <ListItem>Team collaboration</ListItem>
                    <ListItem>API access</ListItem>
                    <ListItem>Custom reports</ListItem>
                    <ListItem>Dedicated support</ListItem>
                  </List>
                  <Button
                    w="full"
                    variant="outline"
                    colorScheme="blue"
                  >
                    Contact Sales
                  </Button>
                </VStack>
              </Box>
            </SimpleGrid>
          </VStack>

          {/* Payment Modal */}
          <Modal isOpen={isOpen} onClose={onClose} size="md">
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Upgrade to Pro</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <form onSubmit={handlePaymentSubmit}>
                  <VStack spacing={4}>
                    <FormControl isRequired>
                      <FormLabel>Card Number</FormLabel>
                      <Input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        value={paymentDetails.cardNumber}
                        onChange={(e) => setPaymentDetails({
                          ...paymentDetails,
                          cardNumber: e.target.value
                        })}
                      />
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel>Name on Card</FormLabel>
                      <Input
                        type="text"
                        placeholder="John Doe"
                        value={paymentDetails.name}
                        onChange={(e) => setPaymentDetails({
                          ...paymentDetails,
                          name: e.target.value
                        })}
                      />
                    </FormControl>
                    <Flex gap={4} w="full">
                      <FormControl isRequired>
                        <FormLabel>Expiry Date</FormLabel>
                        <Input
                          type="text"
                          placeholder="MM/YY"
                          value={paymentDetails.expiryDate}
                          onChange={(e) => setPaymentDetails({
                            ...paymentDetails,
                            expiryDate: e.target.value
                          })}
                        />
                      </FormControl>
                      <FormControl isRequired>
                        <FormLabel>CVV</FormLabel>
                        <Input
                          type="text"
                          placeholder="123"
                          value={paymentDetails.cvv}
                          onChange={(e) => setPaymentDetails({
                            ...paymentDetails,
                            cvv: e.target.value
                          })}
                        />
                      </FormControl>
                    </Flex>
                    <Button
                      type="submit"
                      colorScheme="blue"
                      w="full"
                      isLoading={isLoading}
                    >
                      Complete Payment
                    </Button>
                  </VStack>
                </form>
              </ModalBody>
            </ModalContent>
          </Modal>
        </Container>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <Container maxW="container.xl" py={8}>
        <HStack justify="space-between" mb={6}>
          <Heading>Investment Portfolio</Heading>
          <Button
            leftIcon={<AddIcon />}
            bg="linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)"
            color="white"
            _hover={{
              bg: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
              transform: "translateY(-2px)",
              boxShadow: "0 4px 12px rgba(37, 99, 235, 0.3)",
            }}
            _active={{
              transform: "translateY(0)",
              boxShadow: "none",
            }}
            transition="all 0.2s"
            onClick={onOpen}
          >
            Add Investment
          </Button>
        </HStack>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={8}>
          <Card>
            <CardBody>
              <Stat>
                <StatLabel color="gray.600" fontWeight="medium">Total Investment</StatLabel>
                <StatNumber color="blue.600">${calculateTotalInvestment().toLocaleString()}</StatNumber>
              </Stat>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <Stat>
                <StatLabel color="gray.600" fontWeight="medium">Current Value</StatLabel>
                <StatNumber color="blue.600">${calculateTotalValue().toLocaleString()}</StatNumber>
              </Stat>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <Stat>
                <StatLabel color="gray.600" fontWeight="medium">Total Return</StatLabel>
                <StatNumber color={calculateReturn() >= 0 ? "green.500" : "red.500"}>
                  {calculateReturn().toFixed(2)}%
                </StatNumber>
                <StatHelpText>
                  <StatArrow type={calculateReturn() >= 0 ? 'increase' : 'decrease'} />
                  ${(calculateTotalValue() - calculateTotalInvestment()).toLocaleString()}
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        </SimpleGrid>

        <Box mb={8} p={6} bg="white" borderRadius="lg" boxShadow="sm">
          <Line options={chartOptions} data={chartData} />
        </Box>

        <Box overflowX="auto">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Type</Th>
                <Th isNumeric>Investment</Th>
                <Th isNumeric>Current Value</Th>
                <Th isNumeric>Return</Th>
                <Th>Purchase Date</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {investments.map((investment) => {
                const returnPercentage =
                  ((investment.currentValue - investment.amount) / investment.amount) * 100;
                return (
                  <Tr key={investment._id}>
                    <Td>{investment.name}</Td>
                    <Td>
                      <Badge
                        colorScheme={
                          investment.type === 'stock'
                            ? 'blue'
                            : investment.type === 'bond'
                            ? 'green'
                            : investment.type === 'mutual_fund'
                            ? 'purple'
                            : investment.type === 'real_estate'
                            ? 'orange'
                            : investment.type === 'crypto'
                            ? 'pink'
                            : 'gray'
                        }
                      >
                        {investment.type.replace('_', ' ')}
                      </Badge>
                    </Td>
                    <Td isNumeric>${investment.amount.toLocaleString()}</Td>
                    <Td isNumeric>${investment.currentValue.toLocaleString()}</Td>
                    <Td isNumeric>
                      <Text color={returnPercentage >= 0 ? 'green.500' : 'red.500'}>
                        {returnPercentage.toFixed(2)}%
                      </Text>
                    </Td>
                    <Td>{new Date(investment.purchaseDate).toLocaleDateString()}</Td>
                    <Td>
                      <HStack spacing={2}>
                        <IconButton
                          aria-label="Edit investment"
                          icon={<EditIcon />}
                          size="sm"
                          bg="gray.100"
                          _hover={{
                            bg: "gray.200",
                            transform: "translateY(-1px)",
                          }}
                          onClick={() => handleEdit(investment)}
                        />
                        <IconButton
                          aria-label="Delete investment"
                          icon={<DeleteIcon />}
                          size="sm"
                          bg="red.50"
                          color="red.500"
                          _hover={{
                            bg: "red.100",
                            transform: "translateY(-1px)",
                          }}
                          onClick={() => handleDelete(investment._id)}
                        />
                      </HStack>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </Box>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay 
            bg="blackAlpha.300"
            backdropFilter="blur(10px)"
          />
          <ModalContent
            bg="white"
            boxShadow="xl"
            borderRadius="xl"
            p={4}
          >
            <ModalHeader
              bg="linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)"
              color="white"
              margin="-16px -16px 16px -16px"
              padding="16px"
              borderTopRadius="xl"
              fontSize="xl"
              fontWeight="bold"
            >
              {editingInvestment ? 'Edit Investment' : 'Add New Investment'}
            </ModalHeader>
            <ModalCloseButton color="white" />
            <ModalBody>
              <form onSubmit={handleSubmit}>
                <FormControl mb={4}>
                  <FormLabel fontWeight="medium" color="gray.700">Investment Name</FormLabel>
                  <Input
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    bg="white"
                    borderColor="gray.300"
                    _hover={{ borderColor: "gray.400" }}
                    _focus={{ 
                      borderColor: "blue.500",
                      boxShadow: "0 0 0 1px #3b82f6"
                    }}
                    required
                  />
                </FormControl>

                <FormControl mb={4}>
                  <FormLabel fontWeight="medium" color="gray.700">Type</FormLabel>
                  <Select
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value })
                    }
                    bg="white"
                    borderColor="gray.300"
                    _hover={{ borderColor: "gray.400" }}
                    _focus={{ 
                      borderColor: "blue.500",
                      boxShadow: "0 0 0 1px #3b82f6"
                    }}
                  >
                    <option value="stock" style={{color: '#3B82F6'}}>Stock</option>
                    <option value="bond" style={{color: '#10B981'}}>Bond</option>
                    <option value="mutual_fund" style={{color: '#8B5CF6'}}>Mutual Fund</option>
                    <option value="real_estate" style={{color: '#F97316'}}>Real Estate</option>
                    <option value="crypto" style={{color: '#EC4899'}}>Cryptocurrency</option>
                    <option value="other" style={{color: '#6B7280'}}>Other</option>
                  </Select>
                </FormControl>

                <FormControl mb={4}>
                  <FormLabel fontWeight="medium" color="gray.700">Investment Amount</FormLabel>
                  <Input
                    type="number"
                    value={formData.amount}
                    onChange={(e) =>
                      setFormData({ ...formData, amount: e.target.value })
                    }
                    bg="white"
                    borderColor="gray.300"
                    _hover={{ borderColor: "gray.400" }}
                    _focus={{ 
                      borderColor: "blue.500",
                      boxShadow: "0 0 0 1px #3b82f6"
                    }}
                    required
                  />
                </FormControl>

                <FormControl mb={4}>
                  <FormLabel fontWeight="medium" color="gray.700">Current Value</FormLabel>
                  <Input
                    type="number"
                    value={formData.currentValue}
                    onChange={(e) =>
                      setFormData({ ...formData, currentValue: e.target.value })
                    }
                    bg="white"
                    borderColor="gray.300"
                    _hover={{ borderColor: "gray.400" }}
                    _focus={{ 
                      borderColor: "blue.500",
                      boxShadow: "0 0 0 1px #3b82f6"
                    }}
                    required
                  />
                </FormControl>

                <FormControl mb={4}>
                  <FormLabel fontWeight="medium" color="gray.700">Purchase Date</FormLabel>
                  <Input
                    type="date"
                    value={formData.purchaseDate}
                    onChange={(e) =>
                      setFormData({ ...formData, purchaseDate: e.target.value })
                    }
                    bg="white"
                    borderColor="gray.300"
                    _hover={{ borderColor: "gray.400" }}
                    _focus={{ 
                      borderColor: "blue.500",
                      boxShadow: "0 0 0 1px #3b82f6"
                    }}
                    required
                  />
                </FormControl>

                <FormControl mb={6}>
                  <FormLabel fontWeight="medium" color="gray.700">Description</FormLabel>
                  <Input
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    bg="white"
                    borderColor="gray.300"
                    _hover={{ borderColor: "gray.400" }}
                    _focus={{ 
                      borderColor: "blue.500",
                      boxShadow: "0 0 0 1px #3b82f6"
                    }}
                  />
                </FormControl>

                <HStack spacing={3} justify="flex-end">
                  <Button 
                    onClick={onClose}
                    variant="outline"
                    color="gray.600"
                    borderColor="gray.300"
                    _hover={{
                      bg: "gray.50",
                      borderColor: "gray.400"
                    }}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit"
                    bg="linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)"
                    color="white"
                    _hover={{
                      bg: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                      transform: "translateY(-1px)",
                      boxShadow: "0 4px 12px rgba(37, 99, 235, 0.3)",
                    }}
                    _active={{
                      transform: "translateY(0)",
                      boxShadow: "none",
                    }}
                    transition="all 0.2s"
                  >
                    {editingInvestment ? 'Update' : 'Create'}
                  </Button>
                </HStack>
              </form>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Container>
    </ProtectedRoute>
  );
}

interface ListProps {
  children: React.ReactNode;
  spacing?: number;
}

const List: React.FC<ListProps> = ({ children, spacing = 3 }) => {
  return (
    <VStack align="start" spacing={spacing}>
      {children}
    </VStack>
  );
};

interface ListItemProps {
  children: React.ReactNode;
}

const ListItem: React.FC<ListItemProps> = ({ children }) => {
  return (
    <HStack spacing={2}>
      <Icon as={FiCheck} color="green.500" />
      <Text>{children}</Text>
    </HStack>
  );
}; 