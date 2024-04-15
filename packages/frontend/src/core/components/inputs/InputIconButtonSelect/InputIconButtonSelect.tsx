import { Box, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import { TODO } from "@org/shared";
import { useMemo, useState } from "react";

export type InputIconButtonSelectProps<Item = unknown, Value = Item> = {
  value: Value;
  onChange: (value: Value) => void;
  renderButton: (item: Item) => React.ReactNode;
  renderOption: (item: Item) => React.ReactNode;
  renderEmpty: () => React.ReactNode;
  mapToValue: (item: Item) => Value;
  mapToKey: (item: Item) => string | number;
  items: Item[];
  tooltip?: string;
  size?: "small" | "medium" | "large";
};

export function InputIconButtonSelect<
  const Item = unknown,
  const Value = Item
>({
  value,
  onChange,
  renderButton,
  renderOption,
  renderEmpty,
  mapToKey,
  mapToValue,
  items,
  tooltip = "",
  size = "medium",
}: InputIconButtonSelectProps<Item, Value>) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClickListItem = (event: TODO) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (item: Item) => {
    onChange(mapToValue(item));
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const selectedItem: Item | undefined = useMemo(
    () => items.find((item) => value === mapToValue(item)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [items]
  );

  return (
    <div>
      <Tooltip title={tooltip}>
        <IconButton size={size} onClick={handleClickListItem}>
          <Box width="1.5rem" height="1.5rem">
            {selectedItem ? renderButton(selectedItem) : renderEmpty()}
          </Box>
        </IconButton>
      </Tooltip>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {items.map((item) => (
          <MenuItem
            key={mapToKey(item)}
            selected={value === mapToValue(item)}
            onClick={() => handleMenuItemClick(item)}
            //disabled={false}
          >
            {renderOption(item)}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
