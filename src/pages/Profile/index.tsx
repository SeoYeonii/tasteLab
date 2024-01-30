import { Suspense } from 'react';

import StyledAppbar from '@components/Styled/StyledAppbar';

import ProfileInfo, {
  Fallback as ProfileInfoFallback,
} from './components/ProfileInfo';

const Profile = () => {
  console.log('Profile');

  return (
    <>
      <StyledAppbar>
        <div className="center title01">마이페이지</div>
      </StyledAppbar>
      <Suspense fallback={<ProfileInfoFallback />}>
        <ProfileInfo />
      </Suspense>
    </>
  );
};

export default Profile;
