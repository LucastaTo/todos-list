import styled, { device, themeGet } from "@todo/shared/styled";
import { Card } from "@todo/ui";

export const StyledWrap = styled(({ ...rest }) => <Card {...rest} />)`
  padding: 2rem;
  border-radius: 5px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.5em;
`;

export const StyledAddTodo = styled(({ ...rest }) => <Card {...rest} />)`
  background: #e3e7ed;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  max-height: 250px;
  min-height: 250px;
  &:hover {
    background: #cdd4e0;
  }
`;

export const StyleTopbarWrappper = styled.div`
  margin-bottom: 15px;
  width: 70%;
  ${device.small} {
    width: 250px;
  }
  ${device.large} {
    width: 300px;
  }
`;

export const StyledTitle = styled.h1`
  font-size: 24px;
  ${device.small} {
    font-size: 32px;
  }
  ${device.large} {
    font-size: 36px;
  }
  ${device.xlarge} {
    margin-bottom: 5px;
  }
`;

export const StyledSubTitle = styled.h5`
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 20px;
  ${device.small} {
    font-size: 18px;
  }
  ${device.large} {
    font-size: 20px;
  }
`;

export const StyledDesc = styled.p`
  color: ${themeGet("colors.text3")};
  margin-bottom: 30px;
`;

export const StyledResetForm = styled.div`
  margin-bottom: 40px;
  display: flex;
`;

export const StyledNote = styled.span`
  color: ${themeGet("colors.text3")};
  font-size: 12px;
`;
