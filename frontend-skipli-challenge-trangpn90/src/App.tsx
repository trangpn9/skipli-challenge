import React, { useLayoutEffect } from "react";
import "./App.scss";
import { useGlobalContext } from "./contexts/GlobalContext";
import Screen1 from "./layouts/Screen1";
import Screen2 from "./layouts/Screen2";
import useLocalStorage from "./hooks/useLocalStorage";

const App = (): React.ReactElement => {
  const { state, setState } = useGlobalContext();
  const { getItem } = useLocalStorage();

  useLayoutEffect(() => {
    const user = getItem("user");
    if (user) {
      setState(preState => ({...preState, isAuth: true, isShowToast: true, contentToast: "User LogedIn", typeToast: "Success"}));
    }
  }, []);

  if (!state.isAuth) {
    return <Screen1 />;
  } else {
    return <Screen2 />;
  }
};

export default App;
