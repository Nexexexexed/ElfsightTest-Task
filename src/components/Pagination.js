import styled from 'styled-components';
import { useData } from './providers';

export function Pagination() {
  const { info, currentPage, updatePage } = useData();

  if (!info?.pages || info.pages <= 1) return null;

  const handlePageClick = (pageNumber) => {
    updatePage(pageNumber);
  };

  return (
    <StyledPagination>
      {currentPage > 1 && (
        <>
          <Page onClick={() => handlePageClick(1)}>« First</Page>
          {currentPage > 2 && <Ellipsis>...</Ellipsis>}
        </>
      )}

      {currentPage > 1 && (
        <Page onClick={() => handlePageClick(currentPage - 1)}>
          {currentPage - 1}
        </Page>
      )}

      <Page active>{currentPage}</Page>

      {currentPage < info.pages && (
        <Page onClick={() => handlePageClick(currentPage + 1)}>
          {currentPage + 1}
        </Page>
      )}

      {currentPage < info.pages - 1 && (
        <>
          {currentPage < info.pages - 2 && <Ellipsis>...</Ellipsis>}
          <Page onClick={() => handlePageClick(info.pages)}>Last »</Page>
        </>
      )}
    </StyledPagination>
  );
}

const StyledPagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 20px 0;
  flex-wrap: wrap;
`;

const Page = styled.span`
  color: #fff;
  font-size: 18px;
  padding: 5px 10px;
  cursor: pointer;
  transition: all 0.2s;
  border-radius: 4px;
  ${({ active }) =>
    active &&
    `
    color: #83bf46;
    font-weight: bold;
    transform: scale(1.1);
  `};

  &:hover {
    color: #83bf46;
    background: rgba(255, 255, 255, 0.1);
  }
`;

const Ellipsis = styled(Page)`
  cursor: default;
  &:hover {
    color: #fff;
    background: transparent;
  }
`;
