import type { I18nLocale } from "@org/app-vite-react/lib/i18next";

import { Translate } from "@mui/icons-material";
import { Box, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import { I18N_LANGUAGE_LIST, useTranslation } from "@org/app-vite-react/lib/i18next";
import { useMemo, useState } from "react";

import { Flag } from "../../components/Flag/Flag";

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
  const items = I18N_LANGUAGE_LIST;
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const handleClickListItem = (event: React.MouseEvent<HTMLButtonElement>) => {
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
    [items, value],
  );

  return (
    <>
      <Tooltip title={t("systemLanguage")} data-driver="systemLanguage">
        <IconButton size="medium" onClick={handleClickListItem}>
          <Box width="1.5rem" height="1.5rem">
            {/*selectedItem ? <Typography>{selectedItem.toUpperCase()}</Typography> : <Translate />*/}
            {selectedItem ? <Flag locale={selectedItem} /> : <Translate />}
          </Box>
        </IconButton>
      </Tooltip>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {items.map(item => {
          return (
            <MenuItem
              key={item}
              selected={value === item}
              onClick={() => handleMenuItemClick(item)}
            >
              <Flag locale={item} />
              <Box component="span" ml={1.5}>
                {getLocaleNativeName(item)}
              </Box>
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
}
