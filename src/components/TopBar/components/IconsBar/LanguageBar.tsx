import { FC, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import clsx from "clsx";

import ConfigStore from "storage/singletons/Config";
import TranslateStore from "storage/singletons/Translate";
import i18n from "services/Translation";

import { World } from "components/Icons";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import useStyles from "./styles";

const LanguageBar: FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const classes = useStyles();
  const { changeLanguage, language } = TranslateStore;

  const { config } = ConfigStore;

  const [lang, setLang] = useState<string>("");

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeLanguageHandler = (value: string) => {
    i18n.changeLanguage(value);
    setLang(value);
    handleClose();
  };

  useEffect(() => {
    changeLanguage(lang);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang, language]);

  const handleMenu = (event: any) => {
    return setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <World onClick={handleMenu} className={classes.icons} />
      <Menu
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className={classes.languageDropDown}
        anchorEl={anchorEl}
      >
        {config?.languages.map((el: any) => {
          return (
            <MenuItem
              className={clsx(classes.languageBarWrapper, {
                [classes.languageBarItemAction]:
                  el === localStorage.getItem("i18nextLng"),
              })}
              key={el}
              onClick={() => changeLanguageHandler(el)}
            >
              {el}
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};

export default observer(LanguageBar);
