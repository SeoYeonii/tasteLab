import styled from 'styled-components';

const StyledFooter = styled.section`
  position: sticky;
  bottom: 0;
  height: 64px;
  border-top: 2px solid var(--Gray-90, #1c1c1c);
  background: #fff;
`;

const Footer = () => {
  console.log('Footer');
  return <StyledFooter>Temp Footer</StyledFooter>;
};

export default Footer;
