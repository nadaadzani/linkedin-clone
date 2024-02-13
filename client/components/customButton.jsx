import { useNavigation } from "@react-navigation/native";
import { Button, Text, View } from "react-native";

export default function CustomButton() {
  //   console.log(navigation, "<< navigation");
  const navigation = useNavigation();
  return (
    <>
      <Button
        title="Go detail"
        onPress={() => navigation.navigate("PostDetail")}
      />
    </>
  );
}
