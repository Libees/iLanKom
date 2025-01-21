import { Modal, StyleSheet, TouchableWithoutFeedback, View } from 'react-native'
import React, { ReactElement, ReactPortal, useEffect, useState } from 'react'
import { wp, hp } from '../../../utils/utils'
import { theme } from '../../../constansts/theme'
interface ModalProps {
    visible: boolean
    onClose: () => void
    children: ReactElement
}
const LModal: React.FC<ModalProps> = ({ visible, children, onClose }) => {
    const [show, setShow] = useState(visible)
    useEffect(() => {
        setShow(visible)
    }, [visible])
    const handleMaskPress = () => {
        onClose()
    }
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={show}
        >
            <TouchableWithoutFeedback onPress={handleMaskPress}>
                <View style={styles.container}>
                    <View style={styles.body}>
                        <TouchableWithoutFeedback>
                            {children}
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </TouchableWithoutFeedback>

        </Modal >

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(217, 217, 217,0.5)',
        alignItems: 'center',
    },
    body: {
        marginTop: hp(30),
        width: wp(90),
        backgroundColor: "#FFF",
        borderRadius: theme.radius.sm,
        padding: 10,
    }
})

export default LModal