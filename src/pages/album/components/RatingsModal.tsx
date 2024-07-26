import { useDispatch, useSelector } from "react-redux";
import { StarFilled } from "@ant-design/icons";
import { setShowRatingsModal } from "../slice";
import { Loading, Modal, Message } from "../../../components";
import { Link } from "react-router-dom";
import defaultProfilePicture from "../../../assets/default-profile-picture.png";
import styles from "../styles.module.css";
import React from "react";
import Album from "../../../types/album";
import { AppDispatch, RootState } from "../../../store";

type Props = {
  show: boolean;
  onClose: () => void;
  album: Album;
};

const RatingsModal: React.FC<Props> = ({ show, onClose, album }) => {
  const { ratingsPending, ratingsFulfilled, ratings, ratingsRejected, ratingsErrorMessage } = useSelector((state: RootState) => state.album);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Modal
      show={show}
      title="Ratings"
      titleSuffix={`${album.ratingCount} ratings`}
      onClose={onClose}
      centerBody={
        ratingsPending ||
        ratingsRejected ||
        (ratingsFulfilled && ratings?.length === 0)
      }
    >
      {ratingsPending && <Loading size="large" />}
      {ratingsFulfilled && (
        <div>
          {ratings?.map((rating, i) => (
            <Link
              key={i}
              className={styles.modalRatingLink}
              to={`/user/${rating.username}`}
              onClick={() => dispatch(setShowRatingsModal(false))}
            >
              <div className={styles.modalRatingContainer}>
                <div className={styles.modalRatingInfo}>
                  <div className={styles.modalRatingAvatarContainer}>
                    <img
                      src={rating.avatar || defaultProfilePicture}
                      alt={`${rating.username} avatar`}
                      className={styles.modalRatingAvatar}
                    />
                  </div>
                  <div className={styles.modalRatingUsername}>
                    {rating.username}
                  </div>
                </div>
                <div className={styles.modalRatingRatingContainer}>
                  <div className={styles.modalRatingRating}>
                    {rating.rating}
                  </div>
                  <StarFilled className={styles.modalRatingStar} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
      {ratingsFulfilled && ratings?.length === 0 && !ratingsPending && (
        <Message>No rating found</Message>
      )}
      {ratingsRejected && <Message>{ratingsErrorMessage}</Message>}
    </Modal>
  );
}

export default RatingsModal;
