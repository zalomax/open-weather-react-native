import { StatusBar } from 'expo-status-bar'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './src/app/Home/HomeScreen'
import CityScreen from './src/app/City/CityScreen'
import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <AutocompleteDropdownContextProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="City" component={CityScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </AutocompleteDropdownContextProvider>
      <StatusBar style="auto" />
    </>
  );
}