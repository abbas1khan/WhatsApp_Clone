import { StatusBar, View, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import persistStore from 'redux-persist/es/persistStore';
import { PersistGate } from 'redux-persist/integration/react';
import MainAppNavigation from './src/navigation/MainAppNavigation';
import { colors } from './src/utils/Theme';
import { store } from './src/redux/store';
import { PaperProvider } from 'react-native-paper';

export default function App() {

  let persister = persistStore(store)

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.background} barStyle="light-content" />
      <SafeAreaProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persister}>
            <PaperProvider>
              <NavigationContainer>
                <MainAppNavigation />
              </NavigationContainer>
            </PaperProvider>
          </PersistGate>
        </Provider>
      </SafeAreaProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});