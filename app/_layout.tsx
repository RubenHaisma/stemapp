import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { QuestionnaireProvider } from '@/contexts/QuestionnaireContext';

export default function RootLayout() {
  useFrameworkReady();

  return (
    <QuestionnaireProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </QuestionnaireProvider>
  );
}
