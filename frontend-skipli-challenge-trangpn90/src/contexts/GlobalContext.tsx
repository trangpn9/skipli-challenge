import React, { Dispatch, SetStateAction, createContext, useState, useContext, useEffect } from 'react'
import axios from 'axios';
import useLocalStorage from '../hooks/useLocalStorage';

export interface IGlobalState {
  isAuth: boolean;
  isShowToast: boolean;
  contentToast: string;
  typeToast: string;
  itemUserGithub: [];
  user: string | null | undefined;
  favoriteGithubUsers: [];
}

const GlobalContext = createContext({
  state: {} as Partial<IGlobalState>,
  setState: {} as Dispatch<SetStateAction<Partial<IGlobalState>>>,
});


const GlobalProvider = ({ children, value = {} as IGlobalState, }: { children: React.ReactNode; value?: Partial<IGlobalState>; }) => {
  const [state, setState] = useState(value);
  const { getItem } = useLocalStorage();

  useEffect(() => {
    if(getItem("user")) {
      axios({
        method: "get",
        url: `http://localhost:3600/api/user/${getItem("user")}`,
      })
        .then(function (response) {
          const {favoriteGithubUsers} =  response.data;
          setState((preState) => ({...preState, user: getItem("user"), favoriteGithubUsers}));
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, []);

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