import React, { useEffect } from 'react'
import { Button, message, Tooltip, Typography } from 'antd';
import { Content, Footer } from 'antd/lib/layout/layout';
import { GoogleOutlined } from '@ant-design/icons';
import styles from './signin.module.scss'
import { Auth, Hub } from 'aws-amplify';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import { AppDispatch, RootState } from 'src/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser } from '../../../redux/features/userSlice';
// import apiService from 'src/services/api-service';
import { useRouter } from 'next/router';

const { Title } = Typography

const SignIn = () => {
  return (
    <div className={styles.landingContainer}>
      <div className={styles.pageHeader} >
        <h4>DataGod</h4>
        <h6>Chatbot which protects data</h6>
      </div>
      <Content className={styles.pageContent} >
        <p className={styles.pageLogin}>Sign in with email</p>
        <AmplifySignIn />
        <Title level={4}>Please wait for 5 secs after login, to be redirected to the dashboard</Title>
      </Content>
      <Footer>By SanKar</Footer>
    </div>
  )
}

const AmplifySignIn = () => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn":
          // setUser(data);
          break;
        case "autoSignIn":
          // setUser(data);
          break;
        case "autoSignIn_failure":
          // setUser(null);
          break;
        case "signOut":
          // setUser(null);
          break;
        case 'signIn_failure':
        case 'cognitoHostedUI_failure':
          break;
      }
    });

    Auth.currentAuthenticatedUser()
      .then(async (currentUser) => {
        if (currentUser) {
          const accessToken = currentUser.signInUserSession.accessToken.jwtToken
          const username = currentUser.username
          const emailAddress = currentUser.attributes.email
          const sub = currentUser.attributes.sub
          // const res = await apiService.createOrFindUser({ userCognitoId:`${sub}::${username}`, emailAddress:emailAddress, accessToken })
          const user = {
            id: `${sub}::${username}`,
            uid: `${sub}::${username}`,
            userCognitoId: `${sub}::${username}`,
            emailAddress: emailAddress,
            accessToken: accessToken
          }
          dispatch(setCurrentUser(user))
        }
      })
      .catch((e) => console.log("Not signed in", e));
    return unsubscribe;

  }, []);


  return (
    <div>
      <Tooltip title="Sign in">
        <Button className={styles.signInButton} onClick={
          () => Auth.federatedSignIn(
            { provider: CognitoHostedUIIdentityProvider.Google }
          )
        } type="primary" icon={<GoogleOutlined />}>Sign In</Button>
      </Tooltip>
    </div>
  );
}

export default SignIn
