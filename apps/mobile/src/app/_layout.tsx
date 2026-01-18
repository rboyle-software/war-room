import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo';
import { Slot } from 'expo-router';
import { Platform } from 'react-native';
import type { TokenCache } from '@clerk/clerk-expo';

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  throw new Error(
    'Missing EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY. Please set it in your .env file.'
  );
}

// Simple token cache - uses localStorage on web, will use SecureStore on native
const tokenCache: TokenCache = {
  getToken: async (key: string) => {
    if (Platform.OS === 'web') {
      return localStorage.getItem(key);
    }
    // Dynamically import for native only
    const SecureStore = require('expo-secure-store');
    return SecureStore.getItemAsync(key);
  },
  saveToken: async (key: string, token: string) => {
    if (Platform.OS === 'web') {
      localStorage.setItem(key, token);
      return;
    }
    const SecureStore = require('expo-secure-store');
    await SecureStore.setItemAsync(key, token);
  },
  clearToken: async (key: string) => {
    if (Platform.OS === 'web') {
      localStorage.removeItem(key);
      return;
    }
    const SecureStore = require('expo-secure-store');
    await SecureStore.deleteItemAsync(key);
  },
};

export default function RootLayout() {
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <ClerkLoaded>
        <Slot />
      </ClerkLoaded>
    </ClerkProvider>
  );
}
