import { useMutation } from "@apollo/client";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Pressable,
} from "react-native";
import { REGISTER } from "../configs/queries";

import { ActivityIndicator, MD2Colors } from "react-native-paper";

export default function Register({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [register, { data, loading, error }] = useMutation(REGISTER, {
    onCompleted: () => {
      if (!error) navigation.navigate("Login");
    },
  });

  async function handleSubmit() {
    try {
      // console.log(username, password);
      const res = await register({
        variables: {
          inputRegister: {
            email: `${username}@mail.com`,
            username,
            name: `${username.toLowerCase()}`,
            password,
          },
        },
      });
      // console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {loading ? (
        <>
          <View style={{ marginTop: 350 }}>
            <ActivityIndicator
              animating={true}
              color={MD2Colors.blue700}
              size={"large"}
            />
          </View>
        </>
      ) : (
        <>
          <View style={styles.container}>
            <Image
              style={styles.logo}
              source={{
                uri: "https://www.talintinternational.com/wp-content/uploads/2022/06/Linkedin-Logo.png",
              }}
            ></Image>

            <Text style={styles.text}>Join Linkedin</Text>
            <Pressable
              onPress={() => {
                navigation.navigate("Login");
              }}
            >
              <Text>
                Or{" "}
                <Text
                  style={{
                    color: "#24548B",
                    fontWeight: "bold",
                  }}
                >
                  Sign in
                </Text>
              </Text>
            </Pressable>
            {error ? (
              <>
                <Text style={{ color: "red", marginTop: 10 }}>
                  {error.message}
                </Text>
              </>
            ) : (
              <>{}</>
            )}
            <TextInput
              style={styles.input}
              placeholder="Username"
              onChangeText={(text) => setUsername(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
            />

            <Text style={styles.agreementText}>
              By clicking Agree & Join, you agree to lorem ipsum si dolor amet
            </Text>
            <Pressable style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Agree & Join</Text>
            </Pressable>
          </View>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  logo: {
    width: 150,
    height: 80,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 24,
  },
  input: {
    marginBottom: 18,
    marginTop: 8,
    borderBottomWidth: 1,
    color: "gray",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#24548B",
    width: "100%",
    height: 48,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },
  rememberContainer: {
    flexDirection: "row",
    marginTop: 16,
    alignItems: "center",
  },
  agreementText: {
    marginTop: 16,
    color: "gray",
  },
});
