import { useState } from 'react';

import { styled } from 'styled-components';

import { useGetProfileInfo } from '@/apis';
import { PersonFilledIcon } from '@/assets';
import Skeleton from '@/components/Skeleton';

const StyledProfileSection = styled.section`
  width: 100%;
  height: 280px;
  background: var(--yellow30, #ffd666);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 40px 0 48px 0;
  gap: 24px;

  .profile-img-container {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    border: 2px solid #000;
    background: var(--Gray-White, #fff);

    /* shadow */
    box-shadow: 0px 4px 15px 0px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
    div {
      border-radius: 50%;
    }
    svg {
      width: 5rem;
      height: 5rem;
    }
  }

  .name-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;
    .email {
      color: var(--gray70, #5f5f5f);
    }
  }
`;

export const Fallback = () => (
  <StyledProfileSection>
    <div className="profile-img-container">
      <Skeleton height="100%" width="100%" />
    </div>
    <div className="name-container">
      <div className="title01">
        <Skeleton height="0.8rem" width="4rem" />
      </div>
      <div className="email body02">
        <Skeleton height="0.8rem" width="7rem" />
      </div>
    </div>
  </StyledProfileSection>
);

const ProfileInfo = () => {
  const localKakaoLoginId = localStorage.getItem('kakaoLoginId');
  const [kakaoLoginId] = useState(
    localKakaoLoginId === null ? 0 : +localKakaoLoginId,
  );
  const { data } = useGetProfileInfo({ id: kakaoLoginId });
  console.log(data);

  return (
    <StyledProfileSection>
      <div className="profile-img-container">
        {data?.profileImageUrl && (
          <img src={data?.profileImageUrl} alt="profile" />
        )}
        {!data?.profileImageUrl && <PersonFilledIcon />}
      </div>
      <div className="name-container">
        <div className="title01">{data?.nickname ?? ''}</div>
        <div className="email body02">{data?.email ?? ''}</div>
      </div>
    </StyledProfileSection>
  );
};

export default ProfileInfo;
