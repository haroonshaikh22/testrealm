import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useQuery } from "@realm/react";
import { Customer } from "../../models/Customer";

const CustomerItem = ({ data }) => {
  console.log("===item=================================");
  console.log(data);
  console.log("====================================");
  return (
    <View
      style={{
        backgroundColor: "red",
        width: "100%",
        marginVertical: 5,
        padding: "3%",
      }}
      key={data?.cgId}
    >
      <Text>{data?.name}</Text>
    </View>
  );
};

const CustomerListScreen = () => {
  const customerListData = useQuery(
    Customer
    // (list) =>
    //   true
    //     ? list.sorted("createdAt")
    //     : list.filtered("isComplete == false").sorted("createdAt"),
    // []
  );

  console.log("===============list data local=====================");
  console.log(customerListData);
  console.log("====================================");

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", padding: "10%" }}>
      <Text>CustomerListScreen</Text>
      <FlatList
        contentContainerStyle={{
          justifyContent: "center",
          //   alignItems: "center",
          backgroundColor: "green",
          flexGrow: 1,
        }}
        style={{}}
        data={customerListData}
        keyExtractor={(item) => item?.index}
        renderItem={(item) => <CustomerItem data={item?.item} />}
      />
    </View>
  );
};

export default CustomerListScreen;

const styles = StyleSheet.create({});
