'use client'

import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { CacheProvider } from '@emotion/react'
import createEmotionCache from '@/lib/emotion'
import Navbar from '@/components/Navbar'
import { useRef } from 'react'
import { AuthProvider } from '@/context/AuthContext'

const clientSideEmotionCache = createEmotionCache()

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  colors: {
    primary: {
      50: '#e3f2fd',
      100: '#bbdefb',
      200: '#90caf9',
      300: '#64b5f6',
      400: '#42a5f5',
      500: '#4CAF50', // A green similar to the image
      600: '#43A047', // Slightly darker green for hover
      700: '#388E3C',
      800: '#2E7D32',
      900: '#1B5E20',
    },
    secondary: {
      50: '#FFF3E0',
      100: '#FFE0B2',
      200: '#FFCC80',
      300: '#FFB74D',
      400: '#FFA726',
      500: '#FF9800', // Secondary Amber
      600: '#FB8C00',
      700: '#F57C00',
      800: '#EF6C00',
      900: '#E65100',
    },
    gray: {
      50: '#FAFAFA',
      100: '#F5F5F5', // Background
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575', // Body Text
      700: '#616161',
      800: '#424242',
      900: '#212121', // Heading Text
    },
    error: {
      500: '#F44336', // Error/Warning Red
    },
    success: {
      500: '#4CAF50', // Success Green (same as primary)
    },
    info: {
      500: '#2196F3', // Info Blue
    },
    white: '#FFFFFF', // Card Background
  },
  styles: {
    global: {
      body: {
        bg: 'white',
        color: 'gray.800',
      },
    },
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: 'primary',
      },
    },
    Heading: {
      baseStyle: {
        color: 'gray.900', // Heading Text Color
      },
    },
    Link: {
      baseStyle: {
        color: 'secondary.500', // Link Color
        _hover: {
          color: 'secondary.600',
          textDecoration: 'none',
        },
      },
    },
  },
})

export default function Providers({ children }: { children: React.ReactNode }) {
  const emotionCache = useRef(clientSideEmotionCache)

  return (
    <CacheProvider value={emotionCache.current}>
      <ChakraProvider theme={theme}>
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </ChakraProvider>
    </CacheProvider>
  )
} 