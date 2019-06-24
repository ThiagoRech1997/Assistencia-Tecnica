import { createDrawerNavigator, createStackNavigator, createAppContainer } from "react-navigation";

import MainScreen from "./pages/Main";
import LoginScreen from "./pages/Login";
import CadastroScreen from "./pages/Cadastro";

const DrowerConfig = {
    drawerPosition: "left",
    initialRouteName: "Login",
    drawerWidth: 200,
};

const Rotas = createDrawerNavigator(
    {
        Login:{ screen: LoginScreen},
        Main: { screen: MainScreen },
        Cadastro: { screen: CadastroScreen },
    },
    DrowerConfig
);

export default createAppContainer(Rotas);