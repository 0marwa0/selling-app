import React, { useEffect } from "react";
import { AiTwotoneHeart, AiFillWechat, AiOutlineGlobal } from "react-icons/ai";
import "../App.css";
import { FiPhoneCall } from "react-icons/fi";
import { FaUser, FaCommentDots } from "react-icons/fa";
import "./post.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { ImLocation2 } from "react-icons/im";
import Card from "./card";
import axios from "axios";

function Post(props) {
  const getUserNmae = (id) => {
    let name = "";
    props.users.filter((i) => i.id === id).map((i) => (name = i.user_name));
    return name;
  };
  const getUserImage = (id) => {
    let image = "";
    props.users.filter((i) => i.id === id).map((i) => (image = i.image));
    return image;
  };
  const uesrInfo = (id) => {
    let data = props.users.filter((i) => i.id === id);
    console.log(data, "user should send");
    return data;
  };
  return (
    <div>
      {props.item.map((item, i) => (
        <div className="post_wrapper">
          <div className="span">
            <LazyLoadImage
              className="profile_img"
              src={getUserImage(item.uid)}
            />
            <div>
              <p>{getUserNmae(item.uid)}</p>
              <p className="post_info">
                <AiOutlineGlobal color="gray" size="15" />
                posted at {item.createDate.slice(0, 10)}
              </p>{" "}
            </div>{" "}
            <p>
              {item.address}

              <ImLocation2 size="15" color="rgb(57, 192, 192)" />
            </p>
          </div>
          <div className="cards">
            <Card
              src={item.images.split(",")[0]}
              item={item}
              id="0"
              user={uesrInfo(item.uid)}
            />
            <Card
              src={item.images.split(",")[2]}
              item={item}
              id="2"
              user={uesrInfo(item.uid)}
            />
            <Card
              src={item.images.split(",")[3]}
              item={item}
              id="3"
              user={uesrInfo(item.uid)}
            />
          </div>
          <div className="post_footer">
            <AiTwotoneHeart className="postIcon" size="22" color="gray" />
            <AiFillWechat className="postIcon" size="22" />
            <FiPhoneCall className="postIcon" size="20" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Post;
