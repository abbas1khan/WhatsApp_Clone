import { Alert, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { colors } from '../utils/Theme'
import { Camera, useCameraDevice } from 'react-native-vision-camera'
import { useNavigation } from '@react-navigation/native'
import useIsFocused from '../hooks/useIsFocused'

const CameraScreen = () => {


    const [isFrontCamera, setIsFrontCamera] = useState(true)
    const [isFlashon, setIsFlashon] = useState(true)
    const [isLongPressed, setIsLongPressed] = useState(false)



    const device = useCameraDevice(isFrontCamera ? "front" : "back")


    const cameraRef = useRef()
    const navigation = useNavigation()
    const { navigate } = useNavigation()
    const isFocused = useIsFocused()



    async function checkPermission() {
        let cameraPermission = await Camera.requestCameraPermission()
        let microphonePermission = await Camera.requestMicrophonePermission()
        cameraPermission = await Camera.getCameraPermissionStatus();
        microphonePermission = await Camera.requestMicrophonePermission();

        if (cameraPermission === 'denied' || microphonePermission === 'denied') {
            Alert.alert("Please allow camera & microphone permission", '', [
                {
                    text: 'Cancel',
                    onPress: () => { navigation.goBack() },
                    style: 'cancel',
                },
                {
                    text: 'Settings',
                    onPress: async () => { navigation.goBack(); await Linking.openSettings() }
                },
            ]);
        }
    }

    async function capturePhoto() {
        if (cameraRef.current && cameraRef.current !== null) {
            try {
                const data = await cameraRef.current?.takePhoto({
                    flash: isFlashon && !isFrontCamera ? "on" : "off",
                })
                console.log("🚀 ~ file: CameraScreen.js:64 ~ capturePhoto ~ data:", data)
            }
            catch (error) {
                console.error("🚀 ~ file: CameraScreen.js:55 ~ capturePhoto ~ error:", error)
            }
        }
    }

    async function startVideoRecording() {
        if (cameraRef.current && cameraRef.current !== null) {
            try {
                await cameraRef.current?.startRecording({
                    flash: isFlashon && !isFrontCamera ? "on" : "off",
                    onRecordingFinished: (video) => {
                        console.log("🚀 ~ file: CameraScreen.js:66 ~ startVideoRecording ~ video:", video)
                    },
                    onRecordingError: (error) => console.error(error),
                })
            }
            catch (error) {
                console.error("🚀 ~ file: CameraScreen.js:75 ~ startVideoRecording ~ error:", error)
            }
        }
    }

    async function stopVideoRecording() {
        if (cameraRef.current && cameraRef.current !== null && isLongPressed) {
            try {
                await cameraRef.current?.stopRecording()
            }
            catch (error) {
                console.error("🚀 ~ file: CameraScreen.js:83 ~ stopVideoRecording ~ error:", error)
            }
        }
    }


    useEffect(() => {
        checkPermission()
    }, [])


    return (
        <View style={{ flex: 1, backgroundColor: colors.black, }}>

            <View style={{ flex: 1 }}>
                {device && isFocused &&
                    <Camera
                        style={{ flex: 1 }}
                        device={device}
                        isActive={isFocused}
                        photo={true}
                        video={true}
                    />
                }

                <TouchableOpacity
                    onPress={() => { setIsFrontCamera((isFrontCamera) => !isFrontCamera) }}
                    style={{ position: 'absolute', bottom: 20, right: 20 }}>
                    <View style={{ width: 50, height: 50, borderRadius: 50, backgroundColor: colors.white, }} />
                </TouchableOpacity>
            </View>

            <View style={{ height: 50, }}>

            </View>

        </View>
    )
}

export default CameraScreen

const styles = StyleSheet.create({})