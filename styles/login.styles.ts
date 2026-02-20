import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
    container: {
        flex: 1, 
        width: width,
        height: height,
        justifyContent: "center",
        alignItems: "center",
    },
    inputs: {
        width: 300, 
        height: 50,
        borderWidth: 1,
        borderColor: "gray",
    },
    signupArea: {
        height: height * 0.4,
        width: width * 0.4,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    logincontainer: {
        flex: 1, 
        justifyContent: "center", 
        alignItems: "center"
    }
})