import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";

import colors from "./styles/colors";
import { HomeScreen } from "./HomeScreen";

import { RealmProvider } from "@realm/react";
import { schemas } from "./models";

export const AppWrapper = () => {
  return (
    <SafeAreaView style={styles.screen}>
      <RealmProvider schema={schemas}>
        <HomeScreen />
      </RealmProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.darkBlue,
  },
});
