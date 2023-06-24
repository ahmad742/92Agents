import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Pressable,
} from 'react-native';
// ------------------------------------------

const CustomInput = props => {
  const {
    label,
    leftIcon,
    iconStyle,
    placeholder,
    value,
    onChangeText,
    multiLine,
    textAlignVertical,
    password,
    editable,
    autoCapitalize,
    labelStyle,
    rightIcon,
    isLeftIcon,
    keyBoardType,
    rightIconOnPress,
    noIcon,
    returnKeyType,
    onSubmitEditing,
    fieldRef,
    maxLength,
    multiline,
    labelstyle,
    textinputStyle
  } = props;
  return isLeftIcon ? (
    <View style={[styles.mainContainer]}>
      <Text style={[styles.label,labelstyle]}>{label}</Text>
      <View style={[styles.secondaryContainer, textinputStyle]}>
        <Image source={leftIcon} style={[iconStyle, { tintColor: 'green' }]} />
        <TextInput
          style={{
            width: rightIcon ? '88%' : '100%',
            color: 'black',
            // marginLeft: 15,
            width: "90%",
          }}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={password}
          placeholderTextColor={'gray'}
          autoCapitalize={autoCapitalize}
          keyboardType={keyBoardType}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
          editable={editable}
          ref={fieldRef}
          multiline={multiline}
          maxLength={maxLength}
          blurOnSubmit={false}
          
        />

        {rightIcon && (
          <Pressable onPress={rightIconOnPress}>
            <Image source={rightIcon} style={[styles.rightStyle]} />
          </Pressable>
        )}
      </View>
    </View>
  ) : (
    <View style={[styles.mainContainer]}>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
      <View style={[styles.secondaryContainer]}>
        <TextInput
          style={[
            {
              color:'black',
              width: rightIcon ? '90%' : '100%',
              paddingHorizontal: 15,

            },

          ]}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          multiline={multiLine}
          textAlignVertical={textAlignVertical}
          secureTextEntry={password}
          placeholderTextColor={'gray'}
          editable={editable}
          autoCapitalize={autoCapitalize}
          keyboardType={keyBoardType}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
          ref={fieldRef}
          blurOnSubmit={false}
          maxLength={maxLength}
        />

        {rightIcon && (
          <Pressable onPress={rightIconOnPress}>
            <Image
              resizeMode="contain"
              source={rightIcon}
              style={[styles.rightStyle]}
            />
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  mainContainer: {
    // height: 100,
    width: '100%',
    alignSelf: 'center'
    // backgroundColor: colors.appBackground
  },
  label: {
    color: '#000000',
    // fontWeight: 'bold',
    height:25,
    marginLeft: 2,
    // fontFamily:Fonts.Regular
  },
  secondaryContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    // marginTop: 10,
    backgroundColor:'#F7F7F7',
    height: 50,
    width: '100%',
    borderRadius: 10,
    paddingHorizontal:15
  },
  rightStyle: {
    width: 20,
    height: 20,
    tintColor: '#CECECE',
    marginRight: 20
  },
});
