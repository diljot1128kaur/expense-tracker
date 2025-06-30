'use client';

import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Heading,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  HStack,
  Badge,
  Link as ChakraLink,
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
} from '@chakra-ui/icons';
import { FiSettings, FiBarChart2 } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import Link from 'next/link';

export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure();
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <Box>
      <Flex
        bg={'white'}
        color={'gray.600'}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={'gray.200'}
        align={'center'}
        boxShadow="sm"
      >
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}
        >
          <IconButton
            onClick={onToggle}
            icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
            color={'gray.600'}
            _focus={{
              boxShadow: 'none',
              outline: 'none',
            }}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Text
            textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
            fontFamily={'heading'}
            color={'primary.500'}
            fontSize="xl"
            fontWeight="bold"
            cursor="pointer"
            _hover={{ color: 'primary.600' }}
          >
            <ChakraLink as={Link} href="/" _focus={{ boxShadow: 'none', outline: 'none' }} style={{ textDecoration: 'none' }} color={'primary.500'}>
              BudgetBuddy
            </ChakraLink>
          </Text>

          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            {user && (
              <Stack direction={'row'} spacing={4}>
                <ChakraLink as={Link} href="/dashboard" _focus={{ boxShadow: 'none', outline: 'none' }} style={{ textDecoration: 'none' }}>
                  <Text
                    p={2}
                    fontSize={'sm'}
                    fontWeight={500}
                    color={'gray.600'}
                    _hover={{
                      color: 'primary.500',
                    }}
                  >
                    Dashboard
                  </Text>
                </ChakraLink>
                <ChakraLink as={Link} href="/transactions" _focus={{ boxShadow: 'none', outline: 'none' }} style={{ textDecoration: 'none' }}>
                  <Text
                    p={2}
                    fontSize={'sm'}
                    fontWeight={500}
                    color={'gray.600'}
                    _hover={{
                      color: 'primary.500',
                    }}
                  >
                    Transactions
                  </Text>
                </ChakraLink>
                <ChakraLink as={Link} href="/goals" _focus={{ boxShadow: 'none', outline: 'none' }} style={{ textDecoration: 'none' }}>
                  <Text
                    p={2}
                    fontSize={'sm'}
                    fontWeight={500}
                    color={'gray.600'}
                    _hover={{
                      color: 'primary.500',
                    }}
                  >
                    Goals
                  </Text>
                </ChakraLink>
                <ChakraLink as={Link} href="/budgets" _focus={{ boxShadow: 'none', outline: 'none' }} style={{ textDecoration: 'none' }}>
                  <Text
                    p={2}
                    fontSize={'sm'}
                    fontWeight={500}
                    color={'gray.600'}
                    _hover={{
                      color: 'primary.500',
                    }}
                  >
                    Budgets
                  </Text>
                </ChakraLink>
                <ChakraLink as={Link} href="/investments" _focus={{ boxShadow: 'none', outline: 'none' }} style={{ textDecoration: 'none' }}>
                  <Text
                    p={2}
                    fontSize={'sm'}
                    fontWeight={500}
                    color={'gray.600'}
                    _hover={{
                      color: 'primary.500',
                    }}
                  >
                    Investments
                  </Text>
                </ChakraLink>
                <ChakraLink as={Link} href="/subscription" _focus={{ boxShadow: 'none', outline: 'none' }} style={{ textDecoration: 'none' }}>
                  <HStack spacing={2}>
                    <Text
                      p={2}
                      fontSize={'sm'}
                      fontWeight={500}
                      color={'primary.500'}
                      _hover={{
                        color: 'primary.600',
                      }}
                    >
                      Subscription
                    </Text>
                    {user?.isPro && (
                      <Badge
                        colorScheme="blue"
                        borderRadius="md"
                        px={2}
                        py={0.5}
                        fontSize="xs"
                        fontWeight="bold"
                      >
                        PRO
                      </Badge>
                    )}
                  </HStack>
                </ChakraLink>
                <ChakraLink as={Link} href="/reports" _focus={{ boxShadow: 'none', outline: 'none' }} style={{ textDecoration: 'none' }}>
                  <Text
                    p={2}
                    fontSize={'sm'}
                    fontWeight={500}
                    color={'gray.600'}
                    _hover={{
                      color: 'primary.500',
                    }}
                  >
                    Reports
                  </Text>
                </ChakraLink>
                <ChakraLink as={Link} href="/settings" _focus={{ boxShadow: 'none', outline: 'none' }} style={{ textDecoration: 'none' }}>
                  <Text
                    p={2}
                    fontSize={'sm'}
                    fontWeight={500}
                    color={'gray.600'}
                    _hover={{
                      color: 'primary.500',
                    }}
                  >
                    Settings
                  </Text>
                </ChakraLink>
              </Stack>
            )}
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}
        >
          {user ? (
            <Button
              fontSize={'sm'}
              fontWeight={600}
              color={'white'}
              bg={'error.500'}
              _hover={{
                bg: 'red.400',
              }}
              _focus={{
                boxShadow: 'none',
                outline: 'none',
              }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          ) : (
            <>
              <ChakraLink as={Link} href="/login" _focus={{ boxShadow: 'none', outline: 'none' }} style={{ textDecoration: 'none' }}>
                <Button
                  fontSize={'sm'}
                  fontWeight={400}
                  variant={'ghost'}
                  color={'gray.600'}
                  _hover={{
                    color: 'primary.500',
                  }}
                  _focus={{
                    boxShadow: 'none',
                    outline: 'none',
                  }}
                >
                  Sign In
                </Button>
              </ChakraLink>
              <ChakraLink as={Link} href="/register" _focus={{ boxShadow: 'none', outline: 'none' }} style={{ textDecoration: 'none' }}>
                <Button
                  display={{ base: 'inline-flex', md: 'inline-flex' }}
                  fontSize={'sm'}
                  fontWeight={600}
                  color={'white'}
                  bg={'primary.500'}
                  _hover={{
                    bg: 'primary.600',
                  }}
                >
                  Sign Up
                </Button>
              </ChakraLink>
            </>
          )}
        </Stack>
      </Flex>

      <Box
        display={{ base: isOpen ? 'block' : 'none', md: 'none' }}
        pb={4}
        px={4}
        bg={'white'}
        borderBottomWidth={1}
        borderColor={'gray.200'}
        boxShadow="sm"
      >
        <Stack as={'nav'} spacing={4}>
          <ChakraLink as={Link} href="/dashboard" _focus={{ boxShadow: 'none', outline: 'none' }} style={{ textDecoration: 'none' }}>
            <Text
              py={2}
              fontSize={'sm'}
              fontWeight={500}
              color={'gray.600'}
              _hover={{
                color: 'primary.500',
              }}
            >
              Dashboard
            </Text>
          </ChakraLink>
          <ChakraLink as={Link} href="/transactions" _focus={{ boxShadow: 'none', outline: 'none' }} style={{ textDecoration: 'none' }}>
            <Text
              py={2}
              fontSize={'sm'}
              fontWeight={500}
              color={'gray.600'}
              _hover={{
                color: 'primary.500',
              }}
            >
              Transactions
            </Text>
          </ChakraLink>
          <ChakraLink as={Link} href="/goals" _focus={{ boxShadow: 'none', outline: 'none' }} style={{ textDecoration: 'none' }}>
            <Text
              py={2}
              fontSize={'sm'}
              fontWeight={500}
              color={'gray.600'}
              _hover={{
                color: 'primary.500',
              }}
            >
              Goals
            </Text>
          </ChakraLink>
          <ChakraLink as={Link} href="/budgets" _focus={{ boxShadow: 'none', outline: 'none' }} style={{ textDecoration: 'none' }}>
            <Text
              py={2}
              fontSize={'sm'}
              fontWeight={500}
              color={'gray.600'}
              _hover={{
                color: 'primary.500',
              }}
            >
              Budgets
            </Text>
          </ChakraLink>
          <ChakraLink as={Link} href="/investments" _focus={{ boxShadow: 'none', outline: 'none' }} style={{ textDecoration: 'none' }}>
            <Text
              py={2}
              fontSize={'sm'}
              fontWeight={500}
              color={'gray.600'}
              _hover={{
                color: 'primary.500',
              }}
            >
              Investments
            </Text>
          </ChakraLink>
          <ChakraLink as={Link} href="/subscription" _focus={{ boxShadow: 'none', outline: 'none' }} style={{ textDecoration: 'none' }}>
            <HStack spacing={2}>
              <Text
                py={2}
                fontSize={'sm'}
                fontWeight={500}
                color={'primary.500'}
                _hover={{
                  color: 'primary.600',
                }}
              >
                Subscription
              </Text>
              {user?.isPro && (
                <Badge
                  colorScheme="blue"
                  borderRadius="md"
                  px={2}
                  py={0.5}
                  fontSize="xs"
                  fontWeight="bold"
                >
                  PRO
                </Badge>
              )}
            </HStack>
          </ChakraLink>
          <ChakraLink as={Link} href="/reports" _focus={{ boxShadow: 'none', outline: 'none' }} style={{ textDecoration: 'none' }}>
            <Text
              py={2}
              fontSize={'sm'}
              fontWeight={500}
              color={'gray.600'}
              _hover={{
                color: 'primary.500',
              }}
            >
              Reports
            </Text>
          </ChakraLink>
          <ChakraLink as={Link} href="/settings" _focus={{ boxShadow: 'none', outline: 'none' }} style={{ textDecoration: 'none' }}>
            <Text
              py={2}
              fontSize={'sm'}
              fontWeight={500}
              color={'gray.600'}
              _hover={{
                color: 'primary.500',
              }}
            >
              Settings
            </Text>
          </ChakraLink>
          {user && (
            <Button
              fontSize={'sm'}
              fontWeight={600}
              color={'white'}
              bg={'error.500'}
              _hover={{
                bg: 'red.400',
              }}
              _focus={{
                boxShadow: 'none',
                outline: 'none',
              }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          )}
        </Stack>
      </Box>
    </Box>
  );
}

