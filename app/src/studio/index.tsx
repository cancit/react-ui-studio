import * as React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {StudioElementMap} from './types';
import data from './data.json';
export function Studio(props: {elements?: any; customComponents?: any}) {
  return (
    <Component
      elementID="root"
      index={0}
      elements={props.elements || (data as any)}
      customComponents={props.customComponents}
    />
  );
}

function Component(props: {
  elementID: string;
  index?: number;
  elements: StudioElementMap;
  customComponents: any;
}) {
  const e = props.elements[props.elementID];
  if (e.custom) {
    const Custom = props.customComponents[e.id].func;
    return <Custom {...e.props} />;
  }
  if (e.component === 'View') {
    return (
      <>
        <View
          style={{
            position: 'relative',
            ...e.props?.style,
          }}>
          {e.children
            ? e.children.map((a, i) => (
                <Component
                  elementID={a}
                  index={i}
                  elements={props.elements}
                  customComponents={props.customComponents}
                />
              ))
            : null}
        </View>
      </>
    );
  } else if (e.component === 'Text') {
    return (
      <Text
        style={{
          position: 'relative',
          ...e.props?.style,
        }}>
        {e.children ? (
          e.children.map((a, i) => (
            <Component
              elementID={a}
              index={i}
              elements={props.elements}
              customComponents={props.customComponents}
            />
          ))
        ) : (
          <Text>{e.text}</Text>
        )}
      </Text>
    );
  } else if (e.component === 'Image') {
    return (
      <Image
        source={{uri: e.props?.source || ''}}
        style={{
          position: 'relative',
          ...e.props?.style,
        }}
      />
    );
  } else if (e.component === 'TouchableOpacity') {
    return (
      <TouchableOpacity
        {...{id: e.id}}
        style={{
          position: 'relative',
          ...e.props?.style,
        }}>
        {e.children
          ? e.children.map((a, i) => (
              <Component
                elementID={a}
                index={i}
                elements={props.elements}
                customComponents={props.customComponents}
              />
            ))
          : null}
      </TouchableOpacity>
    );
  }
  return null;
}
