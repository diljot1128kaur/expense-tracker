'use client';

import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
  VStack,
  Badge,
  List as ChakraList,
  ListItem as ChakraListItem,
  HStack,
  useToast,
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
  Progress,
  CircularProgress,
  CircularProgressLabel,
} from '@chakra-ui/react';
import { FiCheck, FiLock } from 'react-icons/fi';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/hooks/useAuth';
import { useState, useEffect } from 'react';

interface PriceWrapperProps {
  children: React.ReactNode;
  isPopular?: boolean;
}

function PriceWrapper({ children, isPopular = false }: PriceWrapperProps) {
  return (
    <Box
      position="relative"
      mb={4}
      shadow="xl"
      borderWidth="1px"
      borderColor={useColorModeValue('gray.200', 'gray.700')}
      borderRadius={'xl'}
      p={6}
      overflow="hidden"
      transform={isPopular ? 'scale(1.05)' : 'none'}
      _hover={{
        transform: isPopular ? 'scale(1.08)' : 'scale(1.03)',
      }}
      transition="all 0.3s"
      bg={useColorModeValue('white', 'gray.800')}
    >
      {isPopular && (
        <Badge
          position="absolute"
          top={4}
          right={4}
          colorScheme="blue"
          borderRadius="md"
          px={3}
          py={1}
          fontSize="sm"
          fontWeight="bold"
        >
          Popular
        </Badge>
      )}
      {children}
    </Box>
  );
}

