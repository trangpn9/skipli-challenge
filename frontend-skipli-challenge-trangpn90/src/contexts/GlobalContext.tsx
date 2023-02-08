import React, { Dispatch, SetStateAction, createContext, useState, useContext } from 'react'

export interface IGlobalState {
  isAuth: boolean;
  isShowToast: boolean;
  contentToast: string;
  typeToast: string;
  itemUserGithub: [];
}

const GlobalContext = createContext({
  state: {} as Partial<IGlobalState>,
  setState: {} as Dispatch<SetStateAction<Partial<IGlobalState>>>,
});


const GlobalProvider = ({ children, value = {} as IGlobalState, }: { children: React.ReactNode; value?: Partial<IGlobalState>; }) => {
  const [state, setState] = useState(value)

  return (
    <GlobalContext.Provider value={{ state, setState }}>
      {children}
    </GlobalContext.Provider>
  )
}

const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalStateContext");
  }
  return context;
};

export { GlobalProvider, useGlobalContext }