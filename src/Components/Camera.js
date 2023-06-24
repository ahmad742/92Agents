import { PermissionsAndroid, Platform } from "react-native"
import { check, checkMultiple, PERMISSIONS, request, requestMultiple, RESULTS } from "react-native-permissions"

export async function canUseCamera() {
    console.log('in canUseCamera')
    if (Platform.OS === 'ios') {
        try {
            const permissionsStatus = await check(PERMISSIONS.IOS.CAMERA)
            console.log('permissionsStatus', permissionsStatus)

            if (permissionsStatus === RESULTS.GRANTED) {
                return true
            }

            else {
                console.log("in else request(PERMISSIONS.IOS.CAMERA, ");
                request(PERMISSIONS.IOS.CAMERA, {
                    title: 'App Camera Permission',
                    message:
                        'ShoutOut App needs access your camera for to add Video.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                }).
                then(granted => {
                    console.log('response in permission', granted)
                    if (granted === RESULTS.GRANTED) {
                        console.log('You can use the camera');
                        return true
                    }
                    else {
                        alert("Camera Permission Denied .");
                    }
                }).catch((error) => {
                    console.log('error  in permission', error);
                })

            }
        } catch (error) {
            console.warn(error);
        }
    } else {
        //    try {
        //     const permissionsStatus = await check(PERMISSIONS.ANDROID.CAMERA)
        //     console.log('permissionsStatus android',permissionsStatus)
        //     // const cameraPermission = permissionsStatus[PERMISSIONS.ANDROID.CAMERA]

        //     if (permissionsStatus === RESULTS.GRANTED) {
        //         console.log('sending camera Permission 1')
        //         return true
        //     }

        //     // const granted = await 
        //     // requestMultiple(PERMISSIONS.ANDROID.LOCATION_ALWAYS).then((result) => {
        //     //   console.log('response in permission',result)
        //     // })
        //     request(PERMISSIONS.ANDROID.CAMERA).
        //     then(granted=>{
        //       console.log('response in permission android',granted)
        //       console.log('response in permission android',granted === RESULTS.GRANTED)
        //       if (granted === RESULTS.GRANTED) {
        //         console.log('You can use the camera');
        //         return true
        //     } 
        //     else {
        //         console.log('i am in else ')
        //         alert("Camera permission denied");
        //     }
        //     }).catch((error)=>{
        //       console.log('error  in permission',error);
        //     })

        //    } 
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA
                // {
                //   title: "Search Work Camera Permission",
                //   message:
                //     "Search Work needs access to your camera .",
                //   buttonNeutral: "Ask Me Later",
                //   buttonNegative: "Cancel",
                //   buttonPositive: "OK"
                // }
            );
            if (granted === PermissionsAndroid?.RESULTS?.GRANTED) {
                console.log("You can use the camera");
                return true
            } else {
                console.log("Camera permission denied");
                alert("Permission denied", "Camera permission denied. You can change it from settings")
                return false
            }
        }
        catch (err) {
            console.warn(err);
        }
    }

    return false
}
// export async function canUseLocation() {
//     console.log('in canUseLocation')
//    if (Platform.OS === 'ios') {
//        try {
//            const permissionsStatus = await check(PERMISSIONS.IOS.LOCATION_ALWAYS)
//            console.log('permissionsStatus canUseLocation',permissionsStatus)
//         //    const locationPermission = permissionsStatus[PERMISSIONS.IOS.LOCATION_ALWAYS]

//            if (permissionsStatus === RESULTS.GRANTED) {
//                return true
//            }
//            request(PERMISSIONS.IOS.LOCATION_ALWAYS,  {
//              title: 'App location Permission',
//              message:
//                  'SearchWork App needs access to your location to post and view jobs nearby. ',
//              buttonNeutral: 'Ask Me Later',
//              buttonNegative: 'Cancel',
//              buttonPositive: 'OK',
//          }).
//            then(granted=>{
//              console.log('response in permission',granted)
//              if (granted === RESULTS.GRANTED) {
//                console.log('You can use the camera');
//                return true
//            } 
//            else {
//             console.log("Location permission denied");
//            }
//            }).catch((error)=>{
//              console.log('error  in permission',error);
//            })
//        } catch (error) {
//            console.warn(error);
//        }
//    } else {
//        try {
//            const permissionsStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
//            console.log('permissionsStatus',permissionsStatus)
//            const locationPermission = permissionsStatus[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION]

//            if (permissionsStatus === RESULTS.GRANTED) {
//                return true
//            }

//            const granted = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
//              {
//                title: 'App location Permission',
//                message:
//                    'SearchWork App needs access to your location to post and view jobs nearby. ',
//                buttonNeutral: 'Ask Me Later',
//                buttonNegative: 'Cancel',
//                buttonPositive: 'OK',
//            }
//            );
//            console.log('permissions ', granted)

//            if (granted === RESULTS.GRANTED) {
//                console.log('You can use the camera');
//                return true
//            } else {
//             alert("Location permission denied");
//            }
//        } catch (err) {
//            console.warn(err);
//        }
//    }

//    return false
// }