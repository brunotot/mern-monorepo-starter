import { Search } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";

export type InputFuzzySearchProps = {
  placeholder?: string;
};

export function FuzzySearchDesktop({
  placeholder = "",
}: InputFuzzySearchProps) {
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

export function InputFuzzySearch(props: InputFuzzySearchProps) {
  return <FuzzySearchDesktop {...props} />;
}
