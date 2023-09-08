import { Auth, Hub } from 'aws-amplify';
import { AppDispatch } from 'src/redux/store';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '@features/userSlice';
import { useRouter } from 'next/router';
import { LockFilled } from '@ant-design/icons';
import React, { useEffect, useState } from 'react'
import { Button, Input, message, Tooltip } from 'antd';
import styles from './signin.module.scss';

const SignIn = () => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();

  const handleSignIn = async (data) => {
    const accessToken = data.signInUserSession.accessToken.jwtToken
    const username = data.username
    const emailAddress = data.attributes.email
    const sub = data.attributes.sub
    try {
      const user = {
        id: `${sub}::${username}`,
        uid: sub,
        userCognitoId: `${sub}::${username}`,
        emailAddress: emailAddress,
        accessToken: accessToken
      }
      return user
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    const unsubscribe = Hub.listen("auth", async ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn":
          console.log({ data })
          const res = await handleSignIn(data)
          console.log({ res })
          dispatch(setCurrentUser(res as any))
          router.push('/home')
          break;
        case "autoSignIn":
          message.success("Previous login found....signing in")
          // setUser(data);
          break;
        case "autoSignIn_failure":
          // setUser(null);
          console.log("No previous login found")
          break;
        case "signOut":
          message.success('Successfully signed out');
          // setUser(null);
          break;
        case 'signIn_failure':
          console.log('Sign in failure', data);
          break
        case 'cognitoHostedUI_failure':
          break;
        default:
          console.log('default', data)
          break;
      }
    });
    return unsubscribe;
  }, []);


  const [username, setUsername] = useState<string>()
  const [password, setPassword] = useState<string>()

  return (
    <div>
      <Input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="input username"
      />
      <br />
      <br />
      <Input.Password
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="input password"
      />
      <Tooltip title="Sign in">
        <Button className={styles.signInButton} onClick={
          () => Auth.signIn(
            username, password
          )
        } type="primary" icon={<LockFilled />}>Sign In</Button>
      </Tooltip>
    </div>
  );
}

export default SignIn
