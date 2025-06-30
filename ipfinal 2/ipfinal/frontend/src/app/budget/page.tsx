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
  Progress,
  Button,
  Input,
  FormControl,
  FormLabel,
  Select,
  useToast,
  Icon,
  SimpleGrid,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiPlus, FiTrash2, FiEdit2 } from 'react-icons/fi';
import { useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';

interface BudgetCategory {
  id: string;
  name: string;
  allocated: number;
  spent: number;
  color: string;
}

export default function Budget() {
  const [categories, setCategories] = useState<BudgetCategory[]>([
    { id: '1', name: 'Housing', allocated: 1500, spent: 1200, color: 'blue.500' },
    { id: '2', name: 'Food', allocated: 600, spent: 450, color: 'green.500' },
    { id: '3', name: 'Transport', allocated: 300, spent: 280, color: 'purple.500' },
    { id: '4', name: 'Entertainment', allocated: 200, spent: 180, color: 'orange.500' },
  ]);

  const [newCategory, setNewCategory] = useState({
    name: '',
    allocated: '',
  });

  const toast = useToast();
  const bgColor = useColorModeValue('white', 'gray.800');

  const handleAddCategory = () => {
    if (!newCategory.name || !newCategory.allocated) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        status: 'error',
        duration: 3000,
      });
      return;
    }

    const category: BudgetCategory = {
      id: Date.now().toString(),
      name: newCategory.name,
      allocated: Number(newCategory.allocated),
      spent: 0,
      color: `hsl(${Math.random() * 360}, 70%, 50%)`,
    };

    setCategories([...categories, category]);
    setNewCategory({ name: '', allocated: '' });
  };

  const handleDeleteCategory = (id: string) => {
    setCategories(categories.filter(cat => cat.id !== id));
  };

  const getTotalAllocated = () => {
    return categories.reduce((sum, cat) => sum + cat.allocated, 0);
  };

  const getTotalSpent = () => {
    return categories.reduce((sum, cat) => sum + cat.spent, 0);
  };

  return (
    <ProtectedRoute>
      <Container maxW="container.xl" py={8}>
        <VStack spacing={8} align="stretch">
          <Box>
            <Heading size="lg">Budget Planning</Heading>
            <Text color="gray.600">Manage your monthly budget categories</Text>
          </Box>

          {/* Budget Overview */}
          <Card bg={bgColor}>
            <CardBody>
              <VStack spacing={4}>
                <HStack justify="space-between" w="full">
                  <Text>Total Budget</Text>
                  <Text fontWeight="bold">${getTotalAllocated()}</Text>
                </HStack>
                <HStack justify="space-between" w="full">
                  <Text>Total Spent</Text>
                  <Text fontWeight="bold">${getTotalSpent()}</Text>
                </HStack>
                <HStack justify="space-between" w="full">
                  <Text>Remaining</Text>
                  <Text fontWeight="bold" color={getTotalAllocated() - getTotalSpent() >= 0 ? 'green.500' : 'red.500'}>
                    ${getTotalAllocated() - getTotalSpent()}
                  </Text>
                </HStack>
                <Progress
                  value={(getTotalSpent() / getTotalAllocated()) * 100}
                  colorScheme={getTotalSpent() > getTotalAllocated() ? 'red' : 'green'}
                  w="full"
                />
              </VStack>
            </CardBody>
          </Card>

          {/* Add New Category */}
          <Card bg={bgColor}>
            <CardBody>
              <Heading size="md" mb={4}>Add New Category</Heading>
              <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
                <FormControl>
                  <FormLabel>Category Name</FormLabel>
                  <Input
                    value={newCategory.name}
                    onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                    placeholder="e.g., Utilities"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Allocated Amount</FormLabel>
                  <Input
                    type="number"
                    value={newCategory.allocated}
                    onChange={(e) => setNewCategory({ ...newCategory, allocated: e.target.value })}
                    placeholder="e.g., 200"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>&nbsp;</FormLabel>
                  <Button
                    leftIcon={<Icon as={FiPlus} />}
                    colorScheme="blue"
                    onClick={handleAddCategory}
                    w="full"
                  >
                    Add Category
                  </Button>
                </FormControl>
              </SimpleGrid>
            </CardBody>
          </Card>

          {/* Budget Categories */}
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            {categories.map((category) => (
              <Card key={category.id} bg={bgColor}>
                <CardBody>
                  <VStack align="stretch" spacing={4}>
                    <HStack justify="space-between">
                      <Heading size="md">{category.name}</Heading>
                      <HStack>
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
                          onClick={() => handleDeleteCategory(category.id)}
                        >
                          Delete
                        </Button>
                      </HStack>
                    </HStack>
                    <HStack justify="space-between">
                      <Text>Allocated: ${category.allocated}</Text>
                      <Text>Spent: ${category.spent}</Text>
                    </HStack>
                    <Progress
                      value={(category.spent / category.allocated) * 100}
                      colorScheme={category.spent > category.allocated ? 'red' : 'green'}
                    />
                    <HStack justify="space-between">
                      <Text>Remaining:</Text>
                      <Text
                        color={category.allocated - category.spent >= 0 ? 'green.500' : 'red.500'}
                        fontWeight="bold"
                      >
                        ${category.allocated - category.spent}
                      </Text>
                    </HStack>
                  </VStack>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </ProtectedRoute>
  );
} 