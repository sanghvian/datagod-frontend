import ChatApp from '@components/molecules/ChatFunction';
import ResizablePanes from '@components/organisms/ResizablePanes/index.tsx';
import S3Chat from '@components/organisms/S3Chat';
import BaseLayoutComp from '@components/templates/Layout';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
const Home = () => {
  const contentKey = useSelector((state: RootState) => state.state.contentKey)
  return (
    <BaseLayoutComp>
      {contentKey === '1' && <ChatApp />}
      {contentKey === '2' && <S3Chat />}
      {contentKey === '3' && <ResizablePanes />}
    </BaseLayoutComp>
  );
};

export default Home;
