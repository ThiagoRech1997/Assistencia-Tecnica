import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fafafa",
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonStyle: {
        height: 42,
        width: 200,
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
    textMessage: {
        fontSize: 20,
    },
});
export default styles;