import { Box, TextField } from "@mui/material";
import { TODO } from "@org/shared";

export type InputRangeProps = {
  value: number;
  label: string;
  onChange: (value: number) => void;
  unit?: string;
  max?: number;
  min?: number;
  step?: number;
};

export function InputRangeBasic({
  label,
  value,
  unit = "",
  onChange,
  min = 0,
  max = 100,
  step = 0,
}: InputRangeProps) {
  const unitChars = unit ? unit.length + 1 : 0;
  const textDisplay = unit ? `${unit} ${value}` : `${value}`;
  const largestAbsLimit = Math.max(Math.abs(min), Math.abs(max));
  const maxTextWidth = unitChars + String(largestAbsLimit).length;

  const handleSliderChange = (e: TODO) => {
    onChange(Number(e.target.value));
  };

  return (
    <TextField
      fullWidth
      onChange={handleSliderChange}
      value={value}
      label={label}
      type="range"
      InputProps={{
        startAdornment: (
          <Box
            width={`${maxTextWidth}ch`}
            fontFamily="monospace"
            whiteSpace="nowrap"
          >
            {textDisplay}
          </Box>
        ),
      }}
      inputProps={{
        step,
        min,
        max,
        sx: {
          display: "flex",
          flex: "1",
          paddingRight: "0 !important",
          marginLeft: "1ch !important",
          marginRight: "14px !important",
          accentColor: "var(--mui-palette-primary-main)",
        },
      }}
    />
  );
}
