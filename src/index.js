import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Post from "./components/Post";
import CadastrarScreen from "./screens /CadastrarScreen";
import LoginScreen from "./screens /LoginScreen";
import HomeScreen from "./screens /HomeScreen";
import SocialScreen from "./screens /SocialScreen";

export default function RootNavigation() {
  const Tab = createNativeStackNavigator();

  return (
    <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
          name="Cadastro"
          component={CadastrarScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="TabsNavigation"
          component={TabsNavigation}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const Tabs = createMaterialBottomTabNavigator();

function TabsNavigation() {
  return (
    <Tabs.Navigator
      // cardStyle={{backgroundColor:'transparent'}}
      screenOptions={{
        headerStyle: {
          backgroundColor: '#00305A',
        },

        headerTitleStyle: {
          color: '#00305A'
        },

        headerTintColor: '#fff',

      }}
    >
      <Tabs.Screen
        name="Social"
        component={SocialScreen}
        options={{
          tabBarLabel: "Home",
          headerShown: false
        }}
      />
      <Tabs.Screen
        name="Post"
        component={Post}
        options={{
          tabBarLabel: "Post",
          headerShown: false
        }}
      />
    </Tabs.Navigator>
  );
}