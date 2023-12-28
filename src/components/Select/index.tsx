import styled from 'styled-components';

import { Option } from './types';

const StyledSelect = styled.select`
  margin: 0;
  padding: 0.1rem;
  background: none;
  font-family: Lato, sans-serif;
  font-size: 1rem;

  &:focus {
    outline: none;
  }
`;

const Select = ({ name, defaultOptionLabel, defaultOptionValue, options, className, onChange }: {
  name: string,
  defaultOptionLabel: string,
  defaultOptionValue?: string | number,
  options: Option[],
  className?: string,
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
}) => {
  const optionElements: React.ReactNode[] = options.map((option: Option): React.ReactNode => {
    return <option key={option.value} value={option.value}>{option.label ?? option.value}</option>;
  });

  return (
    <StyledSelect name={name} className={className ?? ''} onChange={onChange ? onChange : undefined}>
      <option value={defaultOptionValue ?? ''}>{defaultOptionLabel}</option>
      {optionElements}
    </StyledSelect>
  );
};

export default Select;
