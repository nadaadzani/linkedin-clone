import { Image, StyleSheet, Text, View } from "react-native";

export default function Comment({ comment }) {
  return (
    <>
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
            {comment.username} · <Text style={{ color: "gray" }}>3rd+</Text>
          </Text>
          <Text style={{ color: "gray" }}>Full Stack Developer @Hacktiv8</Text>

          <Text style={{ marginTop: 20 }}>{comment.content}</Text>
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
