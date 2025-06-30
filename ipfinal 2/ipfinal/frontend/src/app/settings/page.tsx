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
  FormControl,
  FormLabel,
  Input,
  Switch,
  Button,
  useToast,
  Divider,
  Icon,
  SimpleGrid,
  useColorModeValue,
  Select,
} from '@chakra-ui/react';
import { FiUser, FiBell, FiLock, FiCreditCard, FiGlobe } from 'react-icons/fi';
import { useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/hooks/useAuth';

export default function Settings() {
  const { user } = useAuth();
  const toast = useToast();
  const bgColor = useColorModeValue('white', 'gray.800');

  const [settings, setSettings] = useState({
    // Profile Settings
    name: user?.name || '',
    email: user?.email || '',
    currency: 'USD',
    language: 'en',
    
    // Notification Settings
    emailNotifications: true,
    pushNotifications: true,
    transactionAlerts: true,
    budgetAlerts: true,
    goalAlerts: true,
    
    // Security Settings
    twoFactorAuth: false,
    sessionTimeout: '30',
    
    // Display Settings
    darkMode: false,
    compactView: false,
  });

  const handleSave = () => {
    // Here you would typically save the settings to your backend
    toast({
      title: 'Settings saved',
      description: 'Your preferences have been updated successfully.',
      status: 'success',
      duration: 3000,
    });
  };

  return (
    <ProtectedRoute>
      <Container maxW="container.xl" py={8}>
        <VStack spacing={8} align="stretch">
          <Box>
            <Heading size="lg">Settings</Heading>
            <Text color="gray.600">Manage your account preferences</Text>
          </Box>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
            {/* Profile Settings */}
            <Card bg={bgColor}>
              <CardBody>
                <VStack align="stretch" spacing={6}>
                  <HStack>
                    <Icon as={FiUser} boxSize={5} />
                    <Heading size="md">Profile Settings</Heading>
                  </HStack>
                  <Divider />
                  <FormControl>
                    <FormLabel>Name</FormLabel>
                    <Input
                      value={settings.name}
                      onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input
                      value={settings.email}
                      onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                      type="email"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Currency</FormLabel>
                    <Select
                      value={settings.currency}
                      onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                    >
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                      <option value="JPY">JPY (¥)</option>
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Language</FormLabel>
                    <Select
                      value={settings.language}
                      onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                    </Select>
                  </FormControl>
                </VStack>
              </CardBody>
            </Card>

            {/* Notification Settings */}
            <Card bg={bgColor}>
              <CardBody>
                <VStack align="stretch" spacing={6}>
                  <HStack>
                    <Icon as={FiBell} boxSize={5} />
                    <Heading size="md">Notification Settings</Heading>
                  </HStack>
                  <Divider />
                  <FormControl display="flex" alignItems="center" justifyContent="space-between">
                    <FormLabel mb="0">Email Notifications</FormLabel>
                    <Switch
                      isChecked={settings.emailNotifications}
                      onChange={(e) => setSettings({ ...settings, emailNotifications: e.target.checked })}
                    />
                  </FormControl>
                  <FormControl display="flex" alignItems="center" justifyContent="space-between">
                    <FormLabel mb="0">Push Notifications</FormLabel>
                    <Switch
                      isChecked={settings.pushNotifications}
                      onChange={(e) => setSettings({ ...settings, pushNotifications: e.target.checked })}
                    />
                  </FormControl>
                  <FormControl display="flex" alignItems="center" justifyContent="space-between">
                    <FormLabel mb="0">Transaction Alerts</FormLabel>
                    <Switch
                      isChecked={settings.transactionAlerts}
                      onChange={(e) => setSettings({ ...settings, transactionAlerts: e.target.checked })}
                    />
                  </FormControl>
                  <FormControl display="flex" alignItems="center" justifyContent="space-between">
                    <FormLabel mb="0">Budget Alerts</FormLabel>
                    <Switch
                      isChecked={settings.budgetAlerts}
                      onChange={(e) => setSettings({ ...settings, budgetAlerts: e.target.checked })}
                    />
                  </FormControl>
                  <FormControl display="flex" alignItems="center" justifyContent="space-between">
                    <FormLabel mb="0">Goal Alerts</FormLabel>
                    <Switch
                      isChecked={settings.goalAlerts}
                      onChange={(e) => setSettings({ ...settings, goalAlerts: e.target.checked })}
                    />
                  </FormControl>
                </VStack>
              </CardBody>
            </Card>

            {/* Security Settings */}
            <Card bg={bgColor}>
              <CardBody>
                <VStack align="stretch" spacing={6}>
                  <HStack>
                    <Icon as={FiLock} boxSize={5} />
                    <Heading size="md">Security Settings</Heading>
                  </HStack>
                  <Divider />
                  <FormControl display="flex" alignItems="center" justifyContent="space-between">
                    <FormLabel mb="0">Two-Factor Authentication</FormLabel>
                    <Switch
                      isChecked={settings.twoFactorAuth}
                      onChange={(e) => setSettings({ ...settings, twoFactorAuth: e.target.checked })}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Session Timeout (minutes)</FormLabel>
                    <Select
                      value={settings.sessionTimeout}
                      onChange={(e) => setSettings({ ...settings, sessionTimeout: e.target.value })}
                    >
                      <option value="15">15 minutes</option>
                      <option value="30">30 minutes</option>
                      <option value="60">1 hour</option>
                      <option value="120">2 hours</option>
                    </Select>
                  </FormControl>
                </VStack>
              </CardBody>
            </Card>

            {/* Display Settings */}
            <Card bg={bgColor}>
              <CardBody>
                <VStack align="stretch" spacing={6}>
                  <HStack>
                    <Icon as={FiGlobe} boxSize={5} />
                    <Heading size="md">Display Settings</Heading>
                  </HStack>
                  <Divider />
                  <FormControl display="flex" alignItems="center" justifyContent="space-between">
                    <FormLabel mb="0">Dark Mode</FormLabel>
                    <Switch
                      isChecked={settings.darkMode}
                      onChange={(e) => setSettings({ ...settings, darkMode: e.target.checked })}
                    />
                  </FormControl>
                  <FormControl display="flex" alignItems="center" justifyContent="space-between">
                    <FormLabel mb="0">Compact View</FormLabel>
                    <Switch
                      isChecked={settings.compactView}
                      onChange={(e) => setSettings({ ...settings, compactView: e.target.checked })}
                    />
                  </FormControl>
                </VStack>
              </CardBody>
            </Card>
          </SimpleGrid>

          <HStack justify="flex-end" spacing={4}>
            <Button variant="ghost">Cancel</Button>
            <Button colorScheme="blue" onClick={handleSave}>
              Save Changes
            </Button>
          </HStack>
        </VStack>
      </Container>
    </ProtectedRoute>
  );
} 