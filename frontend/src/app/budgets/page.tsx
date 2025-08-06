// 'use client';

// import {
//   Box,
//   Container,
//   Heading,
//   Button,
//   VStack,
//   HStack,
//   Text,
//   Progress,
//   SimpleGrid,
//   useDisclosure,
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalBody,
//   ModalCloseButton,
//   FormControl,
//   FormLabel,
//   Input,
//   Select,
//   useToast,
//   Card,
//   CardBody,
//   Icon,
//   Flex,
// } from '@chakra-ui/react';
// import { useState, useEffect } from 'react';
// import { FiPlus, FiDollarSign, FiShoppingBag, FiHome, FiCar, FiCoffee, FiHeart, FiBook } from 'react-icons/fi';
// import ProtectedRoute from '@/components/ProtectedRoute';
// import { useAuth } from '@/hooks/useAuth';

// interface Budget {
//   id: string;
//   category: string;
//   amount: number;
//   spent: number;
//   icon: any;
//   color: string;
// }

// const defaultCategories = [
//   { name: 'Shopping', icon: FiShoppingBag, color: 'blue.400' },
//   { name: 'Housing', icon: FiHome, color: 'green.400' },
//   { name: 'Transportation', icon: FiCar, color: 'purple.400' },
//   { name: 'Food & Dining', icon: FiCoffee, color: 'orange.400' },
//   { name: 'Healthcare', icon: FiHeart, color: 'red.400' },
//   { name: 'Education', icon: FiBook, color: 'teal.400' },
// ];

// export default function Budgets() {
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const [budgets, setBudgets] = useState<Budget[]>([]);
//   const [newBudget, setNewBudget] = useState({ category: '', amount: '' });
//   const toast = useToast();
//   const { user } = useAuth();

//   // Simulated data - Replace with actual API calls
//   useEffect(() => {
//     // Simulated budget data
//     setBudgets([
//       {
//         id: '1',
//         category: 'Shopping',
//         amount: 500,
//         spent: 350,
//         icon: FiShoppingBag,
//         color: 'blue.400',
//       },
//       {
//         id: '2',
//         category: 'Housing',
//         amount: 1500,
//         spent: 1500,
//         icon: FiHome,
//         color: 'green.400',
//       },
//       // Add more sample budgets
//     ]);
//   }, []);

//   const handleAddBudget = () => {
//     if (!newBudget.category || !newBudget.amount) {
//       toast({
//         title: 'Error',
//         description: 'Please fill in all fields',
//         status: 'error',
//         duration: 3000,
//         isClosable: true,
//       });
//       return;
//     }

//     const categoryInfo = defaultCategories.find(cat => cat.name === newBudget.category);
    
//     const budget: Budget = {
//       id: Date.now().toString(),
//       category: newBudget.category,
//       amount: parseFloat(newBudget.amount),
//       spent: 0,
//       icon: categoryInfo?.icon || FiDollarSign,
//       color: categoryInfo?.color || 'gray.400',
//     };

//     setBudgets([...budgets, budget]);
//     setNewBudget({ category: '', amount: '' });
//     onClose();

//     toast({
//       title: 'Budget Added',
//       description: `Budget for ${budget.category} has been created`,
//       status: 'success',
//       duration: 3000,
//       isClosable: true,
//     });
//   };

//   const getProgressColor = (spent: number, amount: number) => {
//     const percentage = (spent / amount) * 100;
//     if (percentage >= 90) return 'red.400';
//     if (percentage >= 75) return 'orange.400';
//     return 'green.400';
//   };

//   return (
//     <ProtectedRoute>
//       <Box minH="100vh" bg="gray.50" py={8}>
//         <Container maxW="container.xl">
//           <HStack justify="space-between" mb={8}>
//             <Heading size="lg">Budget Management</Heading>
//             <Button
//               leftIcon={<FiPlus />}
//               colorScheme="blue"
//               onClick={onOpen}
//               _hover={{
//                 transform: 'translateY(-2px)',
//                 boxShadow: 'lg',
//               }}
//             >
//               Add Budget
//             </Button>
//           </HStack>

