import styles from "./Header.module.css";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import FavoriteIconMenu from "../FavoriteIconMenu/FavoriteIconMenu";
import { ReactComponent as Logo } from "./images/logov3.svg";

function Header() {
  const navigate = useNavigate();
  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.logoBlock}>
            <Link to="/newsPage">
              <Logo className={styles.logo}/>
            </Link>
          </div>
          <div className={styles.headerRightContent}>
            <SearchIcon className={styles.searchIcon} />
            <AccountCircleRoundedIcon
              className={styles.accountCircleRoundedIcon}
              onClick={() => navigate("/userPage")}
            />
            <FavoriteIconMenu color="#fff"/>
          </div>
        </div>
        <Typography className={styles.headerTitle} variant="h1" component="h1">
          Новости
        </Typography>
      </header>
    </>
  );
}

export default Header;
