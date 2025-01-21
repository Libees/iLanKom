import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { theme } from '../../constansts/theme'
import { wp } from '../../utils/utils'
const Line = (props: { color?: string, height?: number }) => {
    const styles = {
        width: wp(100),
        height: props.height ? props.height : 1,
        backgroundColor: props.color ? props.color : theme.colors.line,
    }
    return (
        <View style={{ ...styles }}>
        </View >
    )
}
export default Line