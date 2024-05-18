import { SearchIcon } from "@chakra-ui/icons";
import { FormControl, Input, Button } from "@chakra-ui/react";
interface SearchProps {
  handleFilter: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClickSearch: () => void;
  filter: string;
}
const Search = ({ handleClickSearch, handleFilter, filter }: SearchProps) => {
  return (
    <FormControl p={0} m={0} position="relative">
      <Input type="email" pr="40px" onChange={handleFilter} value={filter} />
      <Button
        position="absolute"
        right="0"
        h="100%"
        variant="ghost"
        zIndex="1"
        onClick={handleClickSearch}
      >
        <SearchIcon />
      </Button>
    </FormControl>
  );
};

export default Search;
