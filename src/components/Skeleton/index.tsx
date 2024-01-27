import { ReactElement } from 'react';

import styled from 'styled-components';

interface Props {
  width?: string;
  height?: string;
}

const StyledSkeleton = styled.div<Props>`
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  width: ${({ width = '90%' }) => width};
  height: ${({ height = '160px' }) => height};
  min-height: ${({ height = '160px' }) => height};
  border-radius: 10px;

  @keyframes shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }
`;

interface SkeletonProps {
  num?: number;
  width?: string;
  height?: string;
}

const Skeleton = ({
  num = 1,
  width = undefined,
  height = undefined,
}: SkeletonProps): ReactElement => (
  <>
    {new Array(num)
      .fill(0)
      .map((x, i) => x + i)
      .map((y) => (
        <StyledSkeleton key={y} width={width} height={height} />
      ))}
  </>
);

export default Skeleton;
