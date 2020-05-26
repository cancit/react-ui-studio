import * as React from "react";
import { View, Text, TouchableOpacity } from "react-native";
export default function () {
  return (
    <View>
      <Text>Test</Text>
    </View>
  );
}

export function Welcome() {
  const [a, setA] = React.useState(0);
  return (
    <View>
      <Text>Test1111 {a}</Text>
      <TouchableOpacity onPress={() => setA(a + 1)}>
        <Text>Increment</Text>
      </TouchableOpacity>
    </View>
  );
}

export function Welcome2() {
  const [a, setA] = React.useState(0);
  return (
    <View>
      <Text>Test22222 {a}</Text>
      <TouchableOpacity onPress={() => setA(a + 1)}>
        <Text>Increment</Text>
      </TouchableOpacity>
    </View>
  );
}

/* const View = "View";
const Text = "Text";
function Welcome(props) {
  return (
    <View style={{ flex: 1, backgroundColor: "yellow", paddingTop: 24 }}>
      <Text style={{ fontSize: 24, marginLeft: 24 }}>Hello, {props.name}</Text>
    </View>
  );
}
 */
