import React, { useState } from 'react';
import { StyleSheet, Text, View} from 'react-native';
import Navigation from './Navigation/Navigation';
import { TokenContext, UsernameContext } from './Context/Context';

export default function App() {
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);

  return (
    <UsernameContext.Provider value={[username, setUsername]}>
      <TokenContext.Provider value={[token, setToken]}>
        <Navigation />
      </TokenContext.Provider>
    </UsernameContext.Provider>
  );
}

