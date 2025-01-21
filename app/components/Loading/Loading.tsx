import { View, ActivityIndicator, StyleSheet } from 'react-native'
import React from 'react'
import { theme } from '../../constansts/theme'
import { hp, wp } from '../../utils/utils'
const Loading = ({ show }: { show: boolean }) => {
    return show && (<View style={styles.main}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
    </View>
    )
}

const styles = StyleSheet.create({
    main: {
        position: 'absolute', // 使加载指示器覆盖在图片上方
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
        height: hp(100),
        width: wp(100)
    }
})


export default Loading