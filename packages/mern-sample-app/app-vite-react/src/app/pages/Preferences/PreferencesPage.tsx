import type { Breakpoint, SelectChangeEvent } from "@mui/material";
import { Card, CardContent, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { sigPreferences } from "@org/app-vite-react/signals/sigPreferences";
import { type TODO } from "@org/lib-commons";

export default function PreferencesPage() {
  const handleChange = (event: SelectChangeEvent<Breakpoint | false>) => {
    sigPreferences.value = {
      ...sigPreferences.value,
      containerWidth: event.target.value as Breakpoint,
    };
  };

  return (
    <Card>
      <CardContent>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
          <Select<Breakpoint | false>
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={sigPreferences.value.containerWidth}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value={false as TODO}>None</MenuItem>
            <MenuItem value="xs">xs</MenuItem>
            <MenuItem value="sm">sm</MenuItem>
            <MenuItem value="md">md</MenuItem>
            <MenuItem value="lg">lg</MenuItem>
            <MenuItem value="xl">xl</MenuItem>
          </Select>
        </FormControl>
      </CardContent>
    </Card>
  );
}
