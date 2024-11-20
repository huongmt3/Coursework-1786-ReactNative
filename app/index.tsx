import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import YogaClassScreen from '@/screens/YogaClassScreen';
import ClassDetailsScreen from '@/screens/ClassDetailsScreen';

const Stack = createNativeStackNavigator();

export default function HomeScreen() {
  return (
    // <NavigationContainer>
    <Stack.Navigator initialRouteName="Classes">
      <Stack.Screen name="Classes" component={YogaClassScreen} />
      <Stack.Screen name="Details" component={ClassDetailsScreen} />
    </Stack.Navigator>
    // </NavigationContainer>
  );
}
