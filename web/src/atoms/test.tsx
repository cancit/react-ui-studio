import * as React from "react";
import { View, Text, Animated, TouchableOpacity } from "react-native";

export default function (props: any) {
  const opacity = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    animate();
  }, []);
  const animate = () => {
    opacity.setValue(0);
    Animated.timing(opacity, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: false,
    }).start();
  };
  return (
    <Animated.View style={[props.style, { opacity: opacity, flex: 1 }]}>
      <Text>Test</Text>
      <TouchableOpacity style={{ backgroundColor: "red" }} onPress={animate}>
        <Text style={{ color: "white", margin: 16, width: "auto" }}>Run</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}
