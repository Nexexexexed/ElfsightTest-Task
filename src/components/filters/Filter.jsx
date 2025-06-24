import styled from 'styled-components';
import { useData } from '../providers/index';

export function Filter() {
  const { filters, updateFilters, applyFilters, resetFilters } = useData();

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFilters({ [name]: value });
  };

  return (
    <FiltersContainer>
      <FilterGroup>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={filters.name}
          onChange={handleChange}
          placeholder="Rick, Morty, etc."
        />
      </FilterGroup>

      <FilterGroup>
        <label>Status:</label>
        <select name="status" value={filters.status} onChange={handleChange}>
          <option value="">All</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>
      </FilterGroup>

      <FilterGroup>
        <label>Species:</label>
        <input
          type="text"
          name="species"
          value={filters.species}
          onChange={handleChange}
          placeholder="Human, Alien, etc."
        />
      </FilterGroup>

      <FilterGroup>
        <label>Type:</label>
        <input
          type="text"
          name="type"
          value={filters.type}
          onChange={handleChange}
          placeholder="Genetic experiment, etc."
        />
      </FilterGroup>

      <FilterGroup>
        <label>Gender:</label>
        <select name="gender" value={filters.gender} onChange={handleChange}>
          <option value="">All</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="genderless">Genderless</option>
          <option value="unknown">Unknown</option>
        </select>
      </FilterGroup>

      <ButtonsContainer>
        <ApplyButton onClick={applyFilters}>Apply Filters</ApplyButton>
        <ResetButton onClick={resetFilters}>Reset</ResetButton>
      </ButtonsContainer>
    </FiltersContainer>
  );
}

const FiltersContainer = styled.div`
  padding: 20px;
  background: #f5f5f5;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const FilterGroup = styled.div`
  margin-bottom: 15px;

  label {
    display: inline-block;
    width: 80px;
    margin-right: 10px;
  }

  input,
  select {
    padding: 5px;
    border-radius: 4px;
    border: 1px solid #ddd;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 15px;
`;

const Button = styled.button`
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  border: none;
  font-weight: bold;
`;

const ApplyButton = styled(Button)`
  background-color: #83bf46;
  color: white;

  &:hover {
    background-color: #72a93d;
  }
`;

const ResetButton = styled(Button)`
  background-color: #f5f5f5;
  border: 1px solid #ddd;

  &:hover {
    background-color: #e0e0e0;
  }
`;
