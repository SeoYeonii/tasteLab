import styled from 'styled-components';

import StyledAppbar from '@components/Styled/StyledAppbar';

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
  }

  .name-container {
    .email {
      color: var(--gray70, #5f5f5f);
    }
  }
`;

const Profile = () => {
  console.log('Profile');

  return (
    <>
      <StyledAppbar>
        <div className="center title01">마이페이지</div>
      </StyledAppbar>
      <StyledProfileSection>
        <div className="profile-img-container">프로필</div>
        <div className="name-container">
          <div className="title01">이름</div>
          <div className="email body02">이메일</div>
        </div>
      </StyledProfileSection>
    </>
  );
};

export default Profile;
