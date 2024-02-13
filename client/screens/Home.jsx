import { ScrollView, View } from "react-native";
import Post from "../components/Post";
import { useQuery } from "@apollo/client";
import { GET_POSTS } from "../configs/queries";

import { ActivityIndicator, MD2Colors } from "react-native-paper";

export default function Home({ navigation }) {
  const { data, loading, error } = useQuery(GET_POSTS);

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
          <ScrollView>
            {data?.getPosts.map((post, index) => {
              return <Post navigation={navigation} post={post} key={index} />;
            })}
          </ScrollView>
        </>
      )}
    </>
  );
}
