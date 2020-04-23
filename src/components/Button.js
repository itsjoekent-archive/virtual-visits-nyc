import styled from 'styled-components';

export const Button = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[9]};
  font-family: ${({ theme }) => theme.fonts.family};
  font-size: ${({ theme }) => theme.fonts.size[18]};
  font-weight: ${({ theme }) => theme.fonts.weight.black};
  text-decoration: none;
  text-transform: uppercase;
  text-align: center;
  letter-spacing: 1px;
  white-space: nowrap;
  cursor: pointer;
`;

export const WhiteButton = styled(Button)`
  color: ${({ theme }) => theme.colors.blue};
  background: ${({ theme }) => theme.colors.white};
  border: 4px solid ${({ theme }) => theme.colors.white};

  &:hover {
    color: ${({ theme }) => theme.colors.white};
    background: transparent;
  }
`;

export const BlueButton = styled(Button)`
  color: ${({ theme }) => theme.colors.white};
  background: ${({ theme }) => theme.colors.blue};
  border: 4px solid ${({ theme }) => theme.colors.blue};

  &:hover {
    color: ${({ theme }) => theme.colors.blue};
    background: transparent;
    border: 4px solid ${({ theme }) => theme.colors.blue};
  }
`;
