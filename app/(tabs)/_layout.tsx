import { Tabs } from 'expo-router';
import { PlayCircle, Vote, ChartBar as BarChart3, Info } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerTransparent: false,
        headerTitle: 'De StemApp',
        headerStyle: {
          backgroundColor: '#ffffff',
        },
        headerTintColor: '#000000',
        headerTitleStyle: {
          fontWeight: '700',
          color: '#000000',
        },
        tabBarActiveTintColor: '#0ea5e9',
        tabBarInactiveTintColor: '#737373',
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
        tabBarStyle: {
          position: 'absolute',
          marginHorizontal: 16,
          marginBottom: 8,
          height: 64,
          borderRadius: 20,
          backgroundColor: 'rgba(255,255,255,0.95)',
          borderTopWidth: 0,
          shadowColor: '#000000',
          shadowOpacity: 0.08,
          shadowRadius: 16,
          shadowOffset: { width: 0, height: 8 },
          elevation: 0,
        },
        tabBarItemStyle: {
          paddingVertical: 6,
        },
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Start',
          tabBarIcon: ({ size, color }) => <PlayCircle size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="questionnaire"
        options={{
          title: 'De StemAPP',
          tabBarIcon: ({ size, color }) => <Vote size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="results"
        options={{
          title: 'Resultaten',
          tabBarIcon: ({ size, color }) => <BarChart3 size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="parties"
        options={{
          title: 'Partijen',
          tabBarIcon: ({ size, color }) => <Info size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}

