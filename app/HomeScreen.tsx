import React, { useEffect } from "react";

import { useQuery } from "@realm/react";
import CustomerListScreen from "./components/customer/CustomerListScreen";
import useCustomerDataViewModel from "./viewModel/CustomerViewModel";
import { Customer } from "./models/Customer";

export const HomeScreen = () => {
  const [showDone, setShowDone] = React.useState(false);

  const { onfetchDataHandler, custData, loadMorehandler } =
    useCustomerDataViewModel();

  // const customerListData = useQuery(
  //   Customer,
  //   (list) =>
  //     showDone
  //       ? list.sorted("createdAt")
  //       : list.filtered("isComplete == false").sorted("createdAt"),
  //   [showDone]
  // );

  useEffect(() => {
    onfetchDataHandler({ filter: 0, page: 1, search: "", sort: 0 });
  }, []);

  return <CustomerListScreen onLoadMore={loadMorehandler} />;
};
