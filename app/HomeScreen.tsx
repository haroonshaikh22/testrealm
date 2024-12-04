import React, { useEffect } from "react";

import { Task } from "./models/Task";
import { TaskManager } from "./components/TaskManager";

import { useQuery } from "@realm/react";
import CustomerListScreen from "./components/customer/CustomerListScreen";
import useCustomerDataViewModel from "./viewModel/CustomerViewModel";

export const HomeScreen = () => {
  const [showDone, setShowDone] = React.useState(false);

  const { onfetchDataHandler, custData } = useCustomerDataViewModel();

  const customerListData = useQuery(
    Task,
    (list) =>
      showDone
        ? list.sorted("createdAt")
        : list.filtered("isComplete == false").sorted("createdAt"),
    [showDone]
  );

  const tasks = useQuery(
    Task,
    (collection) =>
      showDone
        ? collection.sorted("createdAt")
        : collection.filtered("isComplete == false").sorted("createdAt"),
    [showDone]
  );

  useEffect(() => {
    onfetchDataHandler({ filter: 0, page: 1, search: "", sort: 0 });
  }, []);

  return (
    <CustomerListScreen />
    // <TaskManager tasks={tasks} setShowDone={setShowDone} showDone={showDone} />
  );
};
