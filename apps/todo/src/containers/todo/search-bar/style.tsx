import styled from "@todo/shared";
import { Select } from "@todo/ui";

export const StyleWrapSearchBar = styled.div`
  display: flex;
  margin-bottom: 1rem;
  justify-content: space-between;
`;

export const StyleSelect = styled((rest: any) => <Select {...rest} />)`
  border-radius: 1em;
  width: 120px;
`;

export const StyleWrapSearch = styled.div`
  display: flex;
  gap: 0.5rem;
  input {
    padding: 0 1rem;
    border-radius: 1em;
    width: 250px;
  }
  & .btn-search {
    border-radius: 50%;
    width: 40px;
    height: 40px;
    border: none;
    cursor: pointer;
    &:focus {
      background: transparent;
      border: none;
    }
    &:hover {
      background: rgb(205, 212, 224);
    }
  }
`;
