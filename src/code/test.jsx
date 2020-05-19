const View = "View";
const Text = "Text";
function Welcome(props) {
  return (
    <View style={{ flex: 1, backgroundColor: "yellow", paddingTop: 24 }}>
      <Text style={{ fontSize: 24, marginLeft: 24 }}>Hello, {props.name}</Text>
    </View>
  );
}
