import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useQuery } from "@realm/react";
import { Customer } from "../../models/Customer";
import colors from "../../styles/colors";
import useCustomerDataViewModel from "../../viewModel/CustomerViewModel";

const CustomerItem = ({ data }) => {
  const date = new Date();

  return (
    <View
      style={{
        backgroundColor: "#8954F6",
        width: "100%",
        marginVertical: 5,
        padding: "3%",
        borderRadius: 10,
      }}
      key={data?.cgId}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text>Customer ID:- </Text>
        <Text>{data?.cgId}</Text>
        <View
          style={{
            width: 15,
            height: 15,
            borderRadius: 25,
            backgroundColor: data?.recordStatus ? "green" : "grey",
            marginLeft: 5,
          }}
        ></View>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ color: "#ffff" }}>Customer Name:- </Text>
        <Text style={{ color: "#ffff" }}>{data?.name}</Text>
      </View>

      <View>
        <Text style={{ color: "#ffff", fontFamily: "700" }}>
          Contact Details
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ color: "#ffff" }}>Mob: {data?.dailCode}</Text>
          <Text style={{ color: "#ffff" }}>{data?.mobile}</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ color: "#ffff" }}>Email:- </Text>
          <Text style={{ color: "#ffff" }}>
            {data?.email ? data?.email : "no email"}
          </Text>
        </View>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ color: "#E6E5E8", fontSize: 12 }}>
          Created: {date.toDateString(data?.createAt)}{" "}
        </Text>
      </View>
      <Text style={{ color: "#B9B8B9", fontSize: 12 }}>
        Updated: {date.toDateString(data?.updateAt)}{" "}
      </Text>
    </View>
  );
};

const CustomerListScreen = ({ onLoadMore }) => {
  const { onfetchDataHandler, custData, isLoading } =
    useCustomerDataViewModel();
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    onfetchDataHandler({ page: 1, search: searchText, sort: "", filter: "" });
  }, []);

  const customerListData = useQuery(Customer, (list) =>
    searchText
      ? list.filtered("name CONTAINS[c] $0", searchText).sorted("createAt")
      : list.sorted("createAt")
  );

  console.log("===============list data local=====================");
  console.log(customerListData);
  console.log("====================================");

  return (
    <View style={{ flex: 1, backgroundColor: "#BBAEF4", padding: "10%" }}>
      <Text>CustomerListScreen</Text>

      <View
        style={{
          flexDirection: "row",
          width: "100%",
          marginVertical: "5%",
        }}
      >
        <TextInput
          placeholder="Search Customer"
          style={{
            backgroundColor: "#F4F2FF",
            height: 48,
            borderRadius: 10,
            width: "90%",
          }}
          onChangeText={(text) => setSearchText(text)}
        />
      </View>
      <FlatList
        contentContainerStyle={{
          justifyContent: "center",

          flexGrow: 1,
        }}
        style={{}}
        data={customerListData}
        keyExtractor={(item) => item?.index}
        renderItem={(item) => <CustomerItem data={item?.item} />}
        onEndReached={() => onLoadMore}
      />
    </View>
  );
};

export default CustomerListScreen;

const styles = StyleSheet.create({});
