import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../api";
import Footer from "../../components/Footer/Footer";
import HeaderSecondVersion from "../../components/HeaderSecondVersion/HeaderSecondVersion";
import Post from "../../components/Post/Post";
import styles from "./FavoriteNews.module.css";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getMyLikeListFunction } from "../../Redux/newsSlice";

function FavoriteNews() {
  // const token = localStorage.getItem("token");
  const token = useSelector((state) => state.token.token);
  // const [likeList, setLikeList] = useState([]);
  const likeList = useSelector((state) => state.news.likeList);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      // getMyLikeList();
      dispatch(getMyLikeListFunction({ token }));
    }
  }, []);
  // const getMyLikeList = async () => {
  //   const response = await fetch(API.posts.likeList, {
  //     method: "GET",
  //     headers: {
  //       Authorization: `Token ${localStorage.getItem("token")}`,
  //     },
  //   });
  //   const list = await response.json();
  //   if (list) {
  //     setLikeList(list);
  //   }
  // };
  const putLike = async (id) => {
    const response = await fetch(API.posts.likeList, {
      method: "POST",
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ post: id }),
    });
    const info = await response.json();
    console.log(info);
    if (info) {
      // getMyLikeList();
      dispatch(getMyLikeListFunction({ token }));
      toast.success("Удалено из избранных");
    } else {
      toast.error("Неудалось удалить из избранных");
    }
  };
  return (
    <>
      <div className={styles.container}>
        <HeaderSecondVersion />
        <div className={styles.favoriteTitleMain}>
          <Typography
            variant="h3"
            component="h3"
            className={styles.favoriteTitle}
          >
            Избранные новости
          </Typography>
        </div>
        <div className={styles.myPosts}>
          {likeList.length > 0 ? (
            likeList.map((item) => (
              <Post
                image={item.image}
                key={item.id}
                text={item.text}
                title={item.title}
                id={item.id}
                isLiked={item.is_liked}
                putLike={putLike}
                show="myFavorite"
              />
            ))
          ) : (
            <Typography variant="h2" component="h2" className={styles.noPosts}>
              У вас нет избранных постов!
            </Typography>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default FavoriteNews;