export default function Subscription() {
  const { user, updateSubscriptionStatus } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: '',
  });
  const [trialDaysLeft, setTrialDaysLeft] = useState(14);
  const [trialProgress, setTrialProgress] = useState(0);

  useEffect(() => {
    // Simulate trial period progress
    const interval = setInterval(() => {
      setTrialProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Here you would typically integrate with a payment processor
      // For now, we'll just simulate a successful payment
      await new Promise(resolve => setTimeout(resolve, 1500));

      const result = await updateSubscriptionStatus(true);

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

  const handleSubscribe = async (plan: string) => {
    if (plan === 'pro') {
      onOpen();
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const isPro = plan === 'pro';
      console.log('Attempting to subscribe to plan:', plan);
      
      const result = await updateSubscriptionStatus(isPro);

      if (result.success) {
        console.log('Subscription update successful');
        toast({
          title: 'Subscription Updated',
          description: `Successfully ${isPro ? 'upgraded to Pro' : 'downgraded to Free'} plan`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      } else {
        console.error('Subscription update failed:', result.error);
        throw new Error(result.error || 'Failed to update subscription');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update subscription';
      console.error('Subscription error:', errorMessage);
      setError(errorMessage);
      toast({
        title: 'Error',
        description: errorMessage,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <Box py={12} px={4} bg={useColorModeValue('gray.50', 'gray.900')} minH="100vh">
        <VStack spacing={2} textAlign="center" mb={12}>
          <Heading
            as="h1"
            fontSize={{ base: '4xl', sm: '5xl' }}
            bgGradient="linear(to-r, primary.400, primary.600)"
            bgClip="text"
          >
            Choose Your Plan
          </Heading>
          {!user?.isPro && (
            <VStack spacing={4} w="full" maxW="md" bg="white" p={6} rounded="xl" shadow="md">
              <Text fontSize="lg" color="gray.600">
                Your Free Trial
              </Text>
              <CircularProgress value={trialProgress} color="blue.500" size="120px">
                <CircularProgressLabel>
                  <VStack spacing={0}>
                    <Text fontSize="2xl" fontWeight="bold" color="blue.500">
                      {trialDaysLeft}
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      days left
                    </Text>
                  </VStack>
                </CircularProgressLabel>
              </CircularProgress>
              <Progress value={trialProgress} w="full" colorScheme="blue" rounded="full" />
              <Text fontSize="sm" color="gray.500">
                Upgrade to Pro to unlock all features
              </Text>
            </VStack>
          )}
          <Text fontSize="lg" color={'gray.500'}>
            {user?.isPro ? 'You are currently on the Pro plan' : 'Start with 14-day free trial. No credit card needed.'}
          </Text>
        </VStack>
        <Container maxW="container.xl">
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} alignItems="flex-start">
            {/* Free Plan */}
            <PriceWrapper>
              <Box py={4} px={12}>
                <Text fontWeight="500" fontSize="2xl">
                  Free
                </Text>
                <Stack align="flex-start" justify="flex-start">
                  <Text fontSize="3xl" fontWeight="600">
                    $0
                    <Text as="span" fontSize="xl" fontWeight="normal">
                      /month
                    </Text>
                  </Text>
                </Stack>
              </Box>
              <VStack
                bg={useColorModeValue('gray.50', 'gray.700')}
                py={4}
                borderBottomRadius={'xl'}
                spacing={3}
              >
                <ChakraList spacing={3} textAlign="start" px={12}>
                  <ChakraListItem>
                    <HStack spacing={2}>
                      <Icon as={FiCheck} color="green.500" />
                      <Text>Basic expense tracking</Text>
                    </HStack>
                  </ChakraListItem>
                  <ChakraListItem>
                    <HStack spacing={2}>
                      <Icon as={FiCheck} color="green.500" />
                      <Text>Up to 50 transactions/month</Text>
                    </HStack>
                  </ChakraListItem>
                  <ChakraListItem>
                    <HStack spacing={2}>
                      <Icon as={FiCheck} color="green.500" />
                      <Text>Basic analytics</Text>
                    </HStack>
                  </ChakraListItem>
                  <ChakraListItem>
                    <HStack spacing={2}>
                      <Icon as={FiCheck} color="green.500" />
                      <Text>Email support</Text>
                    </HStack>
                  </ChakraListItem>
                </ChakraList>
                <Box w="80%" pt={7}>
                  <Button 
                    w="full" 
                    colorScheme={!user?.isPro ? "gray" : "blue"}
                    onClick={() => handleSubscribe('free')}
                    isLoading={isLoading}
                    isDisabled={!user?.isPro}
                  >
                    {!user?.isPro ? 'Current Plan' : 'Downgrade to Free'}
                  </Button>
                </Box>
              </VStack>
            </PriceWrapper>

            {/* Pro Plan */}
            <PriceWrapper isPopular>
              <Box py={4} px={12}>
                <Text fontWeight="500" fontSize="2xl">
                  Pro
                </Text>
                <Stack align="flex-start" justify="flex-start">
                  <Text fontSize="3xl" fontWeight="600">
                    $9.99
                    <Text as="span" fontSize="xl" fontWeight="normal">
                      /month
                    </Text>
                  </Text>
                </Stack>
              </Box>
              <VStack
                bg={useColorModeValue('gray.50', 'gray.700')}
                py={4}
                borderBottomRadius={'xl'}
                spacing={3}
              >
                <ChakraList spacing={3} textAlign="start" px={12}>
                  <ChakraListItem>
                    <HStack spacing={2}>
                      <Icon as={FiCheck} color="green.500" />
                      <Text>Unlimited transactions</Text>
                    </HStack>
                  </ChakraListItem>
                  <ChakraListItem>
                    <HStack spacing={2}>
                      <Icon as={FiCheck} color="green.500" />
                      <Text>Advanced analytics</Text>
                    </HStack>
                  </ChakraListItem>
                  <ChakraListItem>
                    <HStack spacing={2}>
                      <Icon as={FiCheck} color="green.500" />
                      <Text>Investment tracking</Text>
                    </HStack>
                  </ChakraListItem>
                  <ChakraListItem>
                    <HStack spacing={2}>
                      <Icon as={FiCheck} color="green.500" />
                      <Text>Goal setting</Text>
                    </HStack>
                  </ChakraListItem>
                  <ChakraListItem>
                    <HStack spacing={2}>
                      <Icon as={FiCheck} color="green.500" />
                      <Text>Priority support</Text>
                    </HStack>
                  </ChakraListItem>
                  <ChakraListItem>
                    <HStack spacing={2}>
                      <Icon as={FiCheck} color="green.500" />
                      <Text>Export reports</Text>
                    </HStack>
                  </ChakraListItem>
                </ChakraList>
                <Box w="80%" pt={7}>
                  <Button
                    w="full"
                    colorScheme="blue"
                    bg="blue.400"
                    _hover={{ bg: 'blue.500' }}
                    onClick={() => handleSubscribe('pro')}
                    isLoading={isLoading}
                    isDisabled={user?.isPro}
                  >
                    {user?.isPro ? 'Current Plan' : 'Upgrade to Pro'}
                  </Button>
                </Box>
              </VStack>
            </PriceWrapper>

            {/* Enterprise Plan */}
            <PriceWrapper>
              <Box py={4} px={12}>
                <Text fontWeight="500" fontSize="2xl">
                  Enterprise
                </Text>
                <Stack align="flex-start" justify="flex-start">
                  <Text fontSize="3xl" fontWeight="600">
                    $29.99
                    <Text as="span" fontSize="xl" fontWeight="normal">
                      /month
                    </Text>
                  </Text>
                </Stack>
              </Box>
              <VStack
                bg={useColorModeValue('gray.50', 'gray.700')}
                py={4}
                borderBottomRadius={'xl'}
                spacing={3}
              >
                <ChakraList spacing={3} textAlign="start" px={12}>
                  <ChakraListItem>
                    <HStack spacing={2}>
                      <Icon as={FiCheck} color="green.500" />
                      <Text>All Pro features</Text>
                    </HStack>
                  </ChakraListItem>
                  <ChakraListItem>
                    <HStack spacing={2}>
                      <Icon as={FiCheck} color="green.500" />
                      <Text>Custom reports</Text>
                    </HStack>
                  </ChakraListItem>
                  <ChakraListItem>
                    <HStack spacing={2}>
                      <Icon as={FiCheck} color="green.500" />
                      <Text>Team collaboration</Text>
                    </HStack>
                  </ChakraListItem>
                  <ChakraListItem>
                    <HStack spacing={2}>
                      <Icon as={FiCheck} color="green.500" />
                      <Text>API access</Text>
                    </HStack>
                  </ChakraListItem>
                  <ChakraListItem>
                    <HStack spacing={2}>
                      <Icon as={FiCheck} color="green.500" />
                      <Text>Dedicated support</Text>
                    </HStack>
                  </ChakraListItem>
                  <ChakraListItem>
                    <HStack spacing={2}>
                      <Icon as={FiCheck} color="green.500" />
                      <Text>Custom integrations</Text>
                    </HStack>
                  </ChakraListItem>
                </ChakraList>
                <Box w="80%" pt={7}>
                  <Button
                    w="full"
                    colorScheme="blue"
                    variant="outline"
                    onClick={() => handleSubscribe('enterprise')}
                    isLoading={isLoading}
                  >
                    Contact Sales
                  </Button>
                </Box>
              </VStack>
            </PriceWrapper>
          </SimpleGrid>
        </Container>

        {/* FAQ Section */}
        <Container maxW="container.xl" mt={20}>
          <VStack spacing={4} textAlign="center" mb={12}>
            <Heading as="h2" fontSize="3xl">
              Frequently Asked Questions
            </Heading>
            <Text color={'gray.500'}>
              Have questions? We're here to help.
            </Text>
          </VStack>
          {/* Add FAQ items here if needed */}
        </Container>

        {/* Enhanced Payment Modal */}
        <Modal isOpen={isOpen} onClose={onClose} size="md">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Upgrade to Pro</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <VStack spacing={6}>
                {/* Plan Summary */}
                <Box w="full" p={4} bg="blue.50" rounded="lg">
                  <VStack align="start" spacing={2}>
                    <Text fontWeight="bold" color="blue.700">Pro Plan Summary</Text>
                    <HStack spacing={2}>
                      <Icon as={FiCheck} color="green.500" />
                      <Text>Unlimited transactions</Text>
                    </HStack>
                    <HStack spacing={2}>
                      <Icon as={FiCheck} color="green.500" />
                      <Text>Advanced analytics</Text>
                    </HStack>
                    <HStack spacing={2}>
                      <Icon as={FiCheck} color="green.500" />
                      <Text>Investment tracking</Text>
                    </HStack>
                    <Text fontWeight="bold" color="blue.700" mt={2}>
                      $9.99/month
                    </Text>
                  </VStack>
                </Box>

                {/* Payment Form */}
                <form onSubmit={handlePaymentSubmit} style={{ width: '100%' }}>
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

                    {/* Security Notice */}
                    <Box w="full" p={3} bg="gray.50" rounded="md">
                      <HStack spacing={2}>
                        <Icon as={FiLock} color="green.500" />
                        <Text fontSize="sm" color="gray.600">
                          Your payment information is secure and encrypted
                        </Text>
                      </HStack>
                    </Box>

                    <Button
                      type="submit"
                      colorScheme="blue"
                      w="full"
                      isLoading={isLoading}
                      size="lg"
                    >
                      Complete Payment
                    </Button>

                    {/* Money-back Guarantee */}
                    <Text fontSize="sm" color="gray.500" textAlign="center">
                      30-day money-back guarantee. Cancel anytime.
                    </Text>
                  </VStack>
                </form>
              </VStack>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>
    </ProtectedRoute>
  );
} 