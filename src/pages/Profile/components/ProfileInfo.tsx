import { styled } from 'styled-components';

import { useGetProfileInfo } from '@/apis';
import { LogoIcon } from '@/assets';
import Skeleton from '@/components/Skeleton';

const StyledProfileSection = styled.section`
  width: 100%;
  height: 280px;
  background:
    url('/home-guide-background.png'),
    lightgray 50% / cover no-repeat;
  display: flex;
  padding: 40px 0px 32px 0px;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  .profile-img-container {
    width: 120px;
    height: 120px;
    border-radius: 833.333px;
    border: 1.667px solid #1c1c1c;
    background: var(--Gray-White, #fff);
    overflow: hidden;
    box-shadow: 4px 4px 0px 0px #000;
    display: flex;
    justify-content: center;
    align-items: center;
    div {
      border-radius: 50%;
    }
    svg {
      width: 48px;
      height: 40.552px;
      flex-shrink: 0;
      border-radius: 0;
      cursor: default;
      &:hover {
        box-shadow: none;
      }
    }
    img {
      width: 100%;
      height: 100%;
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
  const { data } = useGetProfileInfo();

  return (
    <StyledProfileSection>
      <div className="profile-img-container">
        {<img src={data?.picture ?? '/profile-image.png'} alt="profile" />}
      </div>
      <div className="name-container">
        <div className="title01">{data?.name ?? ''}</div>
        <div className="email body02">{data?.email ?? ''}</div>
      </div>
    </StyledProfileSection>
  );
};

export const ProfileInfoUnlogin = () => (
  <StyledProfileSection>
    <div className="profile-img-container">
      <LogoIcon />
    </div>
    <div className="name-container">
      <div className="headline02">로그인하시고 맛렙을</div>
      <div className="headline02">더 알차게 즐겨보세요 : )</div>
    </div>
  </StyledProfileSection>
);

export default ProfileInfo;
