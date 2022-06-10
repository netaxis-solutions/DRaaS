import { makeStyles } from "@material-ui/core";

import { ThemeDefaultOptions } from "utils/types/themeConfig";

const useAdminsStyle = makeStyles((theme: ThemeDefaultOptions) => ({
    createModal:{
        fontSize:'1.8rem',
        display:"block",
        marginBottom: theme.spacing(2)
    },
    profileTitle:{
      fontSize:'1.8rem'
    },
    root: {
        "&.MuiRadio-root:hover": {
          backgroundColor: "transparent",
        },
        "&.MuiSvgIcon-root": {
          border: `1px solid ${theme.palette.icon.active}`,
          borderRadius: "50%",
          fill: `#fff`,
        },
      },
      iconChecked: {
        borderRadius: "50%",
        fill: `${theme.palette.icon.active}`,
      },
      checkboxWrapper:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        "& span":{
          fontSize:"1.4rem",
        }
      },
      entitySelectWrapper:{
        marginTop:theme.spacing(2)
      },
      noteText:{
        fontSize:"1.4rem"
      }

}));

export default useAdminsStyle;
