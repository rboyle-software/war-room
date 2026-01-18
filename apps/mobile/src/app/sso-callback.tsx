import { useEffect } from 'react';
import { useAuth, useSignIn, useSignUp } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

export default function SSOCallback() {
  const { signIn, setActive: setActiveSignIn } = useSignIn();
  const { signUp, setActive: setActiveSignUp } = useSignUp();
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Check if we have a sign in attempt
        if (signIn?.status === 'complete') {
          await setActiveSignIn?.({ session: signIn.createdSessionId });
          router.replace('/');
          return;
        }

        // Check if we have a sign up attempt
        if (signUp?.status === 'complete') {
          await setActiveSignUp?.({ session: signUp.createdSessionId });
          router.replace('/');
          return;
        }

        // If neither is complete, redirect back to sign in
        router.replace('/sign-in');
      } catch (error) {
        console.error('SSO callback error:', error);
        router.replace('/sign-in');
      }
    };

    handleCallback();
  }, [signIn, signUp, setActiveSignIn, setActiveSignUp, router]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#4285F4" />
      <Text style={styles.text}>Completing sign in...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
});
