import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import Line from '../../components/Line/Line'
import LModal from './components/LModal'
import { hp } from '../../utils/utils'
import { theme } from '../../constansts/theme'
import storage from '../../utils/storage'
import { CONFIG_STORAGE_KEY } from '../../constansts/config'
import { ConfigContext } from '../../context/ConfigContext'

const ipConfig = (props: string) => {
    const { config, setConfig } = useContext(ConfigContext)!
    const [ip, setIp] = useState(config.ip)
    const [ipInfo, setIpInfo] = useState('')
    const [ipConfigVisble, setIpConfigVisible] = useState(false)
    useEffect(() => {
        setIpInfo(ip ? `http://${ip}` : '点击输入服务器地址及端口')
    }, [])
    const onOpenIpConfig = () => {
        setIpConfigVisible(true)
    }
    const onCloseIpConfig = () => {
        setIpConfigVisible(false)
        return null
    }
    const handleSetIpInfo = () => {
        setIpInfo(ip ? `http://${ip}` : '点击输入服务器地址及端口')
    }
    const onComfireIpConfig = () => {
        storage.save({
            key: CONFIG_STORAGE_KEY,
            data: {
                ...config,
                ip
            }
        }).then(() => {
            setConfig({ ...config, ip })
        })
        handleSetIpInfo()
        onCloseIpConfig()
    }
    const changeIpConfig = (value: string) => {
        setIp(value)
    }
    return {
        ip,
        ipInfo,
        ipConfigVisble,
        changeIpConfig,
        onOpenIpConfig,
        onCloseIpConfig,
        onComfireIpConfig
    }
}
const Config = () => {
    const navigation = useNavigation();
    const { onCloseIpConfig, onOpenIpConfig, onComfireIpConfig, changeIpConfig, ipConfigVisble, ip, ipInfo } = ipConfig()
    return (
        <View>
            <View style={styles.header}>
                <Text style={{ color: theme.colors.primary }}>服务器</Text>
            </View>
            <View style={styles.item} >
                <TouchableOpacity onPress={onOpenIpConfig}>
                    <Text style={styles.title}>服务器地址</Text>
                    <Text style={styles.info}>{ipInfo}</Text>
                </TouchableOpacity>
            </View>
            <View style={{ marginTop: 10 }}>
                <Line ></Line>
            </View>
            {/* <View style={styles.item} >
                <TouchableOpacity onPress={onOpenAuthConfig}>
                    <Text style={styles.title}>API密钥</Text>
                    <Text style={styles.info}>{authInfo}</Text>
                </TouchableOpacity>
            </View> */}
            {/* <View style={{ marginTop: 10 }}>
                <Line ></Line>
            </View> */}
            <LModal visible={ipConfigVisble} onClose={onCloseIpConfig}>
                <View>
                    <Text >服务器地址</Text>
                    <TextInput value={ip} onChangeText={value => { changeIpConfig(value) }} placeholder='请输入服务器地址以及端口' style={styles.input} ></TextInput>
                    <View style={styles.footer}>
                        <TouchableOpacity onPress={onCloseIpConfig}>
                            <Text style={styles.cancle}>取消</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onComfireIpConfig}>
                            <Text style={styles.comfire}>确定</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </LModal>
        </View >

    )
}

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 10,
        marginVertical: 8,
    },
    item: {
        height: hp(5),
        justifyContent: 'center',
        marginTop: 10,
        paddingHorizontal: 10,
    },
    title: {
        fontSize: hp(1.6)
    },
    info: {
        color: theme.colors.info,
        marginTop: 4
    },
    modalView: {
        marginTop: "30%",
        marginHorizontal: 20,
        backgroundColor: "white",
        borderRadius: theme.radius.sm,
        padding: 10,
        width: hp(40)
    },
    input: {
        borderStyle: 'solid',
        borderBottomWidth: 1,
        borderColor: theme.colors.primary,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        color: theme.colors.primary,
        marginTop: 10
    },
    cancle: {
        color: theme.colors.primary,
        marginRight: 20
    },
    comfire: {
        color: theme.colors.primary
    }
})


export default Config