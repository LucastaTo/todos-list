import styled, {
    space,
    css,
    device,
    SpaceProps,
    border,
    BorderProps,
    typography,
    TypographyProps,
} from "@todo/shared/styled";
import React from "react";
import { Container, Row, Col } from "styled-bootstrap-grid";

type IProps = SpaceProps;

export const StyledContainer = styled(
    ({ p, pl, pr, pt, pb, m, ml, mr, mt, mb, ...props }: any) => (
        <Container {...props} />
    )
)<IProps>`
    ${space};
`;

export const StyledRow = styled(
    ({ p, pl, pr, pt, pb, m, ml, mr, mt, mb, ...props }: any) => <Row {...props} />
)<IProps>`
    ${space};
    ${({ $gutters }: any) =>
        !!$gutters &&
        css`
            margin-left: -${$gutters / 2}px;
            margin-right: -${$gutters / 2}px;
            & > div {
                padding-left: ${$gutters / 2}px;
                padding-right: ${$gutters / 2}px;
            }
        `}
    ${({ $noGutter }: any) =>
        $noGutter === true &&
        css`
            margin-left: 0px;
            margin-right: 0px;
            & > div {
                padding-left: 0px;
                padding-right: 0px;
            }
        `}
`;

interface ICol extends IProps, BorderProps, TypographyProps {}

export const StyledCol = styled(
    ({ p, pl, pr, pt, pb, m, ml, mr, mt, mb, textAlign, ...props }: any) => (
        <Col {...props} />
    )
)<ICol>`
    ${device.small} {
        &.order-sm-0 {
            order: 0;
        }
    }
    ${device.medium} {
        &.order-md-0 {
            order: 0;
        }
    }
    ${device.large} {
        &.order-lg-0 {
            order: 0;
        }
    }
    ${device.xlarge} {
        &.order-xl-0 {
            order: 0;
        }
    }
    ${space};
    ${border};
    ${typography};
`;
