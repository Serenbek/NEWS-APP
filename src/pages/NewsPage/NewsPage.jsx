import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./NewsPage.module.css";
import { CircularProgress } from "@mui/material";
import { API } from "../../api";
import Post from "../../components/Post/Post";
import Filter from "../../components/Filter/Filter";
import TuneIcon from "@mui/icons-material/Tune";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { getNewsListFunction, getTagsListFunction } from "../../Redux/newsSlice";

function NewsPage() {
  const token = useSelector((state) => state.token.token);
  // console.log(token);
  const newsList = useSelector((state) => state.news.newsList);
  const tags = useSelector((state) => state.news.tagsList);
  // console.log(newsList);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      dispatch(getNewsListFunction({token}))
      dispatch(getTagsListFunction({token}));
    }
  }, []);

  const putLike = async (id) => {
    const response = await fetch(API.posts.likeList, {
      method: "POST",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ post: id }),
    });
    const info = await response.json();
    // console.log(info);
    if (info) {
      toast.success("Добавлено в избранные");
    } else {
      toast.error("Неудалось добавить в избранные");
    }
  };

  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + 5;
  const currentItems = newsList.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(newsList.length / 5);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * 5) % newsList.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      <div className={styles.main}>
        <Header />
        <div className={styles.container}>
          <div className={styles.mainFilter}>
            <Filter tags={tags} className={styles.filter} />
          </div>
          <div className={styles.mainTuneIcon}>
            <TuneIcon sx={{ display: "none" }} className={styles.tuneIcon} />
          </div>

          <div className={styles.mainNewsContent}>
            {currentItems.length > 0 ? (
              <div className={styles.post}>
                {currentItems.map((item) => (
                  <Post
                    image={item.image}
                    key={item.id}
                    text={item.text}
                    title={item.title}
                    id={item.id}
                    isLiked={item.is_liked}
                    putLike={putLike}
                  />
                ))}
                <div className={styles.containerPaginate}>
                  <div id={styles.paginationMax}>
                    <ReactPaginate
                      nextLabel="next >"
                      onPageChange={handlePageClick}
                      pageRangeDisplayed={3}
                      marginPagesDisplayed={2}
                      pageCount={pageCount}
                      previousLabel="< previous"
                      pageClassName="page-item"
                      pageLinkClassName="page-link"
                      previousClassName="page-item"
                      previousLinkClassName="page-link"
                      nextClassName="page-item"
                      nextLinkClassName="page-link"
                      breakLabel="..."
                      breakClassName="page-item"
                      breakLinkClassName="page-link"
                      containerClassName="pagination"
                      activeClassName="active"
                      renderOnZeroPageCount={null}
                    />
                  </div>
                  <div id={styles.paginationMin}>
                    <ReactPaginate
                      nextLabel="next>"
                      onPageChange={handlePageClick}
                      pageRangeDisplayed={0}
                      marginPagesDisplayed={0}
                      pageCount={pageCount}
                      previousLabel="<prev"
                      pageClassName="page-item"
                      pageLinkClassName="page-link"
                      previousClassName="page-item"
                      previousLinkClassName="page-link"
                      nextClassName="page-item"
                      nextLinkClassName="page-link"
                      breakLabel="..."
                      breakClassName="page-item"
                      breakLinkClassName="page-link"
                      containerClassName="pagination"
                      activeClassName="active"
                      renderOnZeroPageCount={null}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className={styles.circularBlock}>
                <CircularProgress className={styles.circularProgress} />
              </div>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default NewsPage;
