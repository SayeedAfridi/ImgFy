import React from 'react';
import App from './AppProvider';
import { ThemeProvider } from '@shopify/restyle';
import theme from '@app/lib/theme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { isAndroid } from '@app/constants/platform.constants';
import { ModelProvider } from '@app/context/model';

const AppProvider: React.FC = () => {
  return (
    <ModelProvider>
      <SafeAreaProvider>
        <StatusBar
          barStyle={isAndroid ? 'light-content' : 'dark-content'}
          translucent={true}
        />
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </SafeAreaProvider>
    </ModelProvider>
  );
};

export default AppProvider;
