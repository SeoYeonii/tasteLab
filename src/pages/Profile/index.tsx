import { Suspense } from 'react';

import ProfileInfo, {
  Fallback as ProfileInfoFallback,
} from './components/ProfileInfo';

const Profile = () => {
  console.log('Profile');

  return (
    <>
      <Suspense fallback={<ProfileInfoFallback />}>
        <ProfileInfo />
      </Suspense>
    </>
  );
};

export default Profile;
