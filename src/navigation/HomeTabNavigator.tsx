import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

// Importe suas telas de cada aba
import HomeScreen from '../screens/HomeScreen';
import AppointmentListScreen from '../screens/Appointments/AppointmentListScreen';
import ProductListScreen from '../screens/Products/ProductListScreen';
import ClientListScreen from '../screens/Clients/ClientListScreen'; 

import { globalStyles, colors } from '../styles/globalStyles';

const Tab = createBottomTabNavigator();

const HomeTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false, 
        tabBarActiveTintColor: colors.secondary,
        tabBarInactiveTintColor: colors.text,
        tabBarStyle: {
          backgroundColor: colors.primary,
          borderTopColor: colors.border,
          height: 60, 
          paddingBottom: 5,
          paddingTop: 5,
        },
        tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: 'bold',
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Início') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Agendamentos') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Estoque') {
            iconName = focused ? 'cube' : 'cube-outline';
          } else if (route.name === 'Clientes') {
            iconName = focused ? 'people' : 'people-outline';
          } else {
            iconName = 'help-circle';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Início" component={HomeScreen} />
      <Tab.Screen name="Agendamentos" component={AppointmentListScreen} />
      <Tab.Screen name="Estoque" component={ProductListScreen} />
      <Tab.Screen name="Clientes" component={ClientListScreen} />
    </Tab.Navigator>
  );
};

export default HomeTabNavigator;