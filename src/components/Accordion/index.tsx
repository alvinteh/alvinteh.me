import { createContext, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';

interface AccordionContext {
  activeItemId: string,
  setActiveItemId: (itemId: string) => void,
}

interface AccordionItemContext {
  itemId: string,
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
  activeItemId: '',
  // We can ignore the linting error as this will be set later
  // eslint-disable-next-line  @typescript-eslint/no-empty-function
  setActiveItemId: (): void => {},
});

const AccordionItemContext = createContext<AccordionItemContext>({
  itemId: '',
  isCollapsed: true,
  // We can ignore the linting error as this will be set later
  // eslint-disable-next-line  @typescript-eslint/no-empty-function
  setIsCollapsed: (): void => {}
});

const Accordion = ({ children }: { children: React.ReactNode }) => {
  const [activeItemId, setActiveItemId] = useState('');

  return (
    <AccordionContext.Provider value={{ activeItemId, setActiveItemId }}>
      <AccordionElement>
        {children}
      </AccordionElement>
    </AccordionContext.Provider>
  );
};


const AccordionItem = ({ className, isCollapsed: isCollapsedDefault = true, children }: {
  className?: string,
  isCollapsed?: boolean,
  children: React.ReactNode,
}) => {
  const { activeItemId } = useContext(AccordionContext);
  const [itemId] = useState(uuid());
  const [isCollapsed, setIsCollapsed] = useState(isCollapsedDefault);

  useEffect((): void => {
    if (activeItemId !== itemId) {
      setIsCollapsed(true);
    }
  }, [activeItemId, itemId]);

  return (
    <AccordionItemContext.Provider value={{ itemId, isCollapsed, setIsCollapsed }}>
      <AccordionItemElement className={className} $isCollapsed={isCollapsed}>
          {children}
      </AccordionItemElement>
    </AccordionItemContext.Provider>
  );
};

const AccordionItemHeader = ({ className, children }: { className?: string, children: React.ReactNode }) => {
  const { itemId, isCollapsed, setIsCollapsed } = useContext(AccordionItemContext);
  const { setActiveItemId } = useContext(AccordionContext);

  const handleClick = (): void => {
    setIsCollapsed(!isCollapsed);

    if (isCollapsed) {
      setActiveItemId(itemId);
    }
  };

  return (
    <AccordionItemHeaderElement className={className} $isCollapsed={isCollapsed} onClick={handleClick}>
      {children}
    </AccordionItemHeaderElement>
  );
};

const AccordionItemContent = ({ className, children }: { className?: string, children: React.ReactNode }) => {
  const { isCollapsed } = useContext(AccordionItemContext);

  return (
    <AccordionItemContentElement className={className} $isCollapsed={isCollapsed}>
      <AccordionItemContentWrapperElement $isCollapsed={isCollapsed}>
       {children}
      </AccordionItemContentWrapperElement>
    </AccordionItemContentElement>
  );
};


export default Accordion;
export {
  AccordionItem,
  AccordionItemHeader,
  AccordionItemContent,
};