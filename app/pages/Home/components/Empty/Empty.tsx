import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { theme } from '../../../../constansts/theme'
const Empty = () => {
  return (
    <View style={styles.container}>

      <Text style={{ textAlign: 'center', color: theme.colors.primary }}>没有数据</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

export default Empty