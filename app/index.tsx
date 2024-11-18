import { StyleSheet, View, SafeAreaView, Text } from 'react-native';


import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (

    <SafeAreaProvider>
      <SafeAreaView>
        <View><Text>First part and </Text></View> 
      </SafeAreaView>
    </SafeAreaProvider>
    
  );
}

// const styles = StyleSheet.create({
//   titleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   stepContainer: {
//     gap: 8,
//     marginBottom: 8,
//   },
//   reactLogo: {
//     height: 178,
//     width: 290,
//     bottom: 0,
//     left: 0,
//     position: 'absolute',
//   },
// });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  }});
