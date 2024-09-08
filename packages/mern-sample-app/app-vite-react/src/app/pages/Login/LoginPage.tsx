import * as mui from "@mui/material";
import * as icons from "@mui/icons-material";

import { Logo } from "@org/app-vite-react/components/semantics";
import { sigUser } from "@org/app-vite-react/signals/sigUser";
import { ObjectId, Role, type TODO } from "@org/lib-commons";
import type { ChangeEvent, MouseEvent } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface State {
  password: string;
  showPassword: boolean;
}

type ThemeConfig = {
  mode: mui.PaletteMode;
  templateName: string;
  routingLoader: boolean;
  disableRipple: boolean;
  navigationSize: number;
  menuTextTruncate: boolean;
  contentWidth: "full" | "boxed";
  responsiveFontSizes: boolean;
};

const themeConfig: ThemeConfig = {
  // ** Layout Configs
  templateName: "Materio" /* App Name */,
  mode: "light" /* light | dark */,
  contentWidth: "boxed" /* full | boxed */,

  // ** Routing Configs
  routingLoader: true /* true | false */,

  // ** Navigation (Menu) Configs
  menuTextTruncate: true /* true | false */,
  navigationSize: 260 /* Number in PX(Pixels) /*! Note: This is for Vertical navigation menu only */,

  // ** Other Configs
  responsiveFontSizes: true /* true | false */,
  disableRipple: false /* true | false */,
};

export function LoginPage() {
  // ** State
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [values, setValues] = useState<State>({
    password: "",
    showPassword: false,
  });

  // ** Hook
  const theme = mui.useTheme();

  const handleChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <mui.Box sx={{ display: "grid", placeItems: "center", marginBlock: 8 }}>
      <mui.Card sx={{ maxWidth: 500 }}>
        <mui.CardContent
          sx={{
            paddingBlock: 4,
            paddingInline: 6,
            [theme.breakpoints.down("md")]: { paddingInline: 4 },
            [theme.breakpoints.down("sm")]: { paddingInline: 2 },
          }}
        >
          <mui.Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Logo />
          </mui.Box>
          <mui.Box sx={{ mb: 6 }}>
            <mui.Typography variant="h5" sx={{ fontWeight: 600, marginBottom: 1.5 }}>
              Welcome to {themeConfig.templateName}! 👋🏻
            </mui.Typography>
            <mui.Typography variant="body2">
              Please sign-in to your account and start the adventure
            </mui.Typography>
          </mui.Box>
          <form noValidate autoComplete="off" onSubmit={e => e.preventDefault()}>
            <mui.TextField
              autoFocus
              fullWidth
              id="email"
              size="medium"
              label="Email"
              sx={{ marginBottom: 2 }}
            />
            <mui.FormControl fullWidth>
              <mui.InputLabel htmlFor="auth-login-password">Password</mui.InputLabel>
              <mui.OutlinedInput
                size="medium"
                label="Password"
                value={values.password}
                id="auth-login-password"
                onChange={handleChange("password")}
                type={values.showPassword ? "text" : "password"}
                endAdornment={
                  <mui.InputAdornment position="end">
                    <mui.IconButton
                      edge="end"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      aria-label="toggle password visibility"
                    >
                      {values.showPassword ? <icons.Visibility /> : <icons.VisibilityOff />}
                    </mui.IconButton>
                  </mui.InputAdornment>
                }
              />
            </mui.FormControl>
            <mui.Box
              sx={{
                mb: 4,
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              <mui.FormControlLabel control={<mui.Checkbox />} label="Remember Me" />
              <mui.Link href="/">Forgot Password?</mui.Link>
            </mui.Box>
            <mui.Button
              fullWidth
              size="large"
              variant="contained"
              sx={{ marginBottom: 7 }}
              onClick={() => {
                sigUser.value = { _id: new ObjectId(), roles: [Role.enum.USER] } as TODO;
                navigate(from, { replace: true });
              }}
            >
              Login
            </mui.Button>
            <mui.Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <mui.Typography variant="body2" sx={{ marginRight: 2 }}>
                New on our platform?
              </mui.Typography>
              <mui.Typography variant="body2">
                <mui.Link href="/pages/register">Create an account</mui.Link>
              </mui.Typography>
            </mui.Box>
            <mui.Divider sx={{ my: 5 }}>or</mui.Divider>
            <mui.Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <mui.Link href="/">
                <mui.IconButton
                  component="a"
                  onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
                >
                  <icons.Facebook sx={{ color: "#497ce2" }} />
                </mui.IconButton>
              </mui.Link>
              <mui.Link href="/">
                <mui.IconButton
                  component="a"
                  onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
                >
                  <icons.Twitter sx={{ color: "#1da1f2" }} />
                </mui.IconButton>
              </mui.Link>
              <mui.Link href="/">
                <mui.IconButton
                  component="a"
                  onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
                >
                  <icons.GitHub
                    sx={{
                      color: theme =>
                        theme.palette.mode === "light" ? "#272727" : theme.palette.grey[300],
                    }}
                  />
                </mui.IconButton>
              </mui.Link>
              <mui.Link href="/">
                <mui.IconButton
                  component="a"
                  onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
                >
                  <icons.Google sx={{ color: "#db4437" }} />
                </mui.IconButton>
              </mui.Link>
            </mui.Box>
          </form>
        </mui.CardContent>
      </mui.Card>
    </mui.Box>
  );
}
