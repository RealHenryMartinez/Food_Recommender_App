import { StatusBar } from 'expo-status-bar';
import SignedInRoutes from './routes/SignedInRoutes';
import React, { Provider } from 'react-redux';
import { store } from './store/Features/store';

export default function App() {
  return (
    <Provider store={store}>
      <SignedInRoutes />
    </Provider>
  );
}