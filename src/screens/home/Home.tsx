import { StyleSheet } from "react-native";
import React, { useState } from "react";
import { ScrollView, VStack } from "@gluestack-ui/themed";
import SlideImage from "./component/SlideImage";

import CardList from "./component/CardList";
import { EDisplayType } from "../../types";
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";
import { BottomTabsParams } from "../../navigations/config";
import {
  commonData,
  EData,
  headerSlideData,
  IData,
  mixedData,
  planetData,
} from "../../db/home-data";
import PopularList from "./component/PopularList";
import { getRandomArray } from "../../utils/function";
type Props = {} & NativeStackScreenProps<BottomTabsParams, "Home">;

const Home = ({ navigation }: Props) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <VStack flex={1} p={"$4"} gap={"$4"} bg="$white" paddingBottom={"$10"}>
        <SlideImage arrayData={Object.values(headerSlideData)} />
        <PopularList
          popularData={getRandomArray(Object.values(mixedData), 5)}
        />
        <CardList
          title="Hệ mặt trời"
          arrData={Object.values(commonData)}
          displayType={EDisplayType.NORMAL}
          dataType={EData.COMMON}
        />
        <CardList
          title="Hành tinh"
          arrData={Object.values(planetData)}
          displayType={EDisplayType.NORMAL}
          dataType={EData.PLANET}
        />
      </VStack>
    </ScrollView>
  );
};

export default Home;


