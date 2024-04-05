import React, { useState, PropsWithChildren } from 'react';

type PagePartStyles = {
  backgroundColor: string;
};

export type IPageStatusBarStyles = {
  viewBottomContainerStyles: PagePartStyles;
  statusBarContainerStyles: PagePartStyles;
};

type IPageContext = {
  statusBarStyles: IPageStatusBarStyles;
  setPagePartStyles: (data: Partial<IPageStatusBarStyles>) => void;
  resetPagePartStyles: () => void;
};

export const PageContext = React.createContext<IPageContext>(
  {} as IPageContext
);

export const defaulPagePartStyles: IPageStatusBarStyles = {
  viewBottomContainerStyles: {
    backgroundColor: 'transparent',
  },
  statusBarContainerStyles: {
    backgroundColor: 'transparent',
  },
};

export default function PageContextProvider({ children }: PropsWithChildren) {
  const [statusBarStyles, setStatusBarStyles] =
    useState<IPageStatusBarStyles>(defaulPagePartStyles);

  const setPagePartStyles = (newSyles: Partial<IPageStatusBarStyles>) => {
    setStatusBarStyles({
      ...statusBarStyles,
      ...newSyles,
    });
  };

  const resetPagePartStyles = () => {
    setStatusBarStyles(defaulPagePartStyles);
  };

  return (
    <PageContext.Provider
      value={{
        statusBarStyles,
        setPagePartStyles,
        resetPagePartStyles,
      }}
    >
      {children}
    </PageContext.Provider>
  );
}

