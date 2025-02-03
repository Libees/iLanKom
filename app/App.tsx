import React, { useState } from 'react';
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
import { ConfigContext, config as configData } from './context/ConfigContext.tsx';
const Stack = createNativeStackNavigator<RootStackParamList>();

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
  const [config, setConfig] = useState(configData)
  return (
    <ConfigContext.Provider value={{ config, setConfig }}>
      <NavigationContainer >
        <Stack.Navigator>
          <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
          <Stack.Screen options={{ headerShown: false }} name='Config' component={ConfigScreen} />
          <Stack.Screen options={{ headerShown: false }} name='Comic' component={ComicScreen} />
          <Stack.Screen options={{ headerShown: false }} name='Read' component={ReadScreen} />
          <Stack.Screen options={{ headerShown: false }} name='Thumbs' component={ThumbList} />
        </Stack.Navigator>
      </NavigationContainer>
    </ConfigContext.Provider>


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
