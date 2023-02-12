import styles from "./HeaderSecondVersion.module.css";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { Link, useNavigate } from "react-router-dom";
import FavoriteIconMenu from "../FavoriteIconMenu/FavoriteIconMenu";
import { ReactComponent as Logo } from "./images/logov2.svg";

function HeaderSecondVersion() {
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.container}>
        <header>
          <div className={styles.logoBlock}>
            <Link to="/newsPage">
              <Logo className={styles.logo}/>
            </Link>
          </div>
          <div className={styles.headerRightContent}>
            <SearchIcon className={styles.searchIcon} color="primary" />
            <AccountCircleRoundedIcon
              className={styles.accountCircleRoundedIcon}
              color="primary"
              onClick={() => navigate("/userPage")}
            />
            <FavoriteIconMenu color="#7e5bc2"/>
          </div>
        </header>
      </div>
    </>
  );
}

export default HeaderSecondVersion;
