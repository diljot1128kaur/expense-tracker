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
  Progress,
  Select,
  Icon,
  useColorModeValue,
  Badge,
  Image,
  Flex,
  Tag,
  TagLabel,
  TagLeftIcon,
} from '@chakra-ui/react';
import { FiPlus, FiTrash2, FiEdit2, FiTarget, FiDollarSign, FiCalendar, FiGift, FiAward, FiStar } from 'react-icons/fi';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/hooks/useAuth';

interface FinancialGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
  completed?: boolean;
  completedDate?: string;
}

interface Reward {
  id: string;
  name: string;
  description: string;
  type: 'coupon' | 'cashback' | 'premium' | 'discount';
  value: string;
  expiryDate: string;
  requirements: string;
  icon: string;
}

export default function Goals() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [goals, setGoals] = useState<FinancialGoal[]>([
    {
      id: '1',
      name: 'Emergency Fund',
      targetAmount: 10000,
      currentAmount: 8000,
      deadline: '2024-12-31',
      category: 'Savings',
      priority: 'high',
    },
    {
      id: '2',
      name: 'New Car',
      targetAmount: 25000,
      currentAmount: 15000,
      deadline: '2025-06-30',
      category: 'Vehicle',
      priority: 'medium',
    },
    {
      id: '3',
      name: 'Vacation Fund',
      targetAmount: 5000,
      currentAmount: 2000,
      deadline: '2024-08-31',
      category: 'Travel',
      priority: 'low',
    },
  ]);

  const [rewards, setRewards] = useState<Reward[]>([
    {
      id: '1',
      name: 'Premium Subscription',
      description: '1 month free access to premium features',
      type: 'premium',
      value: 'Free Month',
      expiryDate: '2024-12-31',
      requirements: 'Complete any high-priority goal',
      icon: 'FiStar',
    },
    {
      id: '2',
      name: 'Cashback Bonus',
      description: '5% cashback on next investment',
      type: 'cashback',
      value: '5% Cashback',
      expiryDate: '2024-12-31',
      requirements: 'Complete 3 goals',
      icon: 'FiDollarSign',
    },
    {
      id: '3',
      name: 'Shopping Discount',
      description: '20% off on financial tools and courses',
      type: 'discount',
      value: '20% OFF',
      expiryDate: '2024-12-31',
      requirements: 'Complete any goal before deadline',
      icon: 'FiGift',
    },
  ]);

  const [newGoal, setNewGoal] = useState({
    name: '',
    targetAmount: '',
    currentAmount: '',
    deadline: '',
    category: '',
    priority: 'medium',
  });

  const toast = useToast();
  const bgColor = useColorModeValue('white', 'gray.800');

  const handleAddGoal = () => {
    if (!newGoal.name || !newGoal.targetAmount || !newGoal.deadline || !newGoal.category) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields',
        status: 'error',
        duration: 3000,
      });
      return;
    }

    const goal: FinancialGoal = {
      id: Date.now().toString(),
      name: newGoal.name,
      targetAmount: Number(newGoal.targetAmount),
      currentAmount: Number(newGoal.currentAmount) || 0,
      deadline: newGoal.deadline,
      category: newGoal.category,
      priority: newGoal.priority as 'high' | 'medium' | 'low',
    };

    setGoals([...goals, goal]);
    setNewGoal({
      name: '',
      targetAmount: '',
      currentAmount: '',
      deadline: '',
      category: '',
      priority: 'medium',
    });
    onClose();
  };

  const handleDeleteGoal = (id: string) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'red.500';
      case 'medium':
        return 'orange.500';
      case 'low':
        return 'green.500';
      default:
        return 'gray.500';
    }
  };

  const handleGoalCompletion = (goalId: string) => {
    setGoals(goals.map(goal => {
      if (goal.id === goalId) {
        const completed = goal.currentAmount >= goal.targetAmount;
        return {
          ...goal,
          completed,
          completedDate: completed ? new Date().toISOString() : undefined
        };
      }
      return goal;
    }));

    // Check for eligible rewards
    const completedGoals = goals.filter(g => g.completed).length;
    const eligibleRewards = rewards.filter(reward => {
      if (reward.requirements.includes('high-priority')) {
        return goals.some(g => g.priority === 'high' && g.completed);
      }
      if (reward.requirements.includes('3 goals')) {
        return completedGoals >= 3;
      }
      return true;
    });

    if (eligibleRewards.length > 0) {
      toast({
        title: 'Congratulations! 🎉',
        description: 'You\'ve earned new rewards for completing your goals!',
        status: 'success',
        duration: 5000,
      });
    }
  };

  return (
    <ProtectedRoute>
      <Container maxW="container.xl" py={8}>
        <VStack spacing={8} align="stretch">
          <HStack justify="space-between">
            <Box>
              <Heading size="lg">Financial Goals</Heading>
              <Text color="gray.600">Track and manage your financial objectives</Text>
            </Box>
            <Button
              leftIcon={<Icon as={FiPlus} />}
              colorScheme="blue"
              onClick={onOpen}
            >
              Add New Goal
            </Button>
          </HStack>

          {/* Goals Overview */}
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            <Card bg={bgColor}>
              <CardBody>
                <VStack align="start" spacing={2}>
                  <HStack>
                    <Icon as={FiTarget} color="blue.500" />
                    <Text fontWeight="bold">Total Goals</Text>
                  </HStack>
                  <Text fontSize="2xl">{goals.length}</Text>
                </VStack>
              </CardBody>
            </Card>
            <Card bg={bgColor}>
              <CardBody>
                <VStack align="start" spacing={2}>
                  <HStack>
                    <Icon as={FiDollarSign} color="green.500" />
                    <Text fontWeight="bold">Total Target</Text>
                  </HStack>
                  <Text fontSize="2xl">
                    ${goals.reduce((sum, goal) => sum + goal.targetAmount, 0).toLocaleString()}
                  </Text>
                </VStack>
              </CardBody>
            </Card>
            <Card bg={bgColor}>
              <CardBody>
                <VStack align="start" spacing={2}>
                  <HStack>
                    <Icon as={FiCalendar} color="purple.500" />
                    <Text fontWeight="bold">Active Goals</Text>
                  </HStack>
                  <Text fontSize="2xl">
                    {goals.filter(goal => new Date(goal.deadline) > new Date()).length}
                  </Text>
                </VStack>
              </CardBody>
            </Card>
          </SimpleGrid>

          {/* Rewards Section */}
          <Card bg={bgColor}>
            <CardBody>
              <VStack align="stretch" spacing={6}>
                <HStack>
                  <Icon as={FiGift} boxSize={5} color="purple.500" />
                  <Heading size="md">Available Rewards</Heading>
                </HStack>
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
                  {rewards.map((reward) => (
                    <Card key={reward.id} variant="outline">
                      <CardBody>
                        <VStack align="stretch" spacing={3}>
                          <HStack>
                            <Icon as={FiGift} color="purple.500" />
                            <Heading size="sm">{reward.name}</Heading>
                          </HStack>
                          <Text fontSize="sm" color="gray.600">
                            {reward.description}
                          </Text>
                          <Badge
                            colorScheme={
                              reward.type === 'premium' ? 'purple' :
                              reward.type === 'cashback' ? 'green' :
                              reward.type === 'discount' ? 'blue' : 'gray'
                            }
                          >
                            {reward.value}
                          </Badge>
                          <Text fontSize="xs" color="gray.500">
                            Expires: {new Date(reward.expiryDate).toLocaleDateString()}
                          </Text>
                          <Tag size="sm" variant="subtle" colorScheme="blue">
                            <TagLeftIcon as={FiTarget} />
                            <TagLabel>{reward.requirements}</TagLabel>
                          </Tag>
                        </VStack>
                      </CardBody>
                    </Card>
                  ))}
                </SimpleGrid>
              </VStack>
            </CardBody>
          </Card>

          {/* Goals List */}
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            {goals.map((goal) => (
              <Card key={goal.id} bg={bgColor}>
                <CardBody>
                  <VStack align="stretch" spacing={4}>
                    <HStack justify="space-between">
                      <Heading size="md">{goal.name}</Heading>
                      <HStack>
                        {goal.completed && (
                          <Badge colorScheme="green">Completed</Badge>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          leftIcon={<Icon as={FiEdit2} />}
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          colorScheme="red"
                          leftIcon={<Icon as={FiTrash2} />}
                          onClick={() => handleDeleteGoal(goal.id)}
                        >
                          Delete
                        </Button>
                      </HStack>
                    </HStack>
                    <HStack justify="space-between">
                      <Text>Category: {goal.category}</Text>
                      <Text color={getPriorityColor(goal.priority)}>
                        Priority: {goal.priority}
                      </Text>
                    </HStack>
                    <HStack justify="space-between">
                      <Text>Target: ${goal.targetAmount.toLocaleString()}</Text>
                      <Text>Current: ${goal.currentAmount.toLocaleString()}</Text>
                    </HStack>
                    <Progress
                      value={(goal.currentAmount / goal.targetAmount) * 100}
                      colorScheme={goal.currentAmount >= goal.targetAmount ? 'green' : 'blue'}
                    />
                    <HStack justify="space-between">
                      <Text>Deadline: {new Date(goal.deadline).toLocaleDateString()}</Text>
                      <Text
                        color={goal.currentAmount >= goal.targetAmount ? 'green.500' : 'blue.500'}
                        fontWeight="bold"
                      >
                        {Math.round((goal.currentAmount / goal.targetAmount) * 100)}% Complete
                      </Text>
                    </HStack>
                    {goal.currentAmount >= goal.targetAmount && !goal.completed && (
                      <Button
                        colorScheme="green"
                        onClick={() => handleGoalCompletion(goal.id)}
                      >
                        Claim Completion Reward
                      </Button>
                    )}
                  </VStack>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
        </VStack>

        {/* Add Goal Modal */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add New Financial Goal</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Goal Name</FormLabel>
                  <Input
                    value={newGoal.name}
                    onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
                    placeholder="e.g., Emergency Fund"
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Target Amount</FormLabel>
                  <Input
                    type="number"
                    value={newGoal.targetAmount}
                    onChange={(e) => setNewGoal({ ...newGoal, targetAmount: e.target.value })}
                    placeholder="e.g., 10000"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Current Amount</FormLabel>
                  <Input
                    type="number"
                    value={newGoal.currentAmount}
                    onChange={(e) => setNewGoal({ ...newGoal, currentAmount: e.target.value })}
                    placeholder="e.g., 5000"
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Deadline</FormLabel>
                  <Input
                    type="date"
                    value={newGoal.deadline}
                    onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Category</FormLabel>
                  <Select
                    value={newGoal.category}
                    onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value })}
                  >
                    <option value="">Select a category</option>
                    <option value="Savings">Savings</option>
                    <option value="Vehicle">Vehicle</option>
                    <option value="Travel">Travel</option>
                    <option value="Education">Education</option>
                    <option value="Home">Home</option>
                    <option value="Other">Other</option>
                  </Select>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Priority</FormLabel>
                  <Select
                    value={newGoal.priority}
                    onChange={(e) => setNewGoal({ ...newGoal, priority: e.target.value })}
                  >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </Select>
                </FormControl>
                <Button colorScheme="blue" onClick={handleAddGoal} w="full">
                  Add Goal
                </Button>
              </VStack>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Container>
    </ProtectedRoute>
  );
}
