import { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Pressable,
} from "react-native";

import * as SecureStore from "expo-secure-store";
import { ActivityIndicator, MD2Colors } from "react-native-paper";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../configs/queries";
import { LoginContext } from "../contexts/LoginContext";

export default function Login({ navigation }) {
  const [selected, setSelected] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { setIsLoggedIn } = useContext(LoginContext);

  const [dispatchLogin, { data, loading, error }] = useMutation(LOGIN, {
    onCompleted: async (res) => {
      let token = null;

      if (res && res.login && res.login.token) {
        token = res.login.token;
      }

      await SecureStore.setItemAsync("token", token);

      setIsLoggedIn(true);
    },
  });

  async function handleSubmit() {
    try {
      await dispatchLogin({
        variables: {
          inputLogin: {
            username,
            password,
          },
        },
      });
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

            <Text style={styles.text}>Sign in</Text>
            <Pressable
              onPress={() => {
                navigation.navigate("Register");
              }}
            >
              <Text>
                Or{" "}
                <Text style={{ color: "#24548B", fontWeight: "bold" }}>
                  Join Linkedin
                </Text>
              </Text>
            </Pressable>

            <TextInput
              style={styles.input}
              placeholder="Username"
              onChangeText={(text) => setUsername(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
            />

            <View style={styles.rememberContainer}>
              {selected ? (
                <>
                  <Pressable onPress={() => setSelected(false)}>
                    <Ionicons name="checkbox" size={24} color="black" />
                  </Pressable>
                </>
              ) : (
                <>
                  <Pressable onPress={() => setSelected(true)}>
                    <MaterialCommunityIcons
                      name="checkbox-blank-outline"
                      size={24}
                      color="black"
                    />
                  </Pressable>
                </>
              )}
              <Text style={{ marginLeft: 6 }}>Remember me?</Text>
            </View>

            <Text
              style={{ fontWeight: "bold", color: "#24548B", marginTop: 16 }}
            >
              Forgot password?
            </Text>
            <Pressable style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Continue</Text>
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
    marginTop: 24,
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
    marginTop: 24,
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
});
