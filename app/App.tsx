import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './pages/Home/Home.tsx';
import Config from './pages/Config/Config.tsx'
import Comic from './pages/Comic/Comic.tsx';
import Read from './pages/Read/Read.tsx'
import ThumbList from './pages/ThumbList/ThumbList.tsx';
import storage from './utils/storage.tsx';
import { CONFIG_STORAGE_KEY } from './constansts/config.ts'
import { setStoreAuth, setStoreIp, store } from './redux/redux.ts';
const Stack = createNativeStackNavigator<RootStackParamList>();
storage.load({
  key: CONFIG_STORAGE_KEY,
}).then(res => {
  console.log('storage----------', res)
  store.dispatch(setStoreIp(res.ip))
  store.dispatch(setStoreAuth(res.auth))
}).catch(err => {
  console.log(err)
  console.log(store.getState())
})
function ReadScreen() {
  return (
    <SafeAreaView style={styles.main}>
      <Read />
    </SafeAreaView>
  )
}

function ConfigScreen() {
  return (
    <SafeAreaView style={styles.main}>
      <Config />
    </SafeAreaView>
  )
}

function HomeScreen() {
  return (
    <SafeAreaView style={styles.main}>
      <Home />
    </SafeAreaView>
  )
}

function ComicScreen() {
  return (
    <SafeAreaView style={styles.main}>
      <Comic />
    </SafeAreaView>
  )
}

function ThumbScreen() {
  return (
    <SafeAreaView style={styles.main}>
      <ThumbList />
    </SafeAreaView>
  )
}

function App(): React.JSX.Element {
  return (
    <NavigationContainer >
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
        <Stack.Screen options={{ headerShown: false }} name='Config' component={ConfigScreen} />
        <Stack.Screen options={{ headerShown: false }} name='Comic' component={ComicScreen} />
        <Stack.Screen options={{ headerShown: false }} name='Read' component={ReadScreen} />
        <Stack.Screen options={{ headerShown: false }} name='Thumbs' component={ThumbList} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create(
  {
    main: {
      flex: 1
    }
  }
)

export default App;
