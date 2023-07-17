import React, {ReactElement} from 'react';
import {Keyboard, KeyboardAvoidingView, Platform, StyleProp, TouchableWithoutFeedback, ViewStyle} from "react-native";

/**
 * 일반 View 를 사용하면 키보드가 필요한 컴포넌트(TextInput)를 사용할 때
 * 키보드가 View 내의 컴포넌트들을 가리는 문제가 발생
 * KeyboardAvoidingView 를 사용하면 키보드 사용시 특정 옵션값(behavior/padding|height|position)들을 기준으로
 * 자동으로 컴포넌트를 가리지 않도록 화면을 조정해줌
 */
/**
 * KeyboardAvoidingView 는 ScrollView 와 함께 사용 및 일부 알려진 문제점들이 존재
 * 대체재로 react-native-keyboard-aware-scrollview 라이브러리를 활용할 수 있음
 * KeyboardAvodingView 에 대한 트러블슈팅이 필요할 때 재고려
 */
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
        // behavior: 키보드가 활성화 되었을 떄 자동으로 화면을 조정하는 기능
        // OS 마다 동작하는 방식이 다르기 때문에 아래와 같이 플랫폼별로 구분해서 작성하는 것을 추천
        // * 아래는 공식문서 기준 *
        // IOS 는 키보드가 나타날 때 화면을 밀어올리는 방식을 사용하기 때문에 컴포넌트 주위에 자동으로 패딩을 조절하는 'padding' 속성을 이용
        // Android 는 키보드가 나타날 때 컴포넌트 크기를 조정해서 겹치지 않도록 하는데, 컴포넌트의 높이를 자동으로 조절하는 'height' 속성을 이용
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        {children}
      </Comp>
    </TouchableWithoutFeedback>
  );
};

const DismissKeyboardView = DismissKeyboardViewHOC(KeyboardAvoidingView);

export default DismissKeyboardView;
