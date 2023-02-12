import styles from "./ModalCreatePost.module.css";
import {
  Button,
  FormControl,
  TextField,
  Typography,
  MenuItem,
  Select,
} from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { API } from "../../api";
import Modal from "@mui/material/Modal";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ModalCreatePost({ open, setOpen }) {
  const [tags, setTags] = useState([]);
  const [data, setData] = useState({
    title: "",
    image: "",
    text: "",
    tag: "",
    short_desc: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    getAllTags();
  }, []);
  const getAllTags = async () => {
    const response = await fetch(API.posts.tagList, {
      method: "GET",
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    });
    const list = await response.json();
    if (list) {
      setTags(list);
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
      image: e.target.files[0],
    });
  };
  // console.log(data);
  const submitData = async () => {
    let formData = new FormData();
    formData.append("title", data.title);
    formData.append("image", data.image);
    formData.append("text", data.text);
    formData.append("tag", data.tag);
    formData.append("short_desc", data.short_desc);

    const response = fetch(API.posts.newsList, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    });
    // const info = await response.json();
    // console.log(info);
    if (response.status === 201) {
      navigate("userPage")
      toast.success("Пост успешно создан");
    } else {
      toast.error("Пост не создан");
    }
  };
  return (
    <>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={styles.container}>
          <div className={styles.newsCoverBlock}>
            <Typography variant="subtitle1" component="p">
              Обложка новости
            </Typography>
            <TextField
              className={styles.chooseFail}
              id="outlined-basic"
              variant="outlined"
              size="small"
              type="file"
              onChange={changeFile}
            />
          </div>
          <div className={styles.titleBlock}>
            <Typography variant="subtitle1" component="p">
              Заголовок
            </Typography>
            <TextField
              id="outlined-basic"
              variant="outlined"
              size="small"
              name="title"
              value={data.last_name}
              onChange={onChangeInfo}
            />
          </div>
          <div className={styles.shortDescBlock}>
            <Typography variant="subtitle1" component="p">
              Краткое описание
            </Typography>
            <TextField
              id="outlined-basic"
              variant="outlined"
              size="small"
              name="short_desc"
              value={data.name}
              onChange={onChangeInfo}
            />
          </div>
          <div className={styles.textBlock}>
            <Typography variant="subtitle1" component="p">
              Текст новости
            </Typography>
            <TextField
              id="outlined-multiline-static"
              multiline
              rows={3}
              name="text"
              className={styles.multiline}
              onChange={onChangeInfo}
              size="small"
            />
          </div>
          <div className={styles.selectBlock}>
            <Typography variant="subtitle1" component="p">
              Категория
            </Typography>
            <div className={styles.pass1}>
              <FormControl>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={data.tag}
                  size="small"
                  className={styles.select}
                  onChange={(e) => setData({ ...data, tag: e.target.value })}
                >
                  {tags.length > 0 &&
                    tags.map((tag) => (
                      <MenuItem key={tag.id} value={tag.name}>
                        {tag.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </div>
          </div>
          <div className={styles.forCentr}>
            <Button variant="contained" size="small" onClick={submitData}>
              Создать
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
export default ModalCreatePost;
