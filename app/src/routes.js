import { createDrawerNavigator, createStackNavigator, createAppContainer } from "react-navigation";

import MainScreen from "./pages/Main";
import LoginScreen from "./pages/Login";
import CadastroScreen from "./pages/Cadastro";
import OrcamentoScreen from "./pages/Orcamentos";
import ServicoScreen from "./pages/Servicos";

const DrowerConfig = {
    drawerPosition: "left",
    initialRouteName: "Login",
    drawerWidth: 200,
};

const Rotas = createDrawerNavigator(
    {
        Login:{ screen: LoginScreen },
        Main: { screen: MainScreen },
        Orcamentos: { screen: OrcamentoScreen },
        Servicos: { screen: ServicoScreen },
        Cadastro: { screen: CadastroScreen },
    },
    DrowerConfig
);

export default createAppContainer(Rotas);