//           <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
//             {budgets.map((budget) => (
//               <Card
//                 key={budget.id}
//                 bg="white"
//                 shadow="lg"
//                 borderRadius="lg"
//                 _hover={{
//                   transform: 'translateY(-4px)',
//                   shadow: 'xl',
//                 }}
//                 transition="all 0.3s"
//               >
//                 <CardBody>
//                   <HStack spacing={4} mb={4}>
//                     <Box
//                       p={3}
//                       bg={budget.color}
//                       borderRadius="full"
//                       color="white"
//                     >
//                       <Icon as={budget.icon} boxSize={5} />
//                     </Box>
//                     <VStack align="start" spacing={0}>
//                       <Text fontWeight="bold" fontSize="lg">
//                         {budget.category}
//                       </Text>
//                       <Text color="gray.500" fontSize="sm">
//                         ${budget.spent.toLocaleString()} of ${budget.amount.toLocaleString()}
//                       </Text>
//                     </VStack>
//                   </HStack>

//                   <Progress
//                     value={(budget.spent / budget.amount) * 100}
//                     colorScheme={
//                       getProgressColor(budget.spent, budget.amount) === 'red.400'
//                         ? 'red'
//                         : getProgressColor(budget.spent, budget.amount) === 'orange.400'
//                         ? 'orange'
//                         : 'green'
//                     }
//                     borderRadius="full"
//                     size="sm"
//                     mb={2}
//                   />

//                   <Flex justify="space-between" fontSize="sm" color="gray.600">
//                     <Text>
//                       {((budget.spent / budget.amount) * 100).toFixed(1)}% spent
//                     </Text>
//                     <Text>
//                       ${(budget.amount - budget.spent).toLocaleString()} remaining
//                     </Text>
//                   </Flex>
//                 </CardBody>
//               </Card>
//             ))}
//           </SimpleGrid>

//           {/* Add Budget Modal */}
//           <Modal isOpen={isOpen} onClose={onClose}>
//             <ModalOverlay />
//             <ModalContent>
//               <ModalHeader>Add New Budget</ModalHeader>
//               <ModalCloseButton />
//               <ModalBody pb={6}>
//                 <FormControl mb={4}>
//                   <FormLabel>Category</FormLabel>
//                   <Select
//                     placeholder="Select category"
//                     value={newBudget.category}
//                     onChange={(e) =>
//                       setNewBudget({ ...newBudget, category: e.target.value })
//                     }
//                   >
//                     {defaultCategories.map((category) => (
//                       <option key={category.name} value={category.name}>
//                         {category.name}
//                       </option>
//                     ))}
//                   </Select>
//                 </FormControl>

//                 <FormControl mb={4}>
//                   <FormLabel>Budget Amount</FormLabel>
//                   <Input
//                     type="number"
//                     placeholder="Enter amount"
//                     value={newBudget.amount}
//                     onChange={(e) =>
//                       setNewBudget({ ...newBudget, amount: e.target.value })
//                     }
//                   />
//                 </FormControl>

//                 <Button colorScheme="blue" mr={3} onClick={handleAddBudget} w="full">
//                   Create Budget
//                 </Button>
//               </ModalBody>
//             </ModalContent>
//           </Modal>
//         </Container>
//       </Box>
//     </ProtectedRoute>
//   );
// } 





'use client';

