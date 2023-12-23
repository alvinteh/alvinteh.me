import { createContext, useContext, useState } from 'react';
import styled from 'styled-components';

interface AccordionContext {
  isCollapsed: boolean,
  setIsCollapsed: (isCollapsed: boolean) => void
}

const AccordionElement = styled.ul`
  position: relative;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const AccordionItemElement = styled.li<{ $isCollapsed: boolean }>`
  margin: 0 0 1rem;
  padding: 0;
`;

const AccordionItemHeaderElement = styled.h4<{ $isCollapsed: boolean }>`
  position: relative;
  margin: 0 0 5px;
  border-bottom: solid 1px #202020;
  padding: 0.2rem 1.5rem 0.5rem 0;
  min-height: 1.5rem;
  cursor: pointer;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.5rem;


  &::after {
    display: block;
    position: absolute;
    top: 50%;
    right: 0.5rem;
    margin: -1rem 0 0;
    content: "\\203A";
    transform: rotate(${(props) => { return props.$isCollapsed ? 90 : -90 }}deg);
    transition: transform 400ms ease-in-out;
  }
`;

const AccordionItemContentElement = styled.div<{ $isCollapsed: boolean }>`
  display: grid;
  margin: 0.3rem 0;
  padding: 0 5px;
  align-self: end;
  font-size: 1.4rem;
  line-height: 1.5rem;
  grid-template-rows: ${(props) => { return props.$isCollapsed ? 0 : 1 }}fr;
  transition: grid-template-rows 400ms ease-in-out;
`;

const AccordionItemContentWrapperElement = styled.div<{ $isCollapsed: boolean }>`
  min-height: 0;
  overflow: hidden;
  visibility: ${(props) => { return props.$isCollapsed ? 'hidden' : 'visible' }};
  transition: visibility 400ms ease-in-out;
`;

const AccordionContext = createContext<AccordionContext>({
  isCollapsed: true,
  // We can ignore the linting error as this will be set later
  // eslint-disable-next-line  @typescript-eslint/no-empty-function
  setIsCollapsed: (): void => {}
});

const AccordionItemHeader = ({ className, children }: { className?: string, children: React.ReactNode }) => {
  const { isCollapsed, setIsCollapsed } = useContext(AccordionContext);

  const handleClick = (): void => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <AccordionItemHeaderElement className={className} $isCollapsed={isCollapsed} onClick={handleClick}>
      {children}
    </AccordionItemHeaderElement>
  );
};

const AccordionItemContent = ({ className, children }: { className?: string, children: React.ReactNode }) => {
  const { isCollapsed } = useContext(AccordionContext);

  return (
    <AccordionItemContentElement className={className} $isCollapsed={isCollapsed}>
      <AccordionItemContentWrapperElement $isCollapsed={isCollapsed}>
       {children}
      </AccordionItemContentWrapperElement>
    </AccordionItemContentElement>
  );
};

const AccordionItem = ({ className, isCollapsed: isCollapsedDefault = true, children }: {
  className?: string,
  isCollapsed?: boolean,
  children: React.ReactNode,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(isCollapsedDefault);

  return (
    <AccordionContext.Provider value={{ isCollapsed, setIsCollapsed }}>
      <AccordionItemElement className={className} $isCollapsed={isCollapsed}>
          {children}
      </AccordionItemElement>
    </AccordionContext.Provider>
  );
};

const Accordion = ({ children }: { children: React.ReactNode }) => {
  return (
    <AccordionElement>
      {children}
    </AccordionElement>
  );
};

export default Accordion;
export {
  AccordionItem,
  AccordionItemHeader,
  AccordionItemContent,
};