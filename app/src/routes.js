import { createStackNavigator, createAppContainer } from "react-navigation";

import Main from "./pages/main";

const Rotas = createStackNavigator({
    Main,
});

const App = createAppContainer(Rotas);

export default App;