const MobileNav = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };
  
  return (
    <Stack
      bg={'white'}
      p={4}
      display={{ md: 'none' }}
      borderBottomWidth={1}
      borderColor={'gray.200'}
      boxShadow="sm"
    >
      {user ? (
        <>
          <MobileNavItem href="/dashboard" label="Dashboard" />
          <MobileNavItem href="/transactions" label="Transactions" />
          <MobileNavItem href="/goals" label="Goals" />
          <MobileNavItem href="/budgets" label="Budgets" />
          <MobileNavItem href="/investments" label="Investments" />
          <MobileNavItem href="/subscription" label="Subscription" showProBadge={user?.isPro} />
          <MobileNavItem href="/reports" label="Reports" />
          <MobileNavItem href="/settings" label="Settings" />
          <Box pt={4}>
            <Button
              w="full"
              fontSize={'sm'}
              fontWeight={600}
              color={'white'}
              bg={'error.500'}
              _hover={{
                bg: 'red.400',
              }}
              _focus={{
                boxShadow: 'none',
                outline: 'none',
              }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Box>
        </>
      ) : (
        <>
          <ChakraLink as={Link} href="/login" passHref _focus={{ boxShadow: 'none', outline: 'none' }}>
            <Button
              w="full"
              variant="ghost"
              color={'gray.600'}
              _hover={{
                color: 'primary.500',
              }}
            >
              Sign In
            </Button>
          </ChakraLink>
          <ChakraLink as={Link} href="/register" passHref _focus={{ boxShadow: 'none', outline: 'none' }}>
            <Button
              w="full"
              bg={'primary.500'}
              color={'white'}
              _hover={{
                bg: 'primary.600',
              }}
            >
              Sign Up
            </Button>
          </ChakraLink>
        </>
      )}
    </Stack>
  );
};

const MobileNavItem = ({ href, label, showProBadge }: { href: string; label: string; showProBadge?: boolean }) => {
  return (
    <ChakraLink as={Link} href={href} passHref _focus={{ boxShadow: 'none', outline: 'none' }} style={{ textDecoration: 'none' }}>
      <Text
        py={2}
        fontSize={'sm'}
        fontWeight={500}
        color={'gray.600'}
        _hover={{
          textDecoration: 'none',
          color: 'primary.500',
        }}
        _active={{
          bg: 'transparent',
        }}
      >
        {label}
        {showProBadge && (
          <Badge ml={2} colorScheme="blue" fontSize="xs">
            PRO
          </Badge>
        )}
      </Text>
    </ChakraLink>
  );
}; 