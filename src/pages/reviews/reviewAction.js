import { getReview } from "../../helper/axiosHelper";
import { setReviews } from "./reviewSlice";

export const getReviewAction = () => async (dispatch) => {
  const data = await getReview();
  const { status, reviews } = data;

  status === "success" && dispatch(setReviews(reviews));
};
