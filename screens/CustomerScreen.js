import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CustomersListScreen from './CustomersListScreen';
import AddCustomerScreen from './AddCustomerScreen';
import ClientPaymentsScreen from './ClientPaymentsScreen';

const Stack = createStackNavigator();

export default function CustomerScreen() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="CustomersList" component={CustomersListScreen} />
            <Stack.Screen name="AddCustomer" component={AddCustomerScreen} />
            <Stack.Screen name="ClientPayments" component={ClientPaymentsScreen} />
        </Stack.Navigator>
    );
}
