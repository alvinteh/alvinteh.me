import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Layout from '../../components/Layout';

import HeroBackground from './images/hero.jpg';

const Background = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background-image: url('${HeroBackground}');
  background-position: center;
  background-size: cover;
`;

const ContentWrapper = styled.div`
  position: absolute;
  top: 35%;
  left: 100px;
`;

const PageTitle = styled.h1`
  margin: 0 0 30px;
  color: #ffffff;
  font-size: 5rem;
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 600;
  opacity: 0.85;
  text-transform: uppercase;
`;

const Content = styled.div`
  font-size: 1.4rem;
`;

const ContentText = styled.p`
  margin: 0 0 20px;
`;

const ReturnButton = styled(Link)`
  display: inline-block;
  margin: 20px 0 0;
  border-radius: 1rem;
  padding: 0.2rem 1.1rem;
  height: 1.6rem;
  background: #ffffff;
  color: #303030;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  line-height: 1.6rem;
  text-transform: uppercase;
  transition: all cubic-bezier(0.525, 0.06, 0.11, 0.995) 400ms;

  &:hover {
    color: #ffffff;
    background: #303030;
  }
`;

const ErrorPage = () => {
  return (
    <>
      <Helmet>
        <title>Page Not Found</title>
      </Helmet>
      <Layout>
        <Background>
          <ContentWrapper>
            <PageTitle>Page Not Found</PageTitle>
            <Content>
              <ContentText>
                The page you were looking for could not be found.
              </ContentText>
              <ReturnButton to="/">Return home</ReturnButton>
            </Content>
          </ContentWrapper>
        </Background>
      </Layout>
    </>
  );
};

export default ErrorPage;