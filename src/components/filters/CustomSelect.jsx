import { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { ChevronDown, ChevronUp, X } from 'lucide-react';

export function CustomSelect({
  value,
  onChange,
  placeholder = 'Select',
  options = []
}) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  const hasValue = Boolean(value);

  const handleToggle = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const handleSelect = useCallback(
    (option) => {
      onChange(option);
      setOpen(false);
    },
    [onChange]
  );

  const createSelectHandler = (option) => () => {
    handleSelect(option);
  };

  const handleClear = useCallback(
    (e) => {
      e.stopPropagation();
      onChange('');
      setOpen(false);
    },
    [onChange]
  );

  const handleClickOutside = useCallback((event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleClickOutside]);

  return (
    <Wrapper ref={wrapperRef}>
      <SelectBox onClick={handleToggle} disabled={hasValue}>
        <Text hasValue={hasValue}>{value || placeholder}</Text>
        <IconGroup>
          {hasValue && (
            <ClearButton onClick={handleClear}>
              <X size={14} />
            </ClearButton>
          )}
          {open ? (
            !hasValue ? (
              <ChevronUp size={16} className={hasValue ? 'disabled' : ''} />
            ) : (
              ''
            )
          ) : !hasValue ? (
            <ChevronDown size={16} className={hasValue ? 'disabled' : ''} />
          ) : (
            ''
          )}
        </IconGroup>
      </SelectBox>

      {open && (
        <Dropdown>
          {options.map((opt) => (
            <Option
              key={opt}
              onClick={createSelectHandler(opt)}
              selected={opt === value}
            >
              {opt}
            </Option>
          ))}
        </Dropdown>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

const SelectBox = styled.div`
  padding: 0.75em 0.5em;
  background: rgba(38, 55, 80, 1);
  border: 1px solid rgba(131, 191, 70, 1);
  border-radius: 8px;
  color: white;
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    background-color: ${(props) =>
      props.disabled ? 'rgba(38, 55, 80, 1)' : 'rgba(51, 68, 102, 1)'};
  }

  svg.disabled {
    opacity: 0.3;
    pointer-events: none;
  }
`;

const Text = styled.span`
  color: ${({ hasValue }) => (hasValue ? 'white' : 'grey')};
  font-size: 14px;
`;

const IconGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const ClearButton = styled.div`
  cursor: pointer;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #83bf46;
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: 105%;
  width: 100%;
  max-height: 12em;
  overflow-y: auto;
  background: white;
  border: 1px solid rgba(131, 191, 70, 1);
  border-radius: 8px;
  z-index: 10;
`;

const Option = styled.div`
  padding: 10px;
  cursor: pointer;
  color: black;
  font-weight: ${(props) => (props.selected ? '700' : '400')};

  &:hover {
    background-color: rgba(131, 191, 70, 0.2);
  }
`;
