import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Connexion et  accueil
import HomeScreen from '../Screen/HomeScreen';
import SignInScreen from '../Screen/SignInScreen';
//Liste et tache
import TodoListsScreen from '../Screen/TodoListsScreen';
import TodoListDetailsScreen from '../Screen/TodoListDetailsScreen';
// Inscription et deconnexion
import SignUpScreen from '../Screen/SignUpScreen';
import SignOutScreen from '../Screen/SignOutScreen';

import { TokenContext } from '../Context/Context';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TodoListsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="TodoListsMain" 
        component={TodoListsScreen}
        options={{ title: 'Mes Listes' }}
      />
      <Stack.Screen 
        name="Details" 
        component={TodoListDetailsScreen}
        options={{ title: 'Détails de la liste' }}
      />
    </Stack.Navigator>
  );
}

export default function Navigation () {
  return (
    <TokenContext.Consumer>
      {([token, setToken]) => (
        <NavigationContainer>
          {token == null ? (
            <Tab.Navigator>
              <Tab.Screen 
                name='SignIn' 
                component={SignInScreen} 
                options={{ title:'SignIn'}} 
              />
              <Tab.Screen 
                name='SignUp' 
                component={SignUpScreen} 
                options={{ title:'SignUp'}} 
              />
            </Tab.Navigator>
          ) : (
            <Tab.Navigator>
              <Tab.Screen 
                name='Home' 
                component={HomeScreen} 
                options={{ title:'Home'}} 
              />
              <Tab.Screen 
                name='TodoLists' 
                component={TodoListsStack} 
                options={{ title:'Todos'}} 
              />
              <Tab.Screen 
                name='SignOut' 
                component={SignOutScreen} 
                options={{ title:'SignOut'}} 
              />
            </Tab.Navigator>
          )}
        </NavigationContainer>
      )}
    </TokenContext.Consumer>
  )
}

