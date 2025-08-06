'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
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
  HStack,
  Badge,
} from '@chakra-ui/react';
import { AddIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/hooks/useAuth';

interface Transaction {
  _id: string;
  type: string;
  amount: number;
  category: string;
  description: string;
  date: string;
}

export default function Transactions() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [formData, setFormData] = useState({
    type: 'expense',
    amount: '',
    category: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
  });
  const { getToken } = useAuth();
  const toast = useToast();

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const token = getToken();
      const response = await fetch('http://localhost:5001/api/transactions', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = getToken();

    try {
      const url = editingTransaction
        ? `http://localhost:5001/api/transactions/${editingTransaction._id}`
        : 'http://localhost:5001/api/transactions';
      
      const method = editingTransaction ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to save transaction');
      }

      toast({
        title: `Transaction ${editingTransaction ? 'updated' : 'created'} successfully`,
        status: 'success',
        duration: 3000,
      });

      fetchTransactions();
      onClose();
      resetForm();
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to save transaction',
        status: 'error',
        duration: 3000,
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this transaction?')) {
      return;
    }

    try {
      const token = getToken();
      const response = await fetch(`http://localhost:5001/api/transactions/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete transaction');
      }

      toast({
        title: 'Transaction deleted successfully',
        status: 'success',
        duration: 3000,
      });

      fetchTransactions();
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to delete transaction',
        status: 'error',
        duration: 3000,
      });
    }
  };

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setFormData({
      type: transaction.type,
      amount: transaction.amount.toString(),
      category: transaction.category,
      description: transaction.description,
      date: new Date(transaction.date).toISOString().split('T')[0],
    });
    onOpen();
  };

  const resetForm = () => {
    setEditingTransaction(null);
    setFormData({
      type: 'expense',
      amount: '',
      category: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
    });
  };

  const handleModalClose = () => {
    resetForm();
    onClose();
  };

  return (
    <ProtectedRoute>
      <Container maxW="container.xl" py={8}>
        <HStack justify="space-between" mb={6}>
          <Heading>Transactions</Heading>
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
            onClick={() => {
              resetForm();
              onOpen();
            }}
          >
            Add Transaction
          </Button>
        </HStack>

        <Box overflowX="auto">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Date</Th>
                <Th>Type</Th>
                <Th>Category</Th>
                <Th>Description</Th>
                <Th isNumeric>Amount</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {transactions.map((transaction) => (
                <Tr key={transaction._id}>
                  <Td>{new Date(transaction.date).toLocaleDateString()}</Td>
                  <Td>
                    <Badge
                      colorScheme={
                        transaction.type === 'income'
                          ? 'green'
                          : transaction.type === 'expense'
                          ? 'red'
                          : transaction.type === 'savings'
                          ? 'blue'
                          : 'purple'
                      }
                    >
                      {transaction.type}
                    </Badge>
                  </Td>
                  <Td>{transaction.category}</Td>
                  <Td>{transaction.description}</Td>
                  <Td isNumeric>${transaction.amount.toLocaleString()}</Td>
                  <Td>
                    <HStack spacing={2}>
                      <IconButton
                        aria-label="Edit transaction"
                        icon={<EditIcon />}
                        size="sm"
                        onClick={() => handleEdit(transaction)}
                      />
                      <IconButton
                        aria-label="Delete transaction"
                        icon={<DeleteIcon />}
                        size="sm"
                        colorScheme="red"
                        onClick={() => handleDelete(transaction._id)}
                      />
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>

        <Modal isOpen={isOpen} onClose={handleModalClose}>
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
              {editingTransaction ? 'Edit Transaction' : 'Add Transaction'}
            </ModalHeader>
            <ModalCloseButton color="white" />
            <ModalBody>
              <form onSubmit={handleSubmit}>
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
                    <option value="expense" style={{color: '#EF4444'}}>Expense</option>
                    <option value="income" style={{color: '#10B981'}}>Income</option>
                    <option value="savings" style={{color: '#3B82F6'}}>Savings</option>
                    <option value="investment" style={{color: '#8B5CF6'}}>Investment</option>
                  </Select>
                </FormControl>

                <FormControl mb={4}>
                  <FormLabel fontWeight="medium" color="gray.700">Amount</FormLabel>
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
                  />
                </FormControl>

                <FormControl mb={4}>
                  <FormLabel fontWeight="medium" color="gray.700">Category</FormLabel>
                  <Input
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
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

                <FormControl mb={4}>
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

                <FormControl mb={6}>
                  <FormLabel fontWeight="medium" color="gray.700">Date</FormLabel>
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
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
                    onClick={handleModalClose}
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
                    {editingTransaction ? 'Update' : 'Create'}
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