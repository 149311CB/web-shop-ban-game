import { Box, Rating, Typography } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../App";
import CreateOrUpdateReview from "./review/CreateOrUpdateReview";
import ReviewClassifies from "./review/reviewClassifies";
import UserReview from "./review/UserReview";

export const ratingClasify = (reviews: any[]) => {
  const clasify = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  const keys = Object.keys(clasify);
  reviews.forEach((review: any) => {
    const index: string = review.rating.toString();
    if (keys.includes(index)) {
      // @ts-ignore
      clasify[index] = clasify[index] + 1;
    }
  });
  return clasify;
};

export const ratingTotal = (clasify: any) => {
  let total = 0;
  total = total + clasify["5"] * 5;
  total = total + clasify["4"] * 4;
  total = total + clasify["3"] * 3;
  total = total + clasify["2"] * 2;
  total = total + clasify["1"] * 1;
  return total;
};

export const style: any = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  color: "text.primary",
  // border: "2px solid #000",
  boxShadow: 24,
  borderRadius: "0.3rem",
  maxHeight: "90%",
  overflowY: "scroll",
};

export const verifyReviewPermission = async (
  gameId: string,
  loginToken: string
) => {
  const { data } = await axios.get(
    `https://web-shop-ban-game.herokuapp.com/api/reviews/auth/verify?gameId=${gameId}`,
    {
      headers: {
        Authorization: `Bearer ${loginToken}`,
      },
    }
  );
  return data;
};

export interface ISnackbarMess {
  isShown: boolean;
  type: "success" | "error";
  message: string | null;
}

const Review: React.FC<{ gameId: string }> = ({ gameId }) => {
  const [ratingSummary, setRatingSummary] = useState<any>(null);
  const [authorized, setAuthorized] = useState(false);
  const [reviews, setReviews] = useState<any>(null);
  const [userReview, setUserReview] = useState<any>(null);
  const [rating, setRating] = useState(0);
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const [images, setImages] = useState([]);
  const [comment, setComment] = useState<string>("");
  const [snackBarMess, setSnackBarMess] = useState<ISnackbarMess>({
    isShown: false,
    type: "success",
    message: null,
  });

  const [open, setOpen] = useState(authorized);
  const { loginToken } = useContext(GlobalContext);

  // If user already submit review, update it, otherwise create and close modal
  const submitReview = async () => {
    try {
      const route = userReview
        ? "https://web-shop-ban-game.herokuapp.com/api/reviews/auth/update"
        : "https://web-shop-ban-game.herokuapp.com/api/reviews/auth/create";
      const { data } = await axios.post(
        route,
        { gameId, rating, comment, images },
        {
          params: { commentId: userReview && userReview._id },
          headers: {
            Authorization: `Bearer ${loginToken}`,
          },
        }
      );
      setUserReview(data);

      if (data) {
        if (data._id) {
          setAuthorized(true);
          setSnackBarMess((current: ISnackbarMess) => {
            return {
              ...current,
              isShown: true,
              message: "Thank you for you feedback",
            };
          });
          if (!reviews) {
            setOpen(false);
          }
        } else {
          setSnackBarMess({
            type: "error",
            isShown: true,
            message: "Uh oh! Something has went wrong!",
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`https://web-shop-ban-game.herokuapp.com/api/reviews/all?gameId=${gameId}`);

      setReviews(data);
      const sum = ratingClasify(data);
      setRatingSummary(sum);
    };
    fetchData();
  }, [gameId, snackBarMess, userReview]);

  // check if user already review this product, otherwise check if user bought it
  useEffect(() => {
    if (!loginToken) return;
    const getReviewByUser = async () => {
      const { data } = await axios.get(
        `https://web-shop-ban-game.herokuapp.com/api/reviews/auth/get?gameId=${gameId}`,
        { headers: { Authorization: `Bearer ${loginToken}` } }
      );
      if (data) {
        setUserReview(data);
        setRating(data.rating);
        setComment(data.comment);
        setAuthorized(true);
      } else {
        verifyReviewPermission(gameId, loginToken).then((data: any) => {
          if (data.message === "authorized") {
            setAuthorized(true);
          }
        });
      }
    };
    getReviewByUser();
  }, [gameId, loginToken]);

  return (
    <Box id={"review"}>
      <Typography variant={"h1"} sx={{ p: "2.4rem 0 1.2rem 0" }}>
        Reviews
      </Typography>
      <Box
        className={"review-container"}
        sx={{
          bgcolor: "common.black",
          borderRadius: "0.3rem",
          p: 1,
          display: "flex",
          flexDirection: {
            xs: "column",
            lg: "row",
          },
          gap: "1.5rem",
        }}
      >
        <Box
          className={"review-sumary"}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "0.9rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "0.3rem",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <Typography sx={{ pt: "4px" }}>
                {ratingSummary
                  ? isNaN(ratingSummary / reviews.length)
                    ? 0
                    : (ratingTotal(ratingSummary) / reviews.length).toFixed(1)
                  : 0}
                /5
              </Typography>
              <Rating
                value={
                  ratingSummary
                    ? ratingTotal(ratingSummary) / reviews.length
                    : 0
                }
                sx={{ color: "#308fe8" }}
                readOnly
              />
            </Box>
            <Typography sx={{ pt: "3px", color: "#308fe8" }}>
              ({reviews && reviews.length})
            </Typography>
          </Box>
          <ReviewClassifies
            reviewsLength={reviews && reviews.length}
            ratingSummary={ratingSummary && ratingSummary}
          />
          {authorized && (
            <>
              <CreateOrUpdateReview
                option={!userReview ? "create" : "edit"}
                open={open}
                setOpen={setOpen}
                rating={rating}
                setRating={setRating}
                comment={comment}
                setComment={setComment}
                submitReview={submitReview}
                snackBarMess={snackBarMess}
                setSnackBarMess={setSnackBarMess}
              />
            </>
          )}
        </Box>
        <Box
          className={"review-details"}
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            gap: "0.6rem",
          }}
        >
          {reviews &&
            reviews.map((review: any) => (
              <UserReview review={review} key={review._id} />
            ))}
        </Box>
      </Box>
    </Box>
  );
};

export default React.memo(Review);
