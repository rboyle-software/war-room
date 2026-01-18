import { useSignIn, useAuth } from '@clerk/clerk-expo';
import { Redirect, Link } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
import { useCallback, useState } from 'react';

export default function SignIn() {
  const { isSignedIn } = useAuth();
  const { signIn, isLoaded } = useSignIn();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleSignIn = useCallback(async () => {
    if (!isLoaded || !signIn) return;

    try {
      setIsLoading(true);
      setError(null);
      const apiBaseUrl = process.env.EXPO_PUBLIC_API_BASE_URL || '';

      // Start OAuth flow - this will redirect to Google
      await signIn.authenticateWithRedirect({
        strategy: 'oauth_google',
        // For web, we use a constant base URL. For native, we have a deep link.
        redirectUrl: Platform.OS === 'web'
          ? apiBaseUrl + '/sso-callback'
          : 'warroom://sso-callback',
        redirectUrlComplete: Platform.OS === 'web'
          ? apiBaseUrl
          : 'warroom://',
      });
    } catch (err: any) {
      console.error('OAuth error:', err);
      setError(err.message || 'Sign in failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [signIn, isLoaded]);

  if (isSignedIn) {
    return <Redirect href="/" />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>War Room</Text>
        <Text style={styles.subtitle}>NYC Location Search</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.description}>
          Search for locations in NYC and discover property ownership information.
        </Text>

        {error && (
          <Text style={styles.error}>{error}</Text>
        )}

        <TouchableOpacity
          style={[styles.googleButton, isLoading && styles.googleButtonDisabled]}
          onPress={handleGoogleSignIn}
          disabled={isLoading || !isLoaded}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <GoogleIcon />
              <Text style={styles.googleButtonText}>Continue with Google</Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      <Text style={styles.footer}>
        By continuing, you agree to our Terms of Service and Privacy Policy.
      </Text>
    </View>
  );
}

function GoogleIcon() {
  return (
    <View style={styles.googleIcon}>
      <Text style={styles.googleIconText}>G</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingTop: 80,
  },
  header: {
    alignItems: 'center',
    marginBottom: 60,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginTop: 8,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 100,
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  error: {
    color: '#ff4444',
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 14,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4285F4',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    gap: 12,
  },
  googleButtonDisabled: {
    opacity: 0.7,
  },
  googleButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  googleIcon: {
    width: 24,
    height: 24,
    backgroundColor: '#fff',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleIconText: {
    color: '#4285F4',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginBottom: 40,
  },
});
