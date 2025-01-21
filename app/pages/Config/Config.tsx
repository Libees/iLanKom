import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput } from 'react-native'
import React, { ReactElement, useEffect } from 'react'
import { useState, useRef } from 'react'
import Line from '../../components/Line/Line'
import LModal from './components/LModal'
import { hp } from '../../utils/utils'
import { theme } from '../../constansts/theme'
import storage from '../../utils/storage'
import { CONFIG_STORAGE_KEY } from '../../constansts/config'
import { store } from '../../redux/redux'
import { setStoreIp, setStoreAuth } from '../../redux/redux'

const ipConfig = () => {
    const [ip, setIp] = useState('')
    const ipStorageRef = useRef('')
    const [ipConfigVisble, setIpConfigVisible] = useState(false)
    let config = store.getState()
    useEffect(() => {
        loadStorage()
    }, [])
    const onOpenIpConfig = () => {
        setIpConfigVisible(true)
    }
    const onCloseIpConfig = () => {
        setIpConfigVisible(false)
        return null
    }
    const onComfireIpConfig = () => {
        console.log('xxxxx', config)
        storage.save({
            key: CONFIG_STORAGE_KEY,
            data: {
                ...config,
                ip: ipStorageRef.current
            }
        })
        setIp(ipStorageRef.current)
        store.dispatch(setStoreIp(ipStorageRef.current))
        onCloseIpConfig()
    }
    const loadStorage = () => {
        storage.load({
            key: CONFIG_STORAGE_KEY,
            autoSync: true
        }).then(res => {
            if (res.ip) {
                setIp(res.ip)
            }
        })
    }
    const changeIpConfig = (value: string) => {
        ipStorageRef.current = value
    }
    return {
        ip,
        ipConfigVisble,
        changeIpConfig,
        onOpenIpConfig,
        onCloseIpConfig,
        onComfireIpConfig
    }
}
const authConfig = () => {
    const [auth, setAuth] = useState('')
    const authStorageRef = useRef('')
    const [authConfigVisible, setAuthConfigVisible] = useState(false)
    let config = store.getState()
    useEffect(() => {
        loadStorage()
    }, [])
    const loadStorage = () => {

        storage.load({
            key: CONFIG_STORAGE_KEY,
            autoSync: true
        }).then(res => {
            if (res.auth) {
                setAuth(res.auth)
            }
        })
    }
    const changeAuthConfig = (value: string) => {
        authStorageRef.current = value
    }
    const onOpenAuthConfig = () => {
        setAuthConfigVisible(true)
    }
    const onCloseAuthConfig = () => {
        setAuthConfigVisible(false)
    }
    const onComfireAuthConfig = () => {
        storage.save({
            key: CONFIG_STORAGE_KEY,
            data: {
                ...config,
                auth: authStorageRef.current
            }
        })
        store.dispatch(setStoreAuth(authStorageRef.current))
        setAuth(authStorageRef.current)
        onCloseAuthConfig()
    }
    return {
        auth,
        authConfigVisible,
        onOpenAuthConfig,
        onCloseAuthConfig,
        onComfireAuthConfig,
        changeAuthConfig
    }
}
const Config = () => {
    const { onCloseIpConfig, onOpenIpConfig, onComfireIpConfig, changeIpConfig, ipConfigVisble, ip } = ipConfig()
    const { auth, authConfigVisible, onOpenAuthConfig, onCloseAuthConfig, onComfireAuthConfig, changeAuthConfig } = authConfig()
    return (
        <View>
            <View style={styles.header}>
                <Text style={{ color: theme.colors.primary }}>服务器</Text>
            </View>
            <View style={styles.item} >
                <TouchableOpacity onPress={onOpenIpConfig}>
                    <Text style={styles.title}>服务器地址</Text>
                    <Text style={styles.info}>{ip ? `http://${ip}` : '点击设置ip地址'}</Text>
                </TouchableOpacity>
            </View>
            <View style={{ marginTop: 10 }}>
                <Line ></Line>
            </View>
            <View style={styles.item} >
                <TouchableOpacity onPress={onOpenAuthConfig}>
                    <Text style={styles.title}>API密钥</Text>
                    <Text style={styles.info}>{auth ? `${auth}` : '点击设置api密钥'}</Text>
                </TouchableOpacity>
            </View>
            <View style={{ marginTop: 10 }}>
                <Line ></Line>
            </View>
            <LModal visible={ipConfigVisble} onClose={onCloseIpConfig}>
                <View>
                    <Text >服务器地址</Text>
                    <TextInput defaultValue={ip} onChangeText={value => { changeIpConfig(value) }} placeholder='请输入服务器地址以及端口' style={styles.input} ></TextInput>
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
            <LModal visible={authConfigVisible} onClose={onCloseAuthConfig}>
                <View>
                    <Text >API密钥</Text>
                    <TextInput defaultValue={auth} onChangeText={value => { changeAuthConfig(value) }} placeholder='请输入API密钥' style={styles.input} ></TextInput>
                    <View style={styles.footer}>
                        <TouchableOpacity onPress={onCloseAuthConfig}>
                            <Text style={styles.cancle}>取消</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onComfireAuthConfig}>
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