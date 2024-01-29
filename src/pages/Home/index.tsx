import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import { PersonIcon } from '@/assets/index';
import NavTitle from '@/components/NavTitle';
import StyledAppbar from '@components/Styled/StyledAppbar';

const GuideSection = styled.section`
  width: 100%;
  height: 468px;
  background:
    url('/home-guide-background.png'),
    lightgray 50% / cover no-repeat;

  .guide-title {
    padding: 40px 0 36px 0;
    text-align: center;
  }
`;

const FindSection = styled.section`
  padding-top: 42px;
`;

const Home = () => {
  const navigate = useNavigate();

  const handleClickLogin = useCallback(() => {
    navigate('/login');
  }, [navigate]);

  const handleClickList = useCallback(() => {
    navigate('/list');
  }, [navigate]);
  return (
    <>
      <StyledAppbar>
        <div className="left title01">로고</div>
        <div className="right">
          <div onClick={handleClickLogin}>
            <PersonIcon />
          </div>
        </div>
      </StyledAppbar>
      <GuideSection>
        <div className="guide-title headline02">맛렙 PICK 편의점 꿀조합템</div>
      </GuideSection>
      <FindSection>
        <NavTitle title="꿀조합 인기 아이템" onClick={handleClickList} />
      </FindSection>
    </>
  );
};

export default Home;
