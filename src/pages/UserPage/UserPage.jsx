import styles from "./UserPage.module.css";
import { useNavigate } from "react-router-dom";
import UserIcon from "../UserPage/images/image.png";
import { Button, TextField, Typography } from "@mui/material";
import { API } from "../../api";
import { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import Post from "../../components/Post/Post";
import DeleteIcon from "@mui/icons-material/Delete";
import ModalCreatePost from "../../components/ModalCreatePost/ModalCreatePost";
import HeaderSecondVersion from "../../components/HeaderSecondVersion/HeaderSecondVersion";
import { toast } from "react-toastify";
import UploadIcon from "@mui/icons-material/Upload";

function UserPage() {
  const token = localStorage.getItem("token");
  const [data, setData] = useState({
    name: "",
    last_name: "",
    nickname: "",
    profile_image: "",
  });

  const [open, setOpen] = useState(false);

  const [list, setList] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      getUser();
    }
  }, []);

  const submitData = async () => {
    let formData = new FormData();
    formData.append("last_name", data.last_name);
    formData.append("name", data.name);
    formData.append("nickname", data.nickname);
    formData.append("profile_image", data.profile_image);

    const response = fetch(API.users.user, {
      method: "PUT",
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
      body: formData,
    });
    const info = await response.json();
    console.log(info);
    if (info) {
      toast.success("Изменения применены");
    }
  };

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

  const getUser = async () => {
    const response = await fetch(API.users.user, {
      method: "GET",
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    });
    const list = await response.json();
    console.log(list);
    if (list) {
      setData(list);
      getMyPosts(list.nickname);
    }
  };
  console.log(list);

  const getMyPosts = async (nickname) => {
    const response = await fetch(`${API.posts.newsList}?author=${nickname}`, {
      method: "GET",
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    });
    const list = await response.json();
    if (list) {
      setList(list);
    }
  };

  const deletePost = async (id) => {
    const response = await fetch(`${API.posts.newsList}${id}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    });
    if (response.status === 204) {
      getUser();
      toast.success("Пост был успешно удалён");
    } else {
      toast.error("Ошибка удаления поста");
    }
  };
  return (
    <>
      <div className={styles.container}>
        <ModalCreatePost open={open} setOpen={setOpen} />
        <HeaderSecondVersion />
        <section className={styles.contentMainBlock}>
          <div className={styles.contentFirstBlock}>
            {data.profile_image ? (
              <img
                src={`https://megalab.pythonanywhere.com${data.profile_image}`}
                alt="userIcon"
                className={styles.profileImage}
              />
            ) : (
              <div className={styles.avatar}>
                <img src={UserIcon} alt="UserIcon" />
              </div>
            )}
            <div className={styles.editAvatar}>
              <div className={styles.addMain}>
                <Typography
                  component="p"
                  variant="subtitle1"
                  className={styles.addDeleteBtns}
                >
                  Добавить фото
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

              <div className={styles.deleteMain}>
                <Typography
                  component="p"
                  variant="subtitle1"
                  className={styles.addDeleteBtns}
                >
                  Удалить
                </Typography>
                <DeleteIcon className={styles.trashIcon} />
              </div>
            </div>
          </div>
          <div className={styles.contentSecondBlock}>
            <div className={styles.nickEnt}>
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
            <div className={styles.nickEnt}>
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
            <div className={styles.buttonMain}>
              <Button variant="contained" size="small" onClick={submitData}>
                Сохранить
              </Button>
            </div>
          </div>
        </section>
        <section className={styles.blockCreate}>
          <Typography
            variant="h3"
            component="h3"
            className={styles.blockCreateTitle}
          >
            Мои публикации
          </Typography>
          <div className={styles.buttonMain}>
            <Button
              variant="contained"
              size="small"
              onClick={() => setOpen(true)}
            >
              Новая публикация
            </Button>
          </div>
        </section>
        <div className={styles.myPosts}>
          {list.length > 0 ? (
            list.map((item) => (
              <Post
                image={item.image}
                key={item.id}
                text={item.text}
                title={item.title}
                id={item.id}
                deletePost={deletePost}
                show="myPage"
              />
            ))
          ) : (
            <Typography variant="h2" component="h2" className={styles.noPosts}>
              У вас нет опубликованных постов!
            </Typography>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default UserPage;
