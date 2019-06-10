import { createStackNavigator, createAppContainer } from "react-navigation";

import Main from "./pages/Main";
import Login from "./pages/Login";

var Rotas = createStackNavigator({
    Login
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: "#DA552F"
        },
        headerTintColor: "#FFF"
    },
});

var App = createAppContainer(Rotas);

export default App;