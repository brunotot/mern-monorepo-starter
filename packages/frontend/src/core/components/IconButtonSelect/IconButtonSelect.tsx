import { Box, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import { useMemo, useState } from "react";

export type IconButtonSelectProps<Item = unknown, Value = Item> = {
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

export function IconButtonSelect<const Item = unknown, const Value = Item>({
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
}: IconButtonSelectProps<Item, Value>) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClickListItem = (event: any) => {
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

/*export function IconButtonSelect({}: IconButtonSelectProps) {
  const { themeConfig, setThemeConfig } = useThemeContext();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (event: any) => {
    const selection = event.target.value;
    setThemeConfig({ colorSchemaName: selection });
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (event: any, index: number) => {};

  return (
    <Box>
      <Tooltip title={"Neki tooltip"}>
        <IconButton ref={anchorEl} onClick={handleClick}>
          <DarkMode />
        </IconButton>
  </Tooltip>

      <Select<ColorSchemaName>
        inputProps={{
          sx: { paddingRight: "1rem !important" },
          IconComponent: () => null,import { List } from '@mui/material/List';
import { ListItemButton } from '@mui/material/ListItemButton';

        }}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={themeConfig.colorSchemaName}
        renderValue={(value) => <>HR</>}
        //label={t("appTheme")}
        onChange={handleChange}
      >
        <MenuItem value={"AquaDarkColorSchema"}>
          AquaDarkColorSchema
          <ThemeColorItem schema={ColorSchemaData.AquaDarkColorSchema} />
        </MenuItem>
        <MenuItem value={"DeepPurpleColorSchema"}>
          DeepPurpleColorSchema
          <ThemeColorItem schema={ColorSchemaData.DeepPurpleColorSchema} />
        </MenuItem>
        <MenuItem value={"OrientColorSchema"}>
          OrientColorSchema
          <ThemeColorItem schema={ColorSchemaData.OrientColorSchema} />
        </MenuItem>
        <MenuItem value={"PureLightColorSchema"}>
          PureLightColorSchema
          <ThemeColorItem schema={ColorSchemaData.PureLightColorSchema} />
        </MenuItem>
      </Select>
    </Box>
  );
}*/
