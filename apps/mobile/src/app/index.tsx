import { useAuth, useUser } from '@clerk/clerk-expo';
import { Redirect } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Home() {
  const { isSignedIn, signOut } = useAuth();
  const { user } = useUser();

  if (!isSignedIn) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>War Room</Text>
        <Text style={styles.subtitle}>NYC Location Search</Text>
      </View>

      <View style={styles.userInfo}>
        <Text style={styles.welcome}>Welcome back,</Text>
        <Text style={styles.userName}>
          {user?.firstName || user?.emailAddresses[0]?.emailAddress || 'User'}
        </Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.placeholder}>
          Search and map features coming soon...
        </Text>
      </View>

      <TouchableOpacity style={styles.signOutButton} onPress={() => signOut()}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  userInfo: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  welcome: {
    fontSize: 14,
    color: '#666',
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1a1a1a',
    marginTop: 4,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholder: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
  signOutButton: {
    backgroundColor: '#ff4444',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 40,
  },
  signOutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
