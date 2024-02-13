import { useQuery } from "@apollo/client";
import { Image, StyleSheet, Text, View } from "react-native";
import { GET_USER_BY_LOGIN_INFO } from "../configs/queries";

import { ActivityIndicator, MD2Colors } from "react-native-paper";

export default function Profile() {
  const { data, loading, error, refetch } = useQuery(GET_USER_BY_LOGIN_INFO);

  // console.log(data);
  refetch();

  return (
    <>
      {loading ? (
        <>
          <View style={{ marginTop: 300 }}>
            <ActivityIndicator
              animating={true}
              color={MD2Colors.blue700}
              size={"large"}
            />
          </View>
        </>
      ) : (
        <>
          <View>
            <View style={{ height: 110 }}>
              <Image
                source={{
                  uri: "https://i.etsystatic.com/30097568/r/il/b9d938/3369548185/il_fullxfull.3369548185_mn08.jpg",
                }}
                style={{ width: "auto", height: 70 }}
              />
              <Image
                source={{
                  uri: "https://zultimate.com/wp-content/uploads/2019/12/default-profile.png",
                }}
                style={{
                  width: 90,
                  height: 90,
                  position: "absolute",
                  left: 10,
                  top: 25,
                  zIndex: 2,
                  borderRadius: 100,
                }}
              />
              <View style={{ height: 40 }}></View>
            </View>

            <View style={styles.profileContainer}>
              <Text style={{ fontSize: 26, fontWeight: "600" }}>
                {data.getUserByLoginInfo.username}
              </Text>
              <Text>Student at Hacktiv8</Text>
              <Text style={{ marginTop: 14 }}>Bogor, Jawa Barat</Text>
              <Text>
                {data.getUserByLoginInfo.following.length} Following ·{" "}
                {data.getUserByLoginInfo.follower.length} Followers
              </Text>
            </View>

            {/* Horizontal Line */}
            <View
              style={{
                backgroundColor: "#E4E1E1",
                width: "auto",
                height: 4,
                marginTop: 6,
              }}
            ></View>

            <View style={{ padding: 12 }}>
              <Text style={{ fontSize: 24, fontWeight: "600" }}>About</Text>
              <Text style={{ marginTop: 12 }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </Text>
            </View>

            <View
              style={{
                backgroundColor: "#E4E1E1",
                width: "auto",
                height: 4,
                marginTop: 8,
              }}
            ></View>

            <View style={{ padding: 12 }}>
              <Text style={{ fontSize: 24, fontWeight: "600" }}>
                Experience
              </Text>
              <Text style={{ marginTop: 12 }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </Text>
            </View>
          </View>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    padding: 12,
  },
});
