import styled from 'styled-components';

import { PageWrapper } from '../../components/static';

const PageTitle = styled.h1`
  margin: 0 0 10px;
  color: #ffffff;
  font-size: 10rem;
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 600;
  opacity: 0.85;
  text-transform: uppercase;
`;

const Culinary = () => {
  return (
    <PageWrapper>
      <PageTitle>Culinary</PageTitle>
    </PageWrapper>
  );
};

export default Culinary;