import styles from "./Registration.module.css";
import { Button, FormControl, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import { API } from "../../api";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { ReactComponent as Logo } from "./images/logov2.svg";
import { toast } from "react-toastify";
import UploadIcon from "@mui/icons-material/Upload";

function Registration() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowPassword2 = () => setShowPassword2((show) => !show);

  const [data, setData] = useState({
    nickname: "",
    name: "",
    last_name: "",
    profile_image: "",
    password: "",
    password2: "",
  });

  const onChangeInfo = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const changeFile = (e) => {
    setData({
      ...data,
      profile_image: e.target.files[0],
    });
  };
  console.log(data);
  const submitData = async (e) => {
    let formData = new FormData();
    formData.append("last_name", data.last_name);
    formData.append("name", data.name);
    formData.append("nickname", data.nickname);
    formData.append("password", data.password);
    formData.append("password2", data.password2);
    formData.append("profile_image", data.profile_image);

    const response = fetch(API.users.registration, {
      method: "POST",
      body: formData,
    });
    const info = await response.json();
    console.log(info);
    if (info) {
      toast.success("Пользователь успешно создан");
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.forCentr}>
          <Link to="/newsPage">
            <Logo className={styles.logo} />
          </Link>
        </div>
        <div className={styles.avatar}>
          <Typography variant="subtitle1" component="p">
            Выберите аватар
          </Typography>
          <label for="outlined-basic">
            <UploadIcon
              color="primary"
              className={styles.chooseFailIcon}
              fontSize="medium"
            />
          </label>
          <TextField
            className={styles.chooseFail}
            id="outlined-basic"
            variant="outlined"
            size="small"
            type="file"
            onChange={changeFile}
          />
        </div>
        <div className={styles.lastNameEnt}>
          <Typography variant="subtitle1" component="p">
            Фамилия
          </Typography>
          <TextField
            id="outlined-basic"
            variant="outlined"
            size="small"
            name="last_name"
            value={data.last_name}
            onChange={onChangeInfo}
          />
        </div>
        <div className={styles.firNameEnt}>
          <Typography variant="subtitle1" component="p">
            Имя
          </Typography>
          <TextField
            id="outlined-basic"
            variant="outlined"
            size="small"
            name="name"
            value={data.name}
            onChange={onChangeInfo}
          />
        </div>
        <div className={styles.nickEnt}>
          <Typography variant="subtitle1" component="p">
            Никнейм
          </Typography>
          <TextField
            id="outlined-basic"
            variant="outlined"
            size="small"
            name="nickname"
            value={data.nickname}
            onChange={onChangeInfo}
          />
        </div>
        <div className={styles.passEnt}>
          <Typography variant="subtitle1" component="p">
            Пароль
          </Typography>
          <div className={styles.pass1}>
            <FormControl>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                size="small"
                name="password"
                value={data.password}
                onChange={onChangeInfo}
                className={styles.passworInput}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />

              {/* <TextField
                id="outlined-passwordEnt2"
                type="password"
                autoComplete="current-password"
                size="small"
                name="password"
                value={data.password}
                onChange={onChangeInfo}
              /> */}
            </FormControl>
            <div className={styles.limitSim}>
              <Typography variant="subtitle1" component="p">
                Лимит на символы
              </Typography>
            </div>
          </div>
        </div>
        <div className={styles.passEnt2}>
          <Typography variant="subtitle1" component="p">
            Подтверждение пароля
          </Typography>
          <FormControl>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword2 ? "text" : "password"}
              size="small"
              name="password2"
              value={data.password2}
              onChange={onChangeInfo}
              className={styles.passworInput2}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword2}
                    edge="end"
                  >
                    {showPassword2 ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />

            {/* <TextField
              id="outlined-passwordEnt3"
              type="password"
              autoComplete="current-password"
              size="small"
              name="password2"
              value={data.password2}
              onChange={onChangeInfo}
            /> */}
          </FormControl>
        </div>
        <div className={styles.forCentr}>
          <Button variant="contained" size="small" onClick={submitData}>
            Регистрация
          </Button>
        </div>
        <Typography
          className={styles.noAccLabel}
          variant="subtitle1"
          component="p"
        >
          Уже есть логин?
          <Link className={styles.regLink} to="/">
            Войти
          </Link>
        </Typography>
      </div>
    </>
  );
}

export default Registration;
