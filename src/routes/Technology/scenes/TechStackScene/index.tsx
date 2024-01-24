import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { useContext, useRef } from 'react';
import styled from 'styled-components';

import PageContext from '../../../../components/Page/PageContext';
import Screen from '../../../../components/Screen';
import { Overlay, PaddedPageWrapper } from '../../../../components/static';
import { animationDurations } from '../../../../utils/AnimationUtils';
import { SceneProps } from '../../../../utils/SceneUtils';

import SceneBackground from './images/scene-background.jpg';

const StyledScreen = styled(Screen)`
  a, a:visited {
    color: #ffffff;
  }

  a:hover {
    color: #80f5f5;
  }
`;

const Header = styled.h1`
  margin: 0 0 3rem;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 4rem;
  line-height: 4rem;
  overflow: hidden;
  text-transform: uppercase;
  white-space: nowrap;
`;

const Content = styled.div`
  padding-top: 10vh;
  max-width: 75rem;
`;

const SubHeader = styled.h3`
  margin: 0 0 2rem;
  padding: 0 0 5px;
  border-bottom: solid 1px #ffffff;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 2rem;
  line-height: 2rem;
  overflow: hidden;
  text-transform: uppercase;
  white-space: nowrap;
`;

const Technologies = styled.ul`
  display: flex;
  margin: 0 0 50px;
  padding: 0;
  flex-wrap: wrap;
  list-style: none;
`;

const Tech = styled.li`
  margin: 0 20px 10px 0;
  padding: 0;
  width: 150px;
  height: 1.5rem;
  font-family: Lato, sans-serif;
  font-size: 1.2rem;
  line-height: 1.5rem;
`;

