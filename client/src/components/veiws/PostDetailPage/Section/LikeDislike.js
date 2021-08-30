import React, { useEffect, useState } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-regular-svg-icons";

function LikeDislike(props) {
  const [Likes, setLikes] = useState(0);
  const [LikeAction, setLikeAction] = useState(false);
  const [Dislikes, setDislikes] = useState(0);
  const [DislikeAction, setDislikeAction] = useState(false);
  const [LoginIng, setLoginIng] = useState(false);

  let variable = {};
  if (props.post) {
    variable = { postId: props.postId };
  } else {
    variable = { commentId: props.commentId };
  }

  useEffect(() => {
    axios.post("/api/post/like/getLikes", variable).then((res) => {
      // 몇 개의 좋아요를 받앗는지
      //console.log("res.data:", res.data);
      if (res.data.success) {
        setLikes(res.data.likes.length);
        // 내가 좋아요를 눌렀는지
        if (res.data.logining) {
          // 로그인 되었다면
          setLoginIng(res.data.logining);
          res.data.likes.map((like) => {
            if (like.userId === res.data.userId) {
              setLikeAction(true);
            } else {
              setLikeAction(false);
            }
          });
        }
      } else if (res.data.result) {
        setLikeAction(false);
        setLikes(0);
      }
    });
    axios.post("/api/post/dislike/getDislikes", variable).then((res) => {
      // 몇 개의 싫어요를 받앗는지
      if (res.data.success) {
        setDislikes(res.data.dislikes.length);
        // 내가 싫어요를 눌렀는지
        if (res.data.logining) {
          // 로그인 되었다면
          setLoginIng(res.data.logining);
          res.data.dislikes.map((dislike) => {
            if (dislike.userId === res.data.userId) {
              setDislikeAction(true);
            } else {
              setDislikeAction(false);
            }
          });
        }
      } else if (res.data.result) {
        setDislikeAction(false);
        setDislikes(0);
      }
    });
  }, [props.postId, props.commentId]);
  //console.log("LikeAction :", LikeAction);

  const onLike = () => {
    if (LoginIng) {
      if (!LikeAction) {
        // Like가 클릭이 되어 않았을 때
        axios.post("/api/post/like/upLike", variable).then((res) => {
          if (res.data.success) {
            // 좋아요를 올려준다.
            setLikes(Likes + 1);
            setLikeAction(true);
            if (DislikeAction) {
              // 싫어요가 눌려있었다면 내려준다.
              setDislikes(Dislikes - 1);
              setDislikeAction(false);
            }
          } else {
            alert("좋아요를 올리지 못했습니다.");
          }
        });
      } else {
        // Like가 클릭이 되어 있을 때
        axios.post("/api/post/like/unLike", variable).then((res) => {
          // 좋아요를 내려준다.
          if (res.data.success) {
            setLikes(Likes - 1);
            setLikeAction(false);
          }
        });
      }
    } else {
      alert("로그인이 필요합니다.");
      props.history.push("/login");
    }
  };
  const onDisLike = () => {
    if (LoginIng) {
      if (!DislikeAction) {
        // Dislike가 클릭이 되어 않았을 때
        axios.post("/api/post/dislike/upDislike", variable).then((res) => {
          if (res.data.success) {
            // 싫어요를 올려준다.
            setDislikes(Dislikes + 1);
            setDislikeAction(true);
            if (LikeAction) {
              // 좋아요가 눌려있었다면 내려준다.
              setLikes(Likes - 1);
              setLikeAction(false);
            }
          } else {
            alert("싫어요를 올리지 못했습니다.");
          }
        });
      } else {
        // Dislike가 클릭이 되어 있을 때
        axios.post("/api/post/dislike/unDislike", variable).then((res) => {
          // 싫어요를 내려준다.
          if (res.data.success) {
            setDislikes(Dislikes - 1);
            setDislikeAction(false);
          }
        });
      }
    } else {
      alert("로그인이 필요합니다.");
      props.history.push("/login");
    }
  };

  const LikeIcon = () => {
    if (props.post) {
      if (!LikeAction) {
        // 좋아요를 누르지 않았다면
        return (
          <div className="m-4" style={{ cursor: "pointer" }} onClick={onLike}>
            좋아요 {Likes} <FontAwesomeIcon icon={faThumbsUp} />
          </div>
        );
      } else {
        // 좋아요를 눌렀다면
        return (
          <div
            className="m-4"
            onClick={onLike}
            style={{ color: "blue", cursor: "pointer" }}
          >
            좋아요 {Likes} <FontAwesomeIcon icon={faThumbsUp} />
          </div>
        );
      }
    } else {
      if (!LikeAction) {
        // 좋아요를 누르지 않았다면
        return (
          <div
            onClick={onLike}
            style={{ paddingLeft: "10px", cursor: "pointer" }}
          >
            {Likes} <FontAwesomeIcon icon={faThumbsUp} />
          </div>
        );
      } else {
        // 좋아요를 눌렀다면
        return (
          <div
            onClick={onLike}
            style={{ color: "blue", paddingLeft: "10px", cursor: "pointer" }}
          >
            {Likes} <FontAwesomeIcon icon={faThumbsUp} />
          </div>
        );
      }
    }
  };
  const DislikeIcon = () => {
    if (props.post) {
      if (!DislikeAction) {
        // 싫어요를 누르지 않앗다면
        return (
          <div
            className="m-4"
            style={{ cursor: "pointer" }}
            onClick={onDisLike}
          >
            싫어요 {Dislikes} <FontAwesomeIcon icon={faThumbsDown} />
          </div>
        );
      } else {
        //싫어요를 눌렀다면
        return (
          <div
            className="m-4"
            onClick={onDisLike}
            style={{ color: "blue", cursor: "pointer" }}
          >
            싫어요 {Dislikes} <FontAwesomeIcon icon={faThumbsDown} />
          </div>
        );
      }
    } else {
      if (!DislikeAction) {
        // 싫어요를 누르지 않앗다면
        return (
          <div
            onClick={onDisLike}
            style={{ paddingLeft: "10px", cursor: "pointer" }}
          >
            {Dislikes} <FontAwesomeIcon icon={faThumbsDown} />
          </div>
        );
      } else {
        //싫어요를 눌렀다면
        return (
          <div
            onClick={onDisLike}
            style={{ color: "blue", paddingLeft: "10px", cursor: "pointer" }}
          >
            {Dislikes} <FontAwesomeIcon icon={faThumbsDown} />
          </div>
        );
      }
    }
  };

  const LikeDislikeIcon = () => {
    if (props.post) {
      return (
        <div className="d-flex justify-content-center">
          {LikeIcon()}
          {DislikeIcon()}
          <br />
        </div>
      );
    } else {
      return (
        <div className="d-flex">
          {LikeIcon()}
          {DislikeIcon()}
        </div>
      );
    }
  };

  return <div>{LikeDislikeIcon()}</div>;
}

export default withRouter(LikeDislike);
