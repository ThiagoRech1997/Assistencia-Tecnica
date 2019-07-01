import { createDrawerNavigator, createStackNavigator, createAppContainer } from "react-navigation";

import MainScreen from "./pages/Main";
import LoginScreen from "./pages/Login";
import CadastroScreen from "./pages/Cadastro";
import OrcamentoScreen from "./pages/Orcamentos";
import AprovaOrcamentoScreen from "./pages/AprovaOrcamento";
import ServicoScreen from "./pages/Servicos";

const DrowerConfig = {
    drawerPosition: "left",
    initialRouteName: "Main",
    drawerWidth: 200,
};

const Rotas = createDrawerNavigator(
    {
        Login:{ screen: LoginScreen },
        Main: { screen: MainScreen },
        Orcamentos: { screen: OrcamentoScreen },
        AprovaOrcamento: { screen: AprovaOrcamentoScreen },
        Servicos: { screen: ServicoScreen },
        Cadastro: { screen: CadastroScreen },
    },
    DrowerConfig
);

export default createAppContainer(Rotas);