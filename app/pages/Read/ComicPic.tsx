import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { wp, hp, deviceWidth, deviceHeight } from '../../utils/utils'
import { theme } from '../../constansts/theme'
enum PicStatus {
    init = 'init',
    success = 'success',
    error = 'error'
}
const ComicPic: React.FC<{ page: string }> = ({ page }) => {
    const [dimensions, setDimensions] = useState({
        width: deviceWidth,
        height: deviceHeight // 默认正方形占位
    });

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
    const handleOnLoad = (event: { nativeEvent: { source: { width: any; height: any } } }) => {
        const { width, height } = event.nativeEvent.source;
        setPicStatus(PicStatus.success)
        setIsLoading(false)
        setDimensions({
            width: deviceWidth,
            height: height * (deviceWidth / width)
        });
    }

    return (
        <View style={comicPicStyle.main} >
            {<Image
                style={[comicPicStyle.pic, dimensions]}
                source={pageSource}
                onError={handleOnError}
                onLoad={handleOnLoad}
                progressiveRenderingEnabled={true}
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
    },
    pic: {
        width: '100%',
        marginBottom: 4
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