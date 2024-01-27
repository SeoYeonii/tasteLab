import { ReactElement, useCallback } from 'react';
import { useErrorBoundary } from 'react-error-boundary';

import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  .title-container {
    display: inline-flex;
    align-items: center;
    background-color: #000;
    padding: 1rem;
    gap: 0.2rem;

    .icon {
      color: #fff;
      height: 1rem;
      width: 1rem;
    }
    .title {
      font-size: 1rem;
      font-weight: 900;
      color: #fff;
    }
  }

  .error-content-container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem;

    .title {
      font-size: 1rem;
      font-weight: 900;
      color: #ff0000;
    }

    .content {
      p {
        font-size: 0.8rem;
        color: #5e5e5e;
      }
    }

    .manager-container {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      .title {
        font-size: 0.8rem;
        color: #ff0000;
      }
    }
  }

  .error-container {
    .show-button {
      border: none;
      margin-bottom: 0.2rem;
      background-color: #fff;
      &:hover {
        cursor: pointer;
        background-color: #e7e7e7;
      }
    }
    .error-div {
      border: 1px solid #cccccc;
      padding: 0.5rem;
      font-size: 0.8rem;
      color: #5e5e5e;
      white-space: pre-wrap;
    }
  }

  .refresh-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.1rem 1rem 1rem 1rem;

    .refresh {
      border: 1px solid #cccccc;
      padding: 0.1rem 0.5rem 0.2rem 0.5rem;
      border-radius: 1rem;

      &:hover {
        cursor: pointer;
        background-color: #cccccc;
      }
    }
  }
`;

interface Props {
  resetApiInputValue?: () => void;
}

const CommonErrorFallback = ({
  resetApiInputValue = undefined,
}: Props): ReactElement => {
  const { resetBoundary } = useErrorBoundary();

  const handleClickReset = useCallback(() => {
    resetApiInputValue?.();
    resetBoundary();
  }, [resetApiInputValue, resetBoundary]);

  return (
    <Container>
      <div className="title-container">
        <div className="title">오류안내</div>
      </div>
      <div className="error-content-container">
        <div className="title">시스템 오류입니다.</div>
        <div className="content">
          <p>현재 이 페이지는 문제가 발생 하였습니다.</p>
        </div>
      </div>
      <div className="refresh-container">
        <button className="refresh" type="button" onClick={handleClickReset}>
          새로고침
        </button>
      </div>
    </Container>
  );
};

export default CommonErrorFallback;
