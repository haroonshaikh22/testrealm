import { View, Text } from "react-native";
import React, { useState } from "react";
import axios from "axios";
import { useRealm } from "@realm/react";
import { Customer } from "../models/Customer";

const BaseUrl = `https://cgv2.creativegalileo.com/api/V1/customer/`;
const useCustomerDataViewModel = () => {
  const realm = useRealm();
  const [custData, setCustData] = useState([]);
  const [newPage, setNewPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [sortList, setSortList] = useState(0);
  const [filterType, setFilterType] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);

  const onfetchDataHandler = async ({ page, search, sort, filter }) => {
    setIsLoading(true);
    const url = `https://cgv2.creativegalileo.com/api/V1/customer/filter?paginated=true&pageNo=${page}&pageSize=10`;

    const options = {
      method: "get",
      url: url,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzNDAwOGQzNS01OTlhLTQ4YzAtYWQ2My03NmY4N2UyZGIwYzMiLCJlbnRpdHlUeXBlIjoidXNlciIsInYiOiIwLjEiLCJpYXQiOjE3MDE3OTk1NzgsImV4cCI6MTczMzM1NzE3OH0.aolRFer6LQ9JboZT7pDqb3Eq2SGOcUwGRRTzG2mfPJ4`,
      },
    };

    try {
      const response = await axios.request(options);

      realm.write(() => {
        response?.data?.data?.customers.forEach((customer) => {
          realm.create("Customer", {
            cgId: customer.cgId || "",
            id: customer.id || "",
            name: customer.name || "Unknown",
            mobile: customer.mobile || "",
            email: customer.email || "",
            dailCode: customer.dailCode || "",
            createAt: customer.createdAt || new Date(),
            recordStatus: customer.recordStatus || "active",
          });
        });
      });
      setIsLoading(false);
      setCustData(response?.data?.data?.customers);

      console.log("========response============================");
      console.log(response?.data?.data?.customers);
      console.log("====================================");
      return response;
    } catch (err) {
      console.log("=======error=============================");
      console.log(err);
      console.log("====================================");
    }
  };

  const loadMorehandler = () => {
    let lastCount = newPage + 10;
    setNewPage(lastCount);

    onfetchDataHandler({
      page: lastCount,
      search: searchText,
      sort: "",
      filter: "",
    });
  };

  return { onfetchDataHandler, custData, isLoading, loadMorehandler };
};

export default useCustomerDataViewModel;
