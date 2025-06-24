import axios from 'axios';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';

const BASE_API_URL = 'https://rickandmortyapi.com/api/character';

export function DataProvider({ children }) {
  const [characters, setCharacters] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [info, setInfo] = useState({});
  const [currentPage, setCurrentPage] = useState(1); // Единая система нумерации (начинается с 1)
  const [filters, setFilters] = useState({
    name: '',
    status: '',
    species: '',
    type: '',
    gender: ''
  });
  const [appliedFilters, setAppliedFilters] = useState({}); // Отдельное состояние для применённых фильтров

  const buildApiUrl = useCallback(() => {
    const params = new URLSearchParams();

    Object.entries(appliedFilters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });

    params.append('page', currentPage);

    return `${BASE_API_URL}/?${params.toString()}`;
  }, [appliedFilters, currentPage]);

  const fetchData = useCallback(async () => {
    setIsFetching(true);
    setIsError(false);

    try {
      const url = buildApiUrl();
      const { data } = await axios.get(url);

      setCharacters(data.results || []);
      setInfo(data.info || {});

      if (currentPage > (data.info?.pages || 1)) {
        setCurrentPage(1);
      }
    } catch (e) {
      setIsError(true);
      setCharacters([]);
      console.error('API Error:', e);
    } finally {
      setIsFetching(false);
    }
  }, [buildApiUrl, currentPage]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const applyFilters = useCallback(() => {
    setAppliedFilters(filters);
    setCurrentPage(1);
  }, [filters]);

  const updateFilters = useCallback((newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  }, []);

  const updatePage = useCallback((page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      name: '',
      status: '',
      species: '',
      type: '',
      gender: ''
    });
    setAppliedFilters({});
    setCurrentPage(1);
  }, []);

  const dataValue = useMemo(
    () => ({
      characters,
      isFetching,
      isError,
      info,
      filters,
      currentPage,
      updateFilters,
      applyFilters,
      resetFilters,
      updatePage
    }),
    [
      characters,
      isFetching,
      isError,
      info,
      filters,
      currentPage,
      updateFilters,
      applyFilters,
      resetFilters,
      updatePage
    ]
  );

  return (
    <DataContext.Provider value={dataValue}>{children}</DataContext.Provider>
  );
}

const DataContext = createContext({});

export const useData = () => useContext(DataContext);
