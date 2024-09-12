import { Translate } from "@mui/icons-material";
import { Box, IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import { LANGUAGE_LIST, useTranslation, type I18nLocale } from "@org/app-vite-react/lib/i18next";
import { TODO } from "@org/lib-commons";
import { useMemo, useState } from "react";

function getLocaleNativeName(locale: I18nLocale) {
  const name: string = new Intl.DisplayNames([locale], {
    type: "language",
  }).of(locale)!;
  return name.charAt(0).toUpperCase() + name.slice(1);
}

export type InputLocaleSelectProps = {
  value: I18nLocale;
  onChange: (value: I18nLocale) => void;
};

export function InputLocaleSelect({ value, onChange }: InputLocaleSelectProps) {
  const t = useTranslation();
  const items = LANGUAGE_LIST;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClickListItem = (event: TODO) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (item: I18nLocale) => {
    onChange(item);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const selectedItem: I18nLocale | undefined = useMemo(
    () => items.find(item => value === item),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [items, value],
  );

  return (
    <>
      <Tooltip title={t("systemLanguage")}>
        <IconButton size="medium" onClick={handleClickListItem}>
          <Box width="1.5rem" height="1.5rem">
            {selectedItem ? <Typography>{selectedItem.toUpperCase()}</Typography> : <Translate />}
          </Box>
        </IconButton>
      </Tooltip>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {items.map(item => (
          <MenuItem key={item} selected={value === item} onClick={() => handleMenuItemClick(item)}>
            {getLocaleNativeName(item)}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
