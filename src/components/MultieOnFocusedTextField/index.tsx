/* eslint-disable no-unused-vars */
import { ChangeEvent, MouseEvent, useState } from 'react';

import TextField from '@mui/material/TextField';
import { styled } from 'styled-components';

const StyledTextField = styled(TextField)`
  .Mui-focused .MuiOutlinedInput-notchedOutline {
    border: 1px solid var(--Yellow-40, #ffc933);
    &:hover {
      border: 1px solid var(--Yellow-40, #ffc933);
    }
  }
`;
const StyledDiv = styled.div`
  width: 100%;
  margin-top: 12px;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;

  .text-num {
    color: var(--Gray-40, #ababab);
  }

  .register {
    display: flex;
    color: var(--gray90);
    width: 56px;
    height: 28px;
    padding: 0px 20px;
    border-radius: 4px;
    background: var(--Yellow-40, #ffc933);
    border: none;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    white-space: nowrap;
    cursor: pointer;
  }
`;

interface Props {
  word: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClick: (e: MouseEvent) => void;
}

const MultieOnFocusedTextField = ({ word, onChange, onClick }: Props) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsFocused(false);
    }, 200);
  };

  return (
    <>
      <StyledTextField
        value={word}
        onChange={onChange}
        size="small"
        placeholder="댓글을 남겨보세요."
        fullWidth
        multiline={isFocused}
        rows={4}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {isFocused && (
        <StyledDiv>
          <div className="text-num body02">{`${word.length}/300`}</div>
          <button type="button" className="register title04" onClick={onClick}>
            등록
          </button>
        </StyledDiv>
      )}
    </>
  );
};

export default MultieOnFocusedTextField;
