import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import { PersonIcon } from '@/assets/index';
import StyledAppbar from '@components/Styled/StyledAppbar';

const GuideSection = styled.section``;

const FindSection = styled.section``;

const Home = () => {
  const navigate = useNavigate();

  const handleClickLogin = useCallback(() => {
    navigate('/login');
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
      <GuideSection>Guide</GuideSection>
      <FindSection>find</FindSection>
    </>
  );
};

export default Home;
