import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCharacters, RootState } from './redux/characterSlice';
import { Character } from '../types'; // Import the Character type
import { AppDispatch } from './redux/store';
import { Typography, Spin, List } from 'antd';
const CharacterList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>(); // Use AppDispatch to correctly type dispatch
  const characters: Character[] = useSelector((state: RootState) => state.characters.characters); // Use the RootState type
  const loading = useSelector((state: RootState) => state.characters.loading); // Use the RootState type

  useEffect(() => {
    if (loading === 'idle') {
      dispatch(fetchCharacters());
    }
  }, [loading, dispatch]);

  if (loading === 'pending') {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: '16px' }}>
    <Typography>Character List</Typography>
    <List
      dataSource={characters}
      renderItem={(character) => (
        <List.Item>
          <Typography>{character.name}</Typography>
          <br />
          <Typography>
            Species: {character.species}
          </Typography>
        </List.Item>
      )}
    />
  </div>
  );
};

export default CharacterList;
