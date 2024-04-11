import { Search } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";

export type FuzzySearchProps = {
  placeholder?: string;
};

export function FuzzySearchDesktop({ placeholder = "" }: FuzzySearchProps) {
  return (
    <TextField
      placeholder={placeholder}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        ),
      }}
    />
  );
}

export function FuzzySearch(props: FuzzySearchProps) {
  return <FuzzySearchDesktop {...props} />;
}
