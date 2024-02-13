import { useMutation } from "@apollo/client";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { CREATE_FOLLOW } from "../configs/queries";
import { useState } from "react";

export default function UserList({ user }) {
  const [addFollow, { data, loading, error }] = useMutation(CREATE_FOLLOW);
  const [followed, setFollowed] = useState(false);

  // console.log(user);

  async function handleFollow(user) {
    try {
      await addFollow({
        variables: {
          inputFollow: {
            followingId: user._id,
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <View
        style={{
          backgroundColor: "white",
          height: 150,
          marginTop: 5,
          padding: 6,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            marginTop: 20,
            marginBottom: 10,
          }}
        >
          <Image
            source={{
              uri: "https://th.bing.com/th/id/OIP.4Xo_VuWOJu3XFeF70-o3EQHaHm?rs=1&pid=ImgDetMain",
            }}
            style={{ width: 50, height: 50 }}
          />

          <View style={styles.commentContainer}>
            <Text>
              {user.username} · <Text style={{ color: "gray" }}>3rd+</Text>
            </Text>
            <Text style={{ color: "gray" }}>
              Full Stack Developer @Hacktiv8
            </Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: "#24548B",
            width: "auto",
            height: 36,
            marginTop: 12,
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Pressable
            onPress={() => {
              handleFollow(user.username);
              setFollowed(true);
            }}
          >
            <Text style={{ fontSize: 16, color: "white", fontWeight: "700" }}>
              {followed ? "Connected" : "Connect"}
            </Text>
          </Pressable>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  commentContainer: {
    backgroundColor: "#EBE7E7",
    height: "auto",
    width: "80%",
    borderRadius: 12,
    marginLeft: 8,
    padding: 8,
  },
});
