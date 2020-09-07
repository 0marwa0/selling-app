import React from "react";
import { FaCommentDots } from "react-icons/fa";
import { AiTwotoneHeart, AiFillWechat } from "react-icons/ai";
import { Modal } from "react-responsive-modal";
import PopPop from "react-poppop";
import "reactjs-popup/dist/index.css";
import { LazyLoadImage } from "react-lazy-load-image-component";

import Slider from "./Slider/index.js";
class Card extends React.Component {
  state = {
    modalIsOpen: false,
    open: false,
  };
  isOpen = (open) => {
    this.setState({ open });
    document.body.style.overflow = "scroll";
  };
  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };
  OpenModal = () => {
    this.setState({ modalIsOpen: true });
  };
  render() {
    // console.log(this.props.src.split(",")[2], "type of ");

    const customStyles = {
      content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        borderRadius: "20px",
        transform: "translate(-50%, -50%)",
      },
    };
    return (
      <div>
        <div className="card" onClick={() => this.isOpen(true)}>
          <img src={`${this.props.src}`} />
          {/* <LazyLoadImage src={`${this.props.src}`} /> */}
          <div className="card_footer">
            <p>
              <AiTwotoneHeart
                className="postIcon"
                style={{ margin: " 0 2px" }}
                size="20"
                color="red"
              />
              {this.props.item.likes.slice(1, -1).split(",")[this.props.id]}
            </p>

            <p>
              <FaCommentDots
                style={{ margin: " 0 2px" }}
                className="postIcon"
                color="rgb(142, 202, 202)"
                size="20"
              />
              6
            </p>
          </div>
        </div>
        <PopPop
          position="centerCenter"
          open={this.state.open}
          contentStyle={{ overflow: "none", padding: "20px" }}
          closeOnOverlay={false}
          onClose={() => this.isOpen(false)}
        >
          <Slider
            item={this.props.item}
            user={this.props.user}
            src={this.props.src}
            id={this.props.id}
            onClose={() => this.isOpen(false)}
          />
        </PopPop>
      </div>
    );
  }
}

export default Card;
