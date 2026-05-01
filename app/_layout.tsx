import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useTheme } from '../lib/theme';

export default function RootLayout() {
  const scheme = useColorScheme();
  const t = useTheme();
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: t.bg }}>
      <SafeAreaProvider>
        <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: t.bg },
            headerTitleStyle: { color: t.text },
            headerTintColor: t.accent,
            headerShadowVisible: false,
            contentStyle: { backgroundColor: t.bg },
          }}
        />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
