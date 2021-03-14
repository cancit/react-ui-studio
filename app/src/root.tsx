import * as React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {Studio} from './studio';
import {strToFunction} from './studio/parser';
export function Root() {
  const [elements, setElements] = React.useState(undefined);
  const [customComponents, setCustomComponents] = React.useState(undefined);

  React.useEffect(() => {
    var ws = new WebSocket('ws://192.168.1.192:8080');
    ws.onopen = () => {
      const message = 'hello';
      ws.send('client');
    };
    ws.onmessage = (e) => {
      console.log(`Received: ${e.data}`);
      try {
        const obj = JSON.parse(e.data) as any;
        if (obj.type === 'ui') {
          const map = {};
          Object.keys(obj.customComponents).forEach((cc) => {
            map[cc] = obj.customComponents[cc];
            map[cc].func = strToFunction(obj.customComponents[cc].code);
          });
          setCustomComponents(map);
          setElements(obj.elements);
          console.log('elements set');
        }
      } catch (err) {
        console.log(err);
      }
    };
    ws.onerror = (e: any) => {
      console.log(`Error: ${e.message}`);
    };
    ws.onclose = (e) => {
      console.log(e.code, e.reason);
    };
    return () => {
      ws?.close();
    };
  });
  return (
    <SafeAreaView style={{flex: 1}}>
      {elements ? (
        <Studio
          key={elements?.length || 0}
          elements={elements}
          customComponents={customComponents}
        />
      ) : (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{fontSize: 24}}>
            Press Preview button on the web app.
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}
