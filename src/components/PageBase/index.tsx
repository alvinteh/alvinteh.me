import { useEffect, useRef } from 'react';

import { ParallaxPageWrapper } from '../../components/static';
import PageContext from '../../utils/PageContext';
import { setPageTitle } from '../../utils/PageUtils';
import ScrollPrompt from '../ScrollPrompt';

const PageBase = ({ titleSuffix, shouldHaveScrollPrompt, children }: {
  titleSuffix: string,
  shouldHaveScrollPrompt: boolean,
  children: React.ReactNode
}) => {
  const pageRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;

  useEffect((): void => {
    setPageTitle(titleSuffix);
  });

  return (
    <PageContext.Provider value={{ titleSuffix }}>
      <ParallaxPageWrapper ref={pageRef}>
        {children}
        {shouldHaveScrollPrompt && <ScrollPrompt pageRef={pageRef} />}
      </ParallaxPageWrapper>
    </PageContext.Provider>
  );
};

export default PageBase;