import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fafafa",
    },
    lista: {
      padding: 20
    },
    clienteContainer: {
      backgroundColor: "#FFF",
      borderWidth: 1,
      borderColor: "#DDD",
      borderRadius: 5,
      padding: 20,
      marginBottom: 20
    },
    headerMenu: {
      backgroundColor: "#DA552F"
    },
    buttonStyle: {
      height: 42,
      borderRadius: 5,
      borderWidth: 2,
      borderColor: "#DA552F",
      backgroundColor: "transparent",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 5,
      
    },
    buttonText: {
        fontSize: 16,
        color: "#FA552F",
        fontWeight: "bold",
    },
});
export default styles;