const TechStackScene = ({ sceneIndex }: SceneProps) => {
  const { registerScene } = useContext(PageContext);

  // Screen refs
  const screenRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
  const mainHeaderRef = useRef<HTMLHeadingElement>() as React.MutableRefObject<HTMLHeadingElement>;
  const languagesHeaderRef = useRef<HTMLHeadingElement>() as React.MutableRefObject<HTMLHeadingElement>;
  const languagesRef = useRef<HTMLUListElement>() as React.MutableRefObject<HTMLUListElement>;
  const databasesHeaderRef = useRef<HTMLHeadingElement>() as React.MutableRefObject<HTMLHeadingElement>;
  const databasesRef = useRef<HTMLUListElement>() as React.MutableRefObject<HTMLUListElement>;
  const infraHeaderRef = useRef<HTMLHeadingElement>() as React.MutableRefObject<HTMLHeadingElement>;
  const infraRef = useRef<HTMLUListElement>() as React.MutableRefObject<HTMLUListElement>;
  const othersHeaderRef = useRef<HTMLHeadingElement>() as React.MutableRefObject<HTMLHeadingElement>;
  const othersRef = useRef<HTMLUListElement>() as React.MutableRefObject<HTMLUListElement>;

  // Screen animation
  useGSAP((): void => {
    const timeline: gsap.core.Timeline = gsap.timeline({});

    timeline.fromTo(mainHeaderRef.current, {
      maxWidth: 0,
    }, {
      maxWidth: '100%',
      duration: animationDurations.MEDIUM,
      ease: 'power1.inOut',
    });

    // Note we need this line as GSAP doesn't respect maxWidth 0 in the previous line
    timeline.set(mainHeaderRef.current, { maxWidth: 0 }, '<');

    const contentSets: ({
      headerRef: React.MutableRefObject<HTMLHeadingElement>,
      listRef: React.MutableRefObject<HTMLUListElement>
    })[] = [
      { headerRef: languagesHeaderRef, listRef: languagesRef },
      { headerRef: databasesHeaderRef, listRef: databasesRef },
      { headerRef: infraHeaderRef, listRef: infraRef },
      { headerRef: othersHeaderRef, listRef: othersRef },
    ];

    for (const contentSet of contentSets) {
      timeline.fromTo(contentSet.headerRef.current, {
        maxWidth: 0,
      }, {
        maxWidth: '100%',
        duration: animationDurations.MEDIUM,
        ease: 'power1.inOut',
      });
  
      timeline.from(contentSet.listRef.current.children, {
        opacity: 0,
        filter: 'blur(2rem)',
        duration: animationDurations.FAST,
        ease: 'power1.inOut',
        stagger: animationDurations.XXFAST,
      });
    }

    timeline.addLabel(`scene-${sceneIndex}-intro`);

    registerScene(sceneIndex, screenRef, timeline, 'Technology Stack');
  }, []);

  return (
    <StyledScreen innerRef={screenRef} backgroundImage={SceneBackground}>
      <Overlay $isEventBlocking={false}>
        <PaddedPageWrapper>
          <Content>
            <Header ref={mainHeaderRef}>Technologies I Work With</Header>
            <SubHeader ref={languagesHeaderRef}>Languages</SubHeader>
            <Technologies ref={languagesRef}>
              <Tech><a href="https://html.spec.whatwg.org" rel="external noreferrer">HTML + CSS</a></Tech>
              <Tech><a href="https://www.typescriptlang.org" rel="external noreferrer">JS/TypeScript</a></Tech>
              <Tech><a href="https://nodejs.org" rel="external noreferrer">node.js</a></Tech>
              <Tech><a href="https://www.python.org" rel="external noreferrer">Python</a></Tech>
              <Tech><a href="https://www.php.net" rel="external noreferrer">PHP</a></Tech>
              <Tech><a href="https://go.dev" rel="external noreferrer">Go</a></Tech>
              <Tech><a href="https://www.java.com" rel="external noreferrer">Java</a></Tech>
            </Technologies>
            <SubHeader ref={databasesHeaderRef}>Databases</SubHeader>
            <Technologies ref={databasesRef}>
              <Tech><a href="https://www.postgresql.org" rel="external noreferrer">PostgreSQL</a></Tech>
              <Tech><a href="https://www.mysql.com" rel="external noreferrer">MySQL <small>(Sun-certified)</small></a></Tech>
              <Tech><a href="https://www.microsoft.com/sql-server" rel="external noreferrer">SQL Server</a></Tech>
              <Tech><a href="https://aws.amazon.com/dynamodb" rel="external noreferrer">DynamoDB</a></Tech>
              <Tech><a href="https://www.mongodb.com" rel="external noreferrer">mongo</a></Tech>
              <Tech><a href="https://redis.io" rel="external noreferrer">Redis</a></Tech>
              <Tech><a href="https://neo4j.com" rel="external noreferrer">neo4j</a></Tech>
              <Tech><a href="https://aws.amazon.com/redshift" rel="external noreferrer">Redshift</a></Tech>
            </Technologies>
            <SubHeader ref={infraHeaderRef}>DevOps &amp; Infrastructure</SubHeader>
            <Technologies ref={infraRef}>
              <Tech><a href="https://aws.amazon.com" rel="external noreferrer">AWS <small>(11x certified)</small></a></Tech>
              <Tech><a href="https://azure.microsoft.com" rel="external noreferrer">Azure</a></Tech>
              <Tech><a href="https://cloud.google.com" rel="external noreferrer">Google Cloud</a></Tech>
              <Tech><a href="https://www.vmware.com" rel="external noreferrer">VMware</a></Tech>
              <Tech><a href="https://tanzu.vmware.com/" rel="external noreferrer">Tanzu</a></Tech>
              <Tech><a href="https://github.com" rel="external noreferrer">GitHub</a></Tech>
              <Tech><a href="https://www.atlassian.com" rel="external noreferrer">Atlassian suite</a></Tech>
              <Tech><a href="https://www.jenkins.io" rel="external noreferrer">Jenkins</a></Tech>
              <Tech><a href="https://kubernetes.io" rel="external noreferrer">Kubernetes</a></Tech>
              <Tech><a href="https://prometheus.io" rel="external noreferrer">Prometheus</a></Tech>
              <Tech><a href="https://grafana.com" rel="external noreferrer">Grafana</a></Tech>
              <Tech><a href="https://helm.sh" rel="external noreferrer">Helm</a></Tech>
              <Tech><a href="https://www.elastic.co" rel="external noreferrer">ELK/EFK</a></Tech>
              <Tech><a href="https://www.jaegertracing.io" rel="external noreferrer">Jaeger</a></Tech>
              <Tech><a href="https://newrelic.com" rel="external noreferrer">New Relic</a></Tech>
              <Tech><a href="https://istio.io" rel="external noreferrer">Istio</a></Tech>
              <Tech><a href="https://www.sonarsource.com/products/sonarqube/" rel="external noreferrer">Sonarqube</a></Tech>
              <Tech><a href="https://www.microfocus.com/en-us/cyberres/application-security/webinspect" rel="external noreferrer">Fortify</a></Tech>
              <Tech><a href="https://www.paloaltonetworks.com/prisma/cloud" rel="external noreferrer">Twistlock</a></Tech>
              <Tech><a href="https://jfrog.com/artifactory" rel="external noreferrer">Artifactory</a></Tech>
              <Tech><a href="https://www.chef.io" rel="external noreferrer">Chef</a></Tech>
            </Technologies>
            <SubHeader ref={othersHeaderRef}>Others</SubHeader>
            <Technologies ref={othersRef}>
              <Tech><a href="https://www.rabbitmq.com" rel="external noreferrer">RabbitMQ</a></Tech>
              <Tech><a href="https://kafka.apache.org" rel="external noreferrer">Kafka</a></Tech>
              <Tech><a href="https://graphql.org" rel="external noreferrer">GraphQL</a></Tech>
              <Tech><a href="https://grpc.io" rel="external noreferrer">gRPC</a></Tech>
              <Tech><a href="https://react.dev" rel="external noreferrer">React</a></Tech>
              <Tech><a href="https://reactnative.dev" rel="external noreferrer">React Native</a></Tech>
              <Tech><a href="https://www.selenium.dev" rel="external noreferrer">Selenium</a></Tech>
              <Tech><a href="https://appium.io" rel="external noreferrer">Appium</a></Tech>
              <Tech><a href="https://amplitude.com" rel="external noreferrer">Amplitude</a></Tech>
              <Tech><a href="https://mixpanel.com" rel="external noreferrer">Mixpanel</a></Tech>
              <Tech><a href="https://www.contentful.com" rel="external noreferrer">Contentful</a></Tech>
              <Tech><a href="https://firebase.google.com" rel="external noreferrer">Firebase</a></Tech>
              <Tech><a href="https://gohugo.io" rel="external noreferrer">Hugo</a></Tech>
              <Tech><a href="https://www.twilio.com" rel="external noreferrer">Twilio</a></Tech>
            </Technologies>
          </Content>
        </PaddedPageWrapper>
      </Overlay>
    </StyledScreen>
  );
};

export default TechStackScene;