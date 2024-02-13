import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { ActivityIndicator, MD2Colors } from "react-native-paper";

import { Fontisto } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

import { useMutation, useQuery } from "@apollo/client";
import { CREATE_COMMENT, GET_POST_BY_ID } from "../configs/queries";
import { useState } from "react";
import Comment from "../components/Comment";

export default function PostDetail({ route, navigation }) {
  const [content, setContent] = useState("");
  const { post, user } = route.params;

  const { data, loading, error } = useQuery(GET_POST_BY_ID, {
    variables: {
      getPostByIdId: post._id,
    },
  });

  // console.log(data);

  const [addComment, { loading: mutationLoading, error: mutationError }] =
    useMutation(CREATE_COMMENT, {
      onCompleted: () => {
        if (!mutationError) navigation.navigate("Posts");
      },
      refetchQueries: [GET_POST_BY_ID],
    });

  async function handleSubmit() {
    try {
      await addComment({
        variables: {
          inputComment: {
            content,
          },
          postId: data.getPostById._id,
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
          <View>
            <ScrollView>
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
                      {user.getUserById.username}
                    </Text>
                    <Text style={{ color: "gray" }}>
                      {user.getUserById.follower.length <= 1
                        ? `${user.getUserById.follower.length} Follower`
                        : `${user.getUserById.follower.length} Followers`}
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
                    style={{ marginLeft: 16, marginRight: 12 }}
                  />
                </View>

                {/* Content Container */}
                <View style={styles.contentContainer}>
                  <Text style={styles.content}>{data.getPostById.content}</Text>
                  <Image
                    style={{
                      width: "auto",
                      height: 360,
                      marginTop: 12,
                      borderRadius: 14,
                    }}
                    source={{
                      uri: data.getPostById.imgUrl,
                    }}
                  />
                </View>

                {/* Total Likes & Total Comment Container */}
                <View style={styles.commentSectionContainer}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <AntDesign name="like1" size={24} color="black" />
                    <Text style={styles.likes}>
                      {data.getPostById.likes.length}
                    </Text>
                  </View>
                  <View>
                    <Text style={{ color: "gray" }}>
                      {data.getPostById.comments.length} Comments
                    </Text>
                  </View>
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
                  <View
                    style={{ flexDirection: "column", alignItems: "center" }}
                  >
                    <AntDesign name="like2" size={24} color="black" />
                    <Text style={styles.smallMargin}>Like</Text>
                  </View>
                  <View
                    style={{ flexDirection: "column", alignItems: "center" }}
                  >
                    <FontAwesome name="commenting-o" size={24} color="black" />
                    <Text style={styles.smallMargin}>Comment</Text>
                  </View>
                  <View
                    style={{ flexDirection: "column", alignItems: "center" }}
                  >
                    <AntDesign name="retweet" size={24} color="black" />
                    <Text style={styles.smallMargin}>Repost</Text>
                  </View>
                  <View
                    style={{ flexDirection: "column", alignItems: "center" }}
                  >
                    <FontAwesome name="paper-plane-o" size={24} color="black" />
                    <Text style={styles.smallMargin}>Send</Text>
                  </View>
                </View>
              </View>

              <View
                style={{
                  // Add logic in here according to comments.length (maybe)
                  height: (data.getPostById.comments.length + 1) * 120,
                  backgroundColor: "white",
                  marginTop: 10,
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                }}
              >
                <Text style={{ fontSize: 20 }}>Comments</Text>

                {/* Comments (Map) */}
                {data?.getPostById.comments.map((comment, index) => {
                  return <Comment comment={comment} key={index} />;
                })}
                {/* <Comment /> */}
              </View>
            </ScrollView>
            <View
              style={{
                position: "absolute",
                top: "90%",
                width: "100%",
                height: 65,
                backgroundColor: "white",
                marginLeft: 8,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TextInput
                placeholder="Leave your thoughts here.."
                style={{
                  borderWidth: 1,
                  height: 40,
                  borderRadius: 10,
                  width: 280,
                  paddingLeft: 8,
                }}
                onChangeText={(text) => setContent(text)}
              />
              <Pressable onPress={handleSubmit}>
                <Text style={{ marginLeft: 16, fontSize: 16 }}>Post</Text>
              </Pressable>
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
    marginTop: 8,
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
  commentContainer: {
    backgroundColor: "#EBE7E7",
    height: "auto",
    width: "80%",
    borderRadius: 12,
    marginLeft: 8,
    padding: 8,
    marginBottom: 60,
  },
});
