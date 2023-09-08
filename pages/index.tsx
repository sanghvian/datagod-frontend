import SignIn from '@components/organisms/SignIn';
import { Typography } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
const Home = () => {
  return (
    <div style={{ margin: '3rem', height: '100%' }}>
      <Typography.Title level={3}>Welcome to the Datagod Chatbot</Typography.Title>
      <SignIn />
    </div>
  );
};

export default Home;
