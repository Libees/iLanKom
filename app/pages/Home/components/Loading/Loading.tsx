import { View, Text } from 'react-native'
import React from 'react'
import { theme } from '../../../../constansts/theme';
import { ActivityIndicator, StyleSheet, ActivityIndicatorProps } from "react-native";
const Loading = (props: ActivityIndicatorProps & { loadingText: string }) => {
  return (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator  {...props} />
      {props.loadingText && <Text style={{ marginLeft: 10, color: theme.colors.info }}>{props?.loadingText}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    color: theme.colors.primary
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "center",
  }
});

export default Loading