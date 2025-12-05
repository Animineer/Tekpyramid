import Axios from "./components/Axios";
import Login from "./components/Login";
import Stopwatch from "./components/Stopwatch";
import Task3 from "./components/Task3";
// import TodoApp from "./components/TodoApp";
import React from "react";
import Task9 from "./components/Task9";
// import { Router } from "react-router-dom";
import Task6 from "./components/Task6";
import Task5 from "./components/Task5";
import Task7 from "./components/Task7";
import Task4 from "./components/Task4";
import Task8 from "./components/Task8";
import FormikYup from "./components/FormikYup";
import { Provider } from "react-redux";
// import GopalTorture from "./components/GopalTorture";
import { store } from "./components/store";
import GopalTorture from "./components/GopalTorture";

function App(){
    return(        
        <>
        
            <Provider store={store}>
            <GopalTorture/>
            </Provider>
        </>
    )
}

export default App
