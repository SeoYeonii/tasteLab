// eslint-disable-next-line object-curly-newline
import { Suspense, useCallback, useEffect, useState } from 'react';

import styled from 'styled-components';

import Chip from '@/components/Chip';
import { SORT_LABEL_MAP, SortType } from '@/interfaces/common';

import ProfileInfo, {
  Fallback as ProfileInfoFallback,
  ProfileInfoUnlogin,
} from './components/ProfileInfo';
import SavedItems, {
  Fallback as SavedItemsFallback,
} from './components/SavedItems';

const StyledSection = styled.section`
  padding: 32px 20px;
  display: flex;
  flex-direction: column;

  .saved-title {
    display: flex;
    padding: 0 8px 0px 8px;
    align-items: center;
  }
  .sort-button-container {
    display: inline-flex;
    padding: 20px 0px 20px 0px;
    gap: 10px;
  }

  .saved-container {
    padding: 28px 0 28px 0;
  }
`;

const Profile = () => {
  const [isLogin, setIsLogin] = useState(
    localStorage.getItem('loginToken') !== null,
  );

  const [selectedSort, setSelectedSort] = useState<SortType>('A');
  const handleClickSort = useCallback((sort: SortType) => {
    setSelectedSort(sort);
  }, []);

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'loginToken') {
        const newLoginToken = event.newValue;
        setIsLogin(newLoginToken !== null);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <>
      <Suspense fallback={<ProfileInfoFallback />}>
        {isLogin && <ProfileInfo />}
        {!isLogin && <ProfileInfoUnlogin />}
      </Suspense>
      <StyledSection>
        <div className="saved-title headline02">내가 찜한 꿀조합</div>
        <div className="sort-button-container">
          {Object.keys(SORT_LABEL_MAP).map((k) => (
            <Chip
              key={k}
              selected={selectedSort === k}
              label={SORT_LABEL_MAP[k as SortType]}
              onClick={() => handleClickSort(k as SortType)}
            />
          ))}
        </div>
        <div className="saved-container">
          {isLogin && (
            <Suspense fallback={<SavedItemsFallback />}>
              <SavedItems category={selectedSort} />
            </Suspense>
          )}
        </div>
      </StyledSection>
    </>
  );
};

export default Profile;
