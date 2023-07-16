import React, {ReactElement} from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, StyleProp, TouchableWithoutFeedback, ViewStyle } from "react-native";

const DismissKeyboardViewHOC = (
  Comp: typeof KeyboardAvoidingView,
): React.FC<{
  style?: StyleProp<ViewStyle>;
  children: ReactElement | ReactElement[];
}> => {
  return ({children, ...props}) => (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss} // Keyboard 내리기
      accessible={false} // for screenLeader
    >
      <Comp
        {...props}
        style={props.style}
        behavior={Platform.OS === 'android' ? 'position' : 'padding'}
      >
        {children}
      </Comp>
    </TouchableWithoutFeedback>
  );
};

const DismissKeyboardView = DismissKeyboardViewHOC(KeyboardAvoidingView);

export default DismissKeyboardView;
