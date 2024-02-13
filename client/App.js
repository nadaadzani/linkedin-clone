import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Pressable } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { FontAwesome6 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import Login from './screens/Login';
import Register from './screens/Register';
import Home from './screens/Home';
import PostCreation from './screens/PostCreation';
import PostDetail from './screens/PostDetail';
import Profile from './screens/Profile';
import AppStack from './stacks/AppStack';
import { ApolloProvider } from '@apollo/client';
import client from './configs/apollo';
import { PaperProvider } from 'react-native-paper';
import { LoginProvider } from './contexts/LoginContext';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function bottomTab() {
  return (
    ({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused
            ? 'home'
            : 'home-outline'
        } else if (route.name === 'Create') {
          iconName = focused ? 'pluscircle' : 'pluscircleo';

          return <AntDesign name={iconName} size={size} color={color} />
        } else if (route.name === 'My Network') {
          iconName = focused ? 'user-group' : 'user-group'

          return <FontAwesome6 name={iconName} size={size} color={color} />
        } else if (route.name === 'Notifications') {
          iconName = focused ? 'notifications-sharp' : 'notifications-outline'
        } else if (route.name === 'Jobs') {
          iconName = focused ? 'bag-sharp' : 'bag-sharp'
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#24548B',
      tabBarInactiveTintColor: 'gray',
      headerShown: false
    })
  )
}

function PostHeader() {
  return (
    ({ navigation }) => ({
      headerLeft: () => (<View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 4, }}>
        <Pressable onPress={() => { navigation.navigate('Profile') }}>
          <Image
            style={{ width: 40, height: 40, borderRadius: 32 }}
            source={{
              uri: "https://zultimate.com/wp-content/uploads/2019/12/default-profile.png",
            }}
          />
        </Pressable>
        <TextInput style={{ width: 222, color: 'gray', backgroundColor: '#DEDEDE', height: 32, marginLeft: 18, borderRadius: 6, paddingLeft: 8, fontSize: 16 }} placeholder='Search' />
        <Ionicons name="chatbubble-ellipses" size={28} color="black" style={{ marginLeft: 14 }} />
      </View>),
      headerTitle: '',
      headerStyle: { height: 30 }
    })
  )
}

function PostStack() {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen name="PostCreation" component={PostCreation} options={({ navigation }) => ({
          headerLeft: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 4 }}>
              <Pressable onPress={() => { navigation.navigate('Home') }}>
                <AntDesign name="close" size={24} color="black" />

              </Pressable>

              <Image source={{ uri: "https://zultimate.com/wp-content/uploads/2019/12/default-profile.png" }} style={{ width: 40, height: 40, marginLeft: 20, borderRadius: 24 }} />
              <Text style={{ fontSize: 16, fontWeight: '600', marginLeft: 8 }}>Anyone</Text>
              <AntDesign name="caretdown" size={10} color="black" style={{ marginLeft: 4 }} />

              <AntDesign name="clockcircleo" size={24} color="black" style={{ marginLeft: 74 }} />

              <Pressable>
                <Text style={{ marginLeft: 24, fontSize: 18, fontWeight: '600' }}>Post</Text>
              </Pressable>
            </View>
          ),
          headerTitle: ''
        })} />
      </Stack.Navigator>
    </>
  )
}

function HomeStack() {
  return (
    <>
      <Stack.Navigator initialRouteName='Posts'>
        <Stack.Screen name='Posts' component={Home} options={PostHeader()} />
        <Stack.Screen name='PostDetail' component={PostDetail} options={{ headerTitle: 'Details' }} />
        <Stack.Screen name='Profile' component={Profile} />
      </Stack.Navigator>
    </>
  )
}

export default function App() {
  const [currentPage, setCurrentPage] = useState("")

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <SafeAreaView style={{ flex: 1 }}>
          <ApolloProvider client={client}>
            <PaperProvider>
              <LoginProvider>
                <StatusBar style="auto" />
                <AppStack />
              </LoginProvider>
            </PaperProvider>
          </ApolloProvider>
        </SafeAreaView>
      </NavigationContainer>
    </SafeAreaProvider >
  );
}

const styles = StyleSheet.create({

});
