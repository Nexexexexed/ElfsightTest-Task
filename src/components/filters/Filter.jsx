import styled from 'styled-components';
import { useData } from '../providers/index';
import { useCallback } from 'react';
import { CustomSelect } from './CustomSelect';

export function Filter() {
  const { filters, updateFilters, applyFilters, resetFilters } = useData();

  const handleInputChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      updateFilters({ [name]: value });
    },
    [updateFilters]
  );

  const createChangeHandler = useCallback(
    (name) => (value) => {
      updateFilters({ [name]: value });
    },
    [updateFilters]
  );

  const renderCustomSelect = (name, placeholder, options) => {
    return (
      <FilterGroup>
        <CustomSelect
          value={filters[name]}
          onChange={createChangeHandler(name)}
          placeholder={placeholder}
          options={options}
        />
      </FilterGroup>
    );
  };

  return (
    <FilterGrid>
      {renderCustomSelect('status', 'Status', ['Alive', 'Dead', 'Unknown'])}
      {renderCustomSelect('gender', 'Gender', [
        'Female',
        'Male',
        'Genderless',
        'Unknown'
      ])}
      {renderCustomSelect('species', 'Species', [
        'Human',
        'Alien',
        'Humanoid',
        'Robot',
        'Animal',
        'Unknown',
        'Poopybutthole',
        'Mythological Creature'
      ])}

      <FilterGroup>
        <Input
          type="text"
          name="name"
          value={filters.name}
          onChange={handleInputChange}
          placeholder="Name"
        />
      </FilterGroup>

      <FilterGroup>
        <Input
          type="text"
          name="type"
          value={filters.type}
          onChange={handleInputChange}
          placeholder="Type"
        />
      </FilterGroup>

      <ButtonsContainer>
        <ApplyButton onClick={applyFilters}>Apply</ApplyButton>
        <ResetButton onClick={resetFilters}>Reset</ResetButton>
      </ButtonsContainer>
    </FilterGrid>
  );
}

const FilterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 0.5em;

  @media (max-width: 530px) {
    grid-template-columns: 1fr;
  }
`;

const Input = styled.input`
  width: 100%;
  color: white;
  background-color: rgba(38, 55, 80, 1);
  border-radius: 8px;
  border: 1px solid rgba(131, 191, 70, 1);
  padding: 0.75em 0.5em;
  font-family: Arial, Helvetica, sans-serif;

  &:hover {
    background-color: rgba(51, 68, 102, 1);
  }

  &::placeholder {
    color: gray;
  }
`;

const FilterGroup = styled.div`
  width: 100%;
  position: relative;

  input,
  select {
    width: 100%;
    height: 100%;
    color: white;
    background-color: rgba(38, 55, 80, 1);
    border-radius: 8px;
    border: 1px solid rgba(131, 191, 70, 1);
    padding: 0.75em 0.5em;
  }

  select:hover,
  input:hover {
    background-color: rgba(51, 68, 102, 1);
  }

  input {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-self: flex-end;
  @media (max-width: 530px) {
    justify-content: normal;
    flex-direction: column;
  }
`;

const Button = styled.button`
  background-color: rgba(0, 24, 50, 1);
  padding: 0.75em 0.75em;
  border-radius: 8px;
  cursor: pointer;
  border: 1px solid transparent;
  min-width: 80px;
  transition: all 0.2s ease;
  width: 50%;

  @media (max-width: 530px) {
    width: 100%;
  }
`;

const ApplyButton = styled(Button)`
  color: rgba(131, 191, 70, 1);
  border-color: rgba(131, 191, 70, 1);
  &:hover {
    background-color: rgba(131, 191, 70, 1);
    color: white;
  }
`;

const ResetButton = styled(Button)`
  color: rgba(255, 81, 82, 1);
  border-color: rgba(255, 81, 82, 1);

  &:hover {
    background-color: rgba(255, 81, 82, 1);
    color: white;
  }
`;
