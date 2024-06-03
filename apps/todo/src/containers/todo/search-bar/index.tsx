import { Button, Input } from "@todo/ui";
import { ChangeEvent, FC, useState } from "react";
import { StyleSelect, StyleWrapSearch, StyleWrapSearchBar } from "./style";
import { Search } from "react-feather";

interface IProps {
  onSearch: (val: string) => void;
  selectedFilter: string;
  setSelectedFilter: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
}

const filterOptions = [
  { label: "All", value: "" },
  { label: "Completed", value: "completed" },
  { label: "Pending", value: "pending" },
];

const SearchBar: FC<IProps> = ({
  onSearch,
  selectedFilter,
  setSelectedFilter,
}) => {
  const [searchValue, setSearchValue] = useState<string>("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setSearchValue(e.target.value);
  };

  return (
    <StyleWrapSearchBar>
      <StyleSelect
        value={selectedFilter}
        onChange={setSelectedFilter}
        className="select-container"
        name="filter"
        id="filter"
      >
        {filterOptions.map((item) => (
          <option key={item.value} value={`${item.value}`}>
            {item.label}
          </option>
        ))}
      </StyleSelect>
      <StyleWrapSearch>
        <Input
          name="search"
          id="search"
          placeholder="Search title ..."
          value={searchValue}
          onChange={handleChange}
        />
        <Button className="btn-search" onClick={() => onSearch(searchValue)}>
          {" "}
          <Search size={20} />
        </Button>
      </StyleWrapSearch>
    </StyleWrapSearchBar>
  );
};

export default SearchBar;
