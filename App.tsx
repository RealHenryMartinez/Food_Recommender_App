import { StatusBar } from 'expo-status-bar';
import SignedInRoutes from './routes/SignedInRoutes';
import React, { Provider } from 'react-redux';
import { store } from './store/Features/store';
import HandleRoutes from './routes/HandleRoutes';

export default function App() {
  return (
    <>
    <Provider store={store}>
      <HandleRoutes />
    </Provider>
    </>
    
  );
}