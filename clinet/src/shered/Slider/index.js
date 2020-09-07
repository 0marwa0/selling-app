import React from "react";
import "./index.css";
import { FcMoneyTransfer } from "react-icons/fc";
import { AiTwotoneHeart, AiOutlineClose } from "react-icons/ai";
import {
  FaGreaterThan,
  FaUserCircle,
  FaPhoneVolume,
  FaLessThan,
  FaCommentDots,
} from "react-icons/fa";
class index extends React.Component {
  state = {
    images: this.props.item.images.split(",").filter((item) => item !== ""),
    fadedleft: false,
    fadedright: true,
    start: 0,
    finish: 1,
    isFirstT: 0,
    likes: this.props.item.likes.slice(1, -1).split(","),
    // commentNumber: this.props.item.likes.slice(1, -1).split(","),
  };
  onLeft = () => {
    let start = this.state.start;
    let finish = this.state.finish;
    if (start != 0 && finish != 0) {
      // if (start > 1) {
      //   this.setState({
      //     fadedright: true,
      //   });
      // }
      this.setState({
        start: start - 1,
        finish: finish - 1,
        fadedright: true,
      });
    } else {
      this.setState({
        fadedright: true,
        fadedleft: false,
      });
    }
  };
  onRight = () => {
    let start = this.state.start;
    let finish = this.state.finish;
    // console.log(
    //   finish,
    //   this.state.images.length,
    //   "fade right",
    //   this.state.fadedright
    // );
    if (finish < this.state.images.length) {
      this.setState({
        start: start + 1,
        finish: finish + 1,
        fadedleft: true,
        isFirstT: 1,
      });
    } else {
      this.setState({
        fadedright: false,
        fadedleft: true,
      });
    }
    if (finish === 3) {
      this.setState({
        fadedright: false,
        fadedleft: true,
      });
    }
  };

  render() {
    // console.log(this.props.item.comments.slice(1, -1).split("?![^([] * [])]"));
    return (
      <div>
        <div className="close_icon">
          {" "}
          <AiOutlineClose onClick={this.props.onClose} />
        </div>
        <div className="slider">
          {this.state.images
            .slice(this.state.start, this.state.finish)
            .map((image, x) => (
              <span>
                <p className="left_ctrl" onClick={this.onLeft}>
                  <FaLessThan
                    className={this.state.fadedleft ? "slid_icon" : "icon_off"}
                  />
                </p>{" "}
                <img
                  src={
                    this.state.images.includes(this.props.src) &&
                    this.state.isFirstT === 0
                      ? this.props.src
                      : `${image}`
                  }
                  style={{ width: "440px", height: "300px" }}
                />
                <p className="right_ctrl" onClick={this.onRight}>
                  <FaGreaterThan
                    className={this.state.fadedright ? "slid_icon" : "icon_off"}
                  />
                </p>
                <p className="silde_num">
                  <p>{this.state.start + 1}</p>/<p>4</p>
                </p>
                <div className="silde_footer">
                  <div>
                    <span>
                      <p>provided by :</p>
                      <p>{this.props.user.map((i) => i.user_name)}</p>
                    </span>
                    <span>
                      <p>phone :</p>
                      <p>{this.props.user.map((i) => i.phone)}</p>{" "}
                    </span>
                  </div>
                  <div>
                    <span>
                      <p>
                        <FcMoneyTransfer className="money_icon" />
                      </p>
                      <p>{this.props.item.price}</p>
                    </span>
                  </div>
                  {/* <AiTwotoneHeart className="postIcon" size="22" color="red" />
                  {this.state.likes[this.props.id]}
                  <FaCommentDots
                    style={{ margin: " 0 2px" }}
                    className="postIcon"
                    color="rgb(142, 202, 202)"
                    size="20"
                  />
                  3 */}
                </div>
              </span>
            ))}
        </div>
        {/* <div className="item_info">
          <span>See previous comments</span>
          <div className="comment">
            <FaUserCircle color="teal" size="34" />
            <p>nice pic </p>
          </div>
          <div className="comment">
            <FaUserCircle color="teal" size="34" />
            <p>look good and nice</p>
          </div>
         
        </div> */}
      </div>
    );
  }
}

export default index;
