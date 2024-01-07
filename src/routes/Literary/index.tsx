import styled from 'styled-components';

import { PaddedPageWrapper } from '../../components/static';

const PageTitle = styled.h1`
  margin: 0 0 10px;
  color: #ffffff;
  font-size: 10rem;
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 600;
  opacity: 0.85;
  text-transform: uppercase;
`;

const Literary = () => {
  return (
    <PaddedPageWrapper>
      <PageTitle>Literary</PageTitle>
    </PaddedPageWrapper>
  );
};

export default Literary;