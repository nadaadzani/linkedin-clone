import { Image, StyleSheet, Text, View, Pressable } from "react-native";
import { ActivityIndicator, MD2Colors } from "react-native-paper";

import { Fontisto } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

import { useMutation, useQuery } from "@apollo/client";
import {
  CREATE_LIKE,
  GET_POSTS,
  GET_POST_BY_ID,
  GET_USER_BY_ID,
} from "../configs/queries";

export default function Post({ navigation, post }) {
  const { data, loading, error } = useQuery(GET_USER_BY_ID, {
    variables: {
      getUserByIdId: post.authorId,
    },
  });
  // console.log(data);
  // console.log(typeof post.imgUrl);
  const [addLike, { loading: mutationLoading, error: mutationError }] =
    useMutation(CREATE_LIKE, {
      onCompleted: () => {
        if (!mutationError) navigation.navigate("Posts");
      },
      refetchQueries: [GET_POST_BY_ID],
    });

  async function handleLike(post) {
    try {
      await addLike({
        variables: {
          postId: post._id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {loading || mutationLoading ? (
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
          <View style={styles.postContainer}>
            {/* Title Container */}
            <View style={styles.postTitleContainer}>
              <Image
                source={{
                  uri: "https://zultimate.com/wp-content/uploads/2019/12/default-profile.png",
                }}
                style={{ width: 60, height: 60 }}
              />

              <View style={styles.titleContainer}>
                <Text style={{ fontSize: 16 }}>
                  {data.getUserById.username}
                </Text>
                <Text style={{ color: "gray" }}>
                  {data.getUserById.follower.length <= 1
                    ? `${data.getUserById.follower.length} Follower`
                    : `${data.getUserById.follower.length} Followers`}
                </Text>
                <Text style={{ color: "gray" }}>
                  3d · <Fontisto name="world-o" size={12} color="black" />
                </Text>
              </View>

              <SimpleLineIcons
                name="options-vertical"
                size={20}
                color="black"
                style={{ marginLeft: "auto" }}
              />

              <AntDesign
                name="close"
                size={20}
                color="black"
                style={{ marginLeft: 16, marginRight: 8 }}
              />
            </View>

            {/* Content Container */}
            <View style={styles.contentContainer}>
              <Text style={styles.content}>{post.content}</Text>
              <Image
                style={{
                  width: "auto",
                  height: 360,
                  marginTop: 12,
                  borderRadius: 14,
                }}
                source={{
                  uri: post.imgUrl,
                }}
              />
            </View>

            {/* Total Likes & Total Comment Container */}
            <View style={styles.commentSectionContainer}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <AntDesign name="like1" size={24} color="black" />
                <Text style={styles.likes}>{post.likes.length}</Text>
              </View>
              <Pressable
                onPress={() => {
                  navigation.navigate("PostDetail", {
                    post,
                    user: data,
                    navigation,
                  });
                }}
              >
                <View>
                  <Text style={{ color: "gray" }}>
                    {post.comments.length} Comments
                  </Text>
                </View>
              </Pressable>
            </View>

            {/* Horizontal Line */}
            <View
              style={{
                borderTopWidth: 1,
                borderColor: "#C0C0C0",
                marginTop: 12,
              }}
            ></View>

            {/* Bottom Post Container */}
            <View style={styles.bottomPostContainer}>
              <Pressable onPress={() => handleLike(post)}>
                <View style={{ flexDirection: "column", alignItems: "center" }}>
                  <AntDesign name="like2" size={24} color="black" />
                  <Text style={styles.smallMargin}>Like</Text>
                </View>
              </Pressable>
              <Pressable
                onPress={() => {
                  navigation.navigate("PostDetail", {
                    post,
                    user: data,
                    navigation,
                  });
                }}
              >
                <View style={{ flexDirection: "column", alignItems: "center" }}>
                  <FontAwesome name="commenting-o" size={24} color="black" />
                  <Text style={styles.smallMargin}>Comment</Text>
                </View>
              </Pressable>
              <View style={{ flexDirection: "column", alignItems: "center" }}>
                <AntDesign name="retweet" size={24} color="black" />
                <Text style={styles.smallMargin}>Repost</Text>
              </View>
              <View style={{ flexDirection: "column", alignItems: "center" }}>
                <FontAwesome name="paper-plane-o" size={24} color="black" />
                <Text style={styles.smallMargin}>Send</Text>
              </View>
            </View>
          </View>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 3,
  },
  postContainer: {
    flexDirection: "column",
    width: "100%",
    height: "auto",
    backgroundColor: "white",
    padding: 8,
    marginTop: 20,
  },
  postTitleContainer: {
    flexDirection: "row",
  },
  titleContainer: {
    flexDirection: "column",
    marginLeft: 8,
  },
  contentContainer: {
    marginTop: 22,
  },
  content: {
    fontSize: 18,
  },
  commentSectionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
    marginLeft: 8,
  },
  likes: {
    marginLeft: 4,
    color: "gray",
  },
  bottomPostContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 12,
  },
  smallMargin: {
    marginTop: 2,
  },
});
