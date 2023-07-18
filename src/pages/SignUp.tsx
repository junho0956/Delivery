import React, { useCallback, useRef, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import DismissKeyboardView from "../components/DismissKeyboardView";

type SignUpScreenProps = NativeStackScreenProps<RootStackParamList, 'SignUp'>;
function SignUp({navigation}: SignUpScreenProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const emailRef = useRef<TextInput>(null);
  const nameRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const onChangeEmail = useCallback((text: string) => {
    setEmail(text.trim());
  }, []);
  const onChangeName = useCallback((text: string) => {
    setName(text.trim());
  }, []);
  const onChangePassword = useCallback((text: string) => {
    setPassword(text.trim());
  }, []);

  const onSubmit = useCallback(() => {
    if (!email || !email.trim()) {
      return Alert.alert('알림', '이메일을 입력해주세요.');
    }
    if (!name || !name.trim()) {
      return Alert.alert('알림', '이름을 입력해주세요.');
    }
    if (!password || !password.trim()) {
      return Alert.alert('알림', '비밀번호를 입력해주세요.');
    }
    Alert.alert('알림', '회원가입이 완료되었습니다.');
  }, [email, name, password]);

  const canGoNext = email && name && password;

  return (
    <DismissKeyboardView>
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>이메일</Text>
        <TextInput
          style={styles.textInput}
          placeholder="이메일을 입력해주세요."
          value={email}
          onChangeText={onChangeEmail}
          importantForAutofill="yes" // only android | 자동 완성(AutoFill) 기능에서 입력 필드의 중요도를 설정함, yes: 해당 입력 필드를 자동 완성에서 중요한 입력으로 처리
          autoComplete="email" // 자동완성기능을 제어하는 옵션, 사용자가 이전에 입력한 값을 기반으로 텍스트 입력 필드에 자동 완성을 표시할지 대한 여부를 결정
          textContentType="emailAddress" // text 의 type
          keyboardType="email-address" // keyboard 의 type
          returnKeyType="next" // keyboard 의 엔터키, 기본적으로 제공되는 여러 형태의 버튼이 있다
          ref={emailRef}
          onSubmitEditing={() => nameRef.current?.focus()} // 엔터키 눌렀을 때 = submit 되었을 때
          blurOnSubmit={false}
          clearButtonMode="while-editing" // input 끝에 x 버튼을 통해 입력값을 초기화할 수 있는 설정
        />
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>이름</Text>
        <TextInput
          style={styles.textInput}
          placeholder="이름을 입력해주세요."
          value={name}
          onChangeText={onChangeName}
          importantForAutofill="yes"
          autoComplete="email"
          textContentType="emailAddress"
          keyboardType="email-address"
          returnKeyType="next"
          ref={nameRef}
          onSubmitEditing={() => passwordRef.current?.focus()}
          blurOnSubmit={false}
          clearButtonMode="while-editing"
        />
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>비밀번호</Text>
        <TextInput
          style={styles.textInput}
          placeholder="비밀번호를 입력해주세요."
          value={password}
          onChangeText={onChangePassword}
          secureTextEntry
          importantForAutofill="yes"
          autoComplete="password"
          textContentType="password"
          ref={passwordRef}
          onSubmitEditing={onSubmit}
          blurOnSubmit={true}
        />
      </View>
      <View style={styles.buttonZone}>
        <Pressable
          onPress={onSubmit}
          style={
            !canGoNext
              ? styles.signupButton
              : StyleSheet.compose(styles.signupButton, styles.signupButtonText)
          }
          disabled={!canGoNext}>
          <Text style={styles.signupButtonText}>회원가입</Text>
        </Pressable>
      </View>
      <View></View>
    </DismissKeyboardView>
  );
}

export default SignUp;

const styles = StyleSheet.create({
  inputWrapper: {
    padding: 10,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 20,
  },
  textInput: {
    padding: 5,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  loginButton: {
    backgroundColor: 'gray',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
  },
  loginButtonActive: {
    backgroundColor: 'blue',
  },
  buttonZone: {
    alignItems: 'center',
  },
  signupButton: {
    backgroundColor: 'gray',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  signupButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
