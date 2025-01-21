import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { wp, hp, deviceHeight } from '../../utils/utils'
import { theme } from '../../constansts/theme'
enum PicStatus {
    init = 'init',
    success = 'success',
    error = 'error'
}
const ComicPic: React.FC<{ page: string }> = ({ page }) => {
    const [isLoading, setIsLoading] = useState(true);
    const errorPic = require('../../assets/images/pic_error.png')
    const [pageSource, setPageSource] = useState({
        uri: page
    })
    const [picStatus, setPicStatus] = useState<PicStatus>(PicStatus.init)
    const handleOnError = () => {
        setPicStatus(PicStatus.error)
        setIsLoading(false)
        setPageSource(errorPic)
    }
    const handleOnLoad = () => {
        setPicStatus(PicStatus.success)
        setIsLoading(false)
    }
    return (
        <View style={comicPicStyle.main} >
            {<Image
                style={comicPicStyle.pic}
                source={pageSource}
                onError={handleOnError}
                onLoad={handleOnLoad}
                resizeMode='contain'
                alt='漫画'></Image>}
            {isLoading && ( // 根据 isLoading 状态显示加载指示器
                <View style={comicPicStyle.loadingContainer}>
                    <ActivityIndicator size="large" color={theme.colors.primary} />
                </View>
            )}
        </View>
    )
}
const comicPicStyle = StyleSheet.create({
    main: {
        height: hp(65),
        width: wp(100),
        borderWidth: 1,
        borderStyle: 'solid',
    },
    pic: {
        height: '100%',
        width: '100%',
    },
    loadingContainer: {
        position: 'absolute', // 使加载指示器覆盖在图片上方
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default ComicPic