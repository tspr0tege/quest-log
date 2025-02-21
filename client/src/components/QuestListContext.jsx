import React, { createContext } from 'react';

export const QuestListContext = createContext();

export default ({children, key, ...props}) => {

  const filteredProps = Object.fromEntries(
    Object.entries(props).filter(([key]) => !key.startsWith("on"))
  );

  return (
    <QuestListContext.Provider value={filteredProps}>
      {children}
    </QuestListContext.Provider>
  );
}