import {
  Box,
  Container,
  Heading,
  Button,
  VStack,
  HStack,
  Text,
  Progress,
  SimpleGrid,
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
  Icon,
  Flex,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import {
  FiPlus,
  FiDollarSign,
  FiShoppingBag,
  FiHome,
  FiCoffee,
  FiHeart,
  FiBook,
} from 'react-icons/fi';
import { FaCar } from 'react-icons/fa';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/hooks/useAuth';

interface Budget {
  id: string;
  category: string;
  amount: number;
  spent: number;
  icon: any;
  color: string;
}

const defaultCategories = [
  { name: 'Shopping', icon: FiShoppingBag, color: 'blue.400' },
  { name: 'Housing', icon: FiHome, color: 'green.400' },
  { name: 'Transportation', icon: FaCar, color: 'purple.400' },
  { name: 'Food & Dining', icon: FiCoffee, color: 'orange.400' },
  { name: 'Healthcare', icon: FiHeart, color: 'red.400' },
  { name: 'Education', icon: FiBook, color: 'teal.400' },
];

export default function Budgets() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [newBudget, setNewBudget] = useState({ category: '', amount: '' });
  const toast = useToast();
  const { user } = useAuth();

  useEffect(() => {
    setBudgets([
      {
        id: '1',
        category: 'Shopping',
        amount: 500,
        spent: 350,
        icon: FiShoppingBag,
        color: 'blue.400',
      },
      {
        id: '2',
        category: 'Housing',
        amount: 1500,
        spent: 1500,
        icon: FiHome,
        color: 'green.400',
      },
    ]);
  }, []);

  const handleAddBudget = () => {
    if (!newBudget.category || !newBudget.amount) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const categoryInfo = defaultCategories.find(cat => cat.name === newBudget.category);

    const budget: Budget = {
      id: Date.now().toString(),
      category: newBudget.category,
      amount: parseFloat(newBudget.amount),
      spent: 0,
      icon: categoryInfo?.icon || FiDollarSign,
      color: categoryInfo?.color || 'gray.400',
    };

    setBudgets([...budgets, budget]);
    setNewBudget({ category: '', amount: '' });
    onClose();

    toast({
      title: 'Budget Added',
      description: `Budget for ${budget.category} has been created`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const getProgressColor = (spent: number, amount: number) => {
    const percentage = (spent / amount) * 100;
    if (percentage >= 90) return 'red.400';
    if (percentage >= 75) return 'orange.400';
    return 'green.400';
  };

  return (
    <ProtectedRoute>
      <Box minH="100vh" bg="gray.50" py={8}>
        <Container maxW="container.xl">
          <HStack justify="space-between" mb={8}>
            <Heading size="lg">Budget Management</Heading>
            <Button
              leftIcon={<FiPlus />}
              colorScheme="blue"
              onClick={onOpen}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
              }}
            >
              Add Budget
            </Button>
          </HStack>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {budgets.map((budget) => (
              <Card
                key={budget.id}
                bg="white"
                shadow="lg"
                borderRadius="lg"
                _hover={{
                  transform: 'translateY(-4px)',
                  shadow: 'xl',
                }}
                transition="all 0.3s"
              >
                <CardBody>
                  <HStack spacing={4} mb={4}>
                    <Box
                      p={3}
                      bg={budget.color}
                      borderRadius="full"
                      color="white"
                    >
                      <Icon as={budget.icon} boxSize={5} />
                    </Box>
                    <VStack align="start" spacing={0}>
                      <Text fontWeight="bold" fontSize="lg">
                        {budget.category}
                      </Text>
                      <Text color="gray.500" fontSize="sm">
                        ${budget.spent.toLocaleString()} of ${budget.amount.toLocaleString()}
                      </Text>
                    </VStack>
                  </HStack>

                  <Progress
                    value={(budget.spent / budget.amount) * 100}
                    colorScheme={
                      getProgressColor(budget.spent, budget.amount) === 'red.400'
                        ? 'red'
                        : getProgressColor(budget.spent, budget.amount) === 'orange.400'
                        ? 'orange'
                        : 'green'
                    }
                    borderRadius="full"
                    size="sm"
                    mb={2}
                  />

                  <Flex justify="space-between" fontSize="sm" color="gray.600">
                    <Text>
                      {((budget.spent / budget.amount) * 100).toFixed(1)}% spent
                    </Text>
                    <Text>
                      ${(budget.amount - budget.spent).toLocaleString()} remaining
                    </Text>
                  </Flex>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>

          {/* Add Budget Modal */}
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Add New Budget</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl mb={4}>
                  <FormLabel>Category</FormLabel>
                  <Select
                    placeholder="Select category"
                    value={newBudget.category}
                    onChange={(e) =>
                      setNewBudget({ ...newBudget, category: e.target.value })
                    }
                  >
                    {defaultCategories.map((category) => (
                      <option key={category.name} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl mb={4}>
                  <FormLabel>Budget Amount</FormLabel>
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    value={newBudget.amount}
                    onChange={(e) =>
                      setNewBudget({ ...newBudget, amount: e.target.value })
                    }
                  />
                </FormControl>

                <Button colorScheme="blue" mr={3} onClick={handleAddBudget} w="full">
                  Create Budget
                </Button>
              </ModalBody>
            </ModalContent>
          </Modal>
        </Container>
      </Box>
    </ProtectedRoute>
  );
}
