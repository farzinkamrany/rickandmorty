import React from 'react';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client'
import store from './redux/store';
import client from './graphql/client';
import CharacterList from './characterList';

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <div className="App">
          <CharacterList />
        </div>
      </Provider>
    </ApolloProvider>
  );
};

export default App;




