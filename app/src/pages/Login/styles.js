import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    }, 
    listContainer: {
      backgroundColor: "#FFF",
      borderWidth: 1,
      borderColor: "#DDD",
      borderRadius: 5,
      padding: 20,
      marginBottom: 20
    },
    textImput: {
      height: 50,
      width: 200,
    },
    nameUser: {
      fontSize: 16,
    },
    buttonStyle: {
        height: 42,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: "#DA552F",
        backgroundColor: "transparent",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: {
        fontSize: 16,
        color: "#FA552F",
        fontWeight: "bold",
    },
});
 
export default styles;