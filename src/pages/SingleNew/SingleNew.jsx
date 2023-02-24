import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { API } from "../../api";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import styles from "./SingleNew.module.css";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { Button, TextField, Typography } from "@mui/material";
import { IconButton } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import notIcon from "../../components/Post/images/notIconImage.png";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getSingleNewFunction } from "../../Redux/newsSlice";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

function SingleNew() {
  const token = useSelector((state) => state.token.token);
  const { id } = useParams();
  const singleNew = useSelector((state) => state.news.singleNew);
  const dispatch = useDispatch();
  const [commentText, setCommentText] = useState("");
  const [replyText, setReplyText] = useState({
    id: 0,
    text: "",
  });
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      dispatch(getSingleNewFunction({token, id}));
    }
  }, []);

  const postComment = async () => {
    const response = await fetch(API.comment.postComment, {
      method: "POST",
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ post: id, text: commentText }),
    });
    const info = await response.json();
    console.log(info);
    if (info) {
      setCommentText("");
      dispatch(getSingleNewFunction({token, id}));
      toast.success("Комментарий успешно создан");
    } else {
      toast.error("Неудалось создать комментарий");
    }
  };
  const sendReply = async (idParent) => {
    const response = await fetch(API.comment.postComment, {
      method: "POST",
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        post: id,
        text: replyText.text,
        parent: idParent,
      }),
    });
    const info = await response.json();
    console.log(info);
    if (info) {
      setReplyText("");
      dispatch(getSingleNewFunction({token, id}));
      toast.success("Ответ успешно добавлен");
    } else {
      toast.error("Неудалось добавить комментарий");
    }
  };
  return (
    <>
      <Header />
      <div className={styles.container}>
        <Link className={styles.regLink} to="/newsPage">
          <KeyboardBackspaceIcon />
        </Link>
        <div className={styles.CardMainContent}>
          <div className={styles.textContentTop}>
            <Typography
              variant="p"
              component="p"
              className={styles.textContentTopDate}
            >
              September 14, 2016
            </Typography>
            <Checkbox
              {...label}
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite />}
            />
          </div>
          <div className={styles.singleNewTitle}>
            <Typography
              variant="subtitle1"
              component="p"
              className={styles.title}
            >
              {singleNew.title}
            </Typography>
          </div>
          <div className={styles.singleNewshortDesc}>
            <Typography variant="p" component="p" className={styles.shortDesc}>
              {singleNew.short_desc}
            </Typography>
          </div>
          <div className={styles.cardImageBlock}>
            {singleNew.image ? (
              <img
                className={styles.cardImage}
                src={`https://megalab.pythonanywhere.com/${singleNew.image}`}
                alt=""
              />
            ) : (
              <img
                src={notIcon}
                alt="noyIconImage"
                className={styles.notIconImage}
              />
            )}
          </div>
          <>{singleNew.text}</>
          <IconButton aria-label="share" className={styles.shareIcon}>
            <ShareIcon />
          </IconButton>
        </div>
        <div className={styles.comments}>
          <Typography
            variant="h5"
            component="h5"
            className={styles.commentsTitle}
          >
            Комментарии
          </Typography>
          <div className={styles.commentsInner}>
            <>
              {singleNew.comment.length > 0
                ? singleNew.comment.map((comment) => (
                    <div className={styles.commentsBlock}>
                      <Typography
                        variant="p"
                        component="p"
                        className={styles.commentNickname}
                      >
                        {`${comment.user.name} ${comment.user.last_name}`}
                      </Typography>
                      <Typography
                        variant="p"
                        component="p"
                        className={styles.commentText}
                      >
                        {`${comment.text}`}
                      </Typography>
                      <div className={styles.replyBlock}>
                        <Typography
                          variant="p"
                          component="p"
                          className={styles.textContentTopDate}
                        >
                          September 14, 2016
                        </Typography>
                        <Button
                          className={styles.replyBtn}
                          onClick={() => setShow(true)}
                        >
                          Ответить
                        </Button>
                      </div>
                      {show ? (
                        <div className={styles.replyBlockReply}>
                          <Typography
                            variant="p"
                            component="p"
                            className={styles.commentNickname}
                          >
                            Вы
                          </Typography>
                          <TextField
                            id="outlined-basic"
                            variant="outlined"
                            size="small"
                            name="name"
                            placeholder="Напишите комментарий"
                            value={
                              replyText.id === comment.id ? replyText.text : ""
                            }
                            onChange={(e) =>
                              setReplyText({
                                text: e.target.value,
                                id: comment.id,
                              })
                            }
                          />
                          <Button
                            variant="contained"
                            className={styles.replyBtn2}
                            onClick={() => sendReply(comment.id)}
                          >
                            Ответить
                          </Button>
                          <Button
                            variant="contained"
                            className={styles.replyBtn2}
                            onClick={() => setShow(false)}
                          >
                            Отмена
                          </Button>
                        </div>
                      ) : null}

                      {comment.child.length > 0
                        ? comment.child.map((child) => (
                            <div className={styles.commentsBlockChild}>
                              <Typography
                                variant="p"
                                component="p"
                                className={styles.commentNickname}
                              >
                                {`${child.user.name} ${child.user.last_name}`}
                              </Typography>
                              <Typography
                                variant="p"
                                component="p"
                                className={styles.commentText}
                              >
                                {`${child.text}`}
                              </Typography>
                              <div className={styles.replyBlock}>
                                <Typography
                                  variant="p"
                                  component="p"
                                  className={styles.textContentTopDate}
                                >
                                  September 14, 2016
                                </Typography>
                              </div>
                            </div>
                          ))
                        : ""}
                    </div>
                  ))
                : ""}
            </>
            <div className={styles.replyBlockReplyVisible}>
              <TextField
                id="outlined-basic"
                variant="outlined"
                size="small"
                name="name"
                placeholder="Напишите комментарий"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <Button
                variant="contained"
                className={styles.replyBtn2}
                onClick={postComment}
              >
                Ответить
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SingleNew;
