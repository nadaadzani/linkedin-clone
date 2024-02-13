import { Pressable, Text, TextInput, View } from "react-native";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_POST, GET_POSTS } from "../configs/queries";

export default function PostCreation({ navigation }) {
  const [content, setContent] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [tags, setTags] = useState("");

  const [addPost, { data, loading, error }] = useMutation(CREATE_POST, {
    onCompleted: () => {
      if (!error) navigation.navigate("Home");
    },
    refetchQueries: [GET_POSTS],
  });

  async function handleSubmit() {
    try {
      await addPost({
        variables: {
          inputPost: {
            content,
            imgUrl,
            tags,
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
          {error ? (
            <>
              <Text style={{ color: "red", marginTop: 10, marginLeft: 10 }}>
                {error.message}
              </Text>
            </>
          ) : (
            <>{}</>
          )}
          <View
            style={{ backgroundColor: "white", margin: 8, borderRadius: 20 }}
          >
            <TextInput
              placeholder="What do you want to talk about?"
              style={{
                fontSize: 20,
                padding: 8,
                flexWrap: "wrap",
                textAlignVertical: "top",
              }}
              multiline
              numberOfLines={5}
              onChangeText={(text) => setContent(text)}
            />
          </View>
          <View
            style={{ backgroundColor: "white", margin: 8, borderRadius: 20 }}
          >
            <TextInput
              placeholder="Type the image url here.."
              style={{
                fontSize: 20,
                padding: 8,
                flexWrap: "wrap",
                textAlignVertical: "top",
              }}
              multiline
              numberOfLines={5}
              onChangeText={(text) => setImgUrl(text)}
            />
          </View>
          <View
            style={{ backgroundColor: "white", margin: 8, borderRadius: 20 }}
          >
            <TextInput
              placeholder="Add tags to your post.."
              style={{
                fontSize: 20,
                padding: 8,
                flexWrap: "wrap",
                textAlignVertical: "top",
              }}
              multiline
              numberOfLines={5}
              onChangeText={(text) => setTags(text)}
            />
          </View>
          <View
            style={{
              backgroundColor: "#24548B",
              width: "auto",
              height: 48,
              margin: 10,
              borderRadius: 20,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Pressable onPress={handleSubmit}>
              <Text style={{ fontSize: 20, color: "white", fontWeight: "700" }}>
                Add Post
              </Text>
            </Pressable>
          </View>
        </>
      )}
    </>
  );
}
