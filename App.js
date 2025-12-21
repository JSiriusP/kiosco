import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LayoutDashboard, CreditCard, Users } from 'lucide-react-native';

import DashboardScreen from './screens/DashboardScreen';
import PaymentScreen from './screens/PaymentScreen';
import CustomerScreen from './screens/CustomerScreen';

import { initDB } from './database/db';

import TestPaymentsScreen from './screens/TestPaymentsScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  React.useEffect(() => {
    initDB().then(() => console.log('Database initialized')).catch(e => console.error(e));
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let IconComponent;

              if (route.name === 'Dashboard') {
                IconComponent = LayoutDashboard;
              } else if (route.name === 'Payment') {
                IconComponent = CreditCard;
              } else if (route.name === 'Customer') {
                IconComponent = Users;
              } else if (route.name === 'Debug') {
                 // Reuse Dashboard icon or any other since it's temp
                 IconComponent = LayoutDashboard;
              }

              return <IconComponent color={color} size={size} />;
            },
            tabBarActiveTintColor: '#6C63FF', // Example primary color
            tabBarInactiveTintColor: 'gray',
            headerShown: false,
          })}
        >
          <Tab.Screen name="Dashboard" component={DashboardScreen} />
          <Tab.Screen name="Payment" component={PaymentScreen} />
          <Tab.Screen name="Customer" component={CustomerScreen} />
          <Tab.Screen name="Debug" component={TestPaymentsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
