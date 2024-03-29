import { getOrders } from "../../helper/axiosHelper";

import { setOrders } from "./orderSlice";

export const getOrdersAction = (_id) => async (dispatch) => {
  const { status, orders } = await getOrders(_id);

  status === "success" && orders.length && dispatch(setOrders(orders));
};
