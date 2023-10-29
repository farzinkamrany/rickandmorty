import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import client from '../graphql/client';
import { GET_CHARACTERS } from '../graphql/queries';
import store from './store';

interface Character {
  id: string;
  name: string;
  species: string;
  origin: {
    name: string;
  };
  status: string;
}

interface CharactersState {
  characters: Character[];
  loading: 'idle' | 'pending' | 'fulfilled' | 'rejected';
  error: string | null;
}

const initialState: CharactersState = {
  characters: [],
  loading: 'idle',
  error: null,
};

export const fetchCharacters = createAsyncThunk('characters/fetchCharacters', async () => {
  try {
    const response = await client.query({
      query: GET_CHARACTERS,
    });
    return response.data.characters.results;
  } catch (error) {
    throw error;
  }
});

const characterSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        state.characters = action.payload;
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.loading = 'rejected';
      });
  },
});

export default characterSlice.reducer;
export type RootState = ReturnType<typeof store.getState>;
