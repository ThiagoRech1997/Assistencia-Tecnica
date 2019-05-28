import { createStackNavigator, createAppContainer } from "react-navigation";

import Main from "./pages/main";

var Rotas = createStackNavigator({
    Main
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