import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import CharacterList from './CharacterList'; // Import your component
import { GET_CHARACTERS } from './graphql/queries'; // Import your GraphQL query

// Define a mock response for your GraphQL query
const mocks = [
  {
    request: {
      query: GET_CHARACTERS,
    },
    result: {
      data: {
        characters: {
          results: [
            { id: '1', name: 'Character 1', species: 'Species 1' },
            { id: '2', name: 'Character 2', species: 'Species 2' },
          ],
        },
      },
    },
  },
];

test('renders character list', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <CharacterList />
    </MockedProvider>
  );

  // Wait for the API call to resolve
  await waitFor(() => screen.getByText('Character List'));

  // Verify that the rendered data is as expected
  expect(screen.getByText('Character 1 - Species 1')).toBeInTheDocument();
  expect(screen.getByText('Character 2 - Species 2')).toBeInTheDocument();
});
