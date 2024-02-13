import { useQuery } from "@apollo/client";
import { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { SEARCH_USER_BY_USERNAME } from "../configs/queries";
import UserList from "./UserList";

export default function Search() {
  const [username, setUsername] = useState("");
  const { data, loading, error } = useQuery(SEARCH_USER_BY_USERNAME, {
    variables: {
      username,
    },
  });
  //   console.log(data);

  async function handleSearch() {
    try {
    } catch (error) {
      console.log(error);
    }
  }

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <>
      <View
        style={{
          width: "auto",
          height: 100,
          //   backgroundColor: "white",
          padding: 8,
          margin: 12,
        }}
      >
        <TextInput
          placeholder="Search by username here.."
          style={{
            borderWidth: 1,
            borderColor: "black",
            borderRadius: 30,
            height: 40,
            paddingLeft: 8,
          }}
          onChangeText={(text) => setUsername(text)}
        />
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
          <Pressable onPress={handleSearch}>
            <Text style={{ fontSize: 16, color: "white", fontWeight: "700" }}>
              Search user
            </Text>
          </Pressable>
        </View>
      </View>
      <ScrollView style={{ height: "auto", width: "auto" }}>
        {data === undefined || error ? (
          <>
            <Text>User not found</Text>
          </>
        ) : (
          <>
            {data?.searchUserByName?.map((user, index) => {
              return <UserList key={index} user={user} />;
            })}
          </>
        )}
      </ScrollView>
    </>
  );
}
