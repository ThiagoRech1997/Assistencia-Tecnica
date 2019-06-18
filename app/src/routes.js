import { createDrawerNavigator, createStackNavigator, createAppContainer } from "react-navigation";

import MainScreen from "./pages/Main";
import LoginScreen from "./pages/Login";

const DrowerConfig = {
    drawerPosition: "left",
    initialRouteName: "Login",
    drawerWidth: 200,
};

const Rotas = createDrawerNavigator(
    {
        Login:{ screen: LoginScreen},
        Main: { screen: MainScreen },
    },
    DrowerConfig
);

export default createAppContainer(Rotas);