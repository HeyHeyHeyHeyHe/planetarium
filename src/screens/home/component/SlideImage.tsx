import { Dimensions, StyleSheet } from "react-native";
import React, { useCallback, useState } from "react";
import { Box, HStack, VStack } from "@gluestack-ui/themed";
import MemberImage from "./MemberImage";
import Carousel from "react-native-snap-carousel";
import { getRandomArray } from "../../../utils/function";
import { useFocusEffect } from "@react-navigation/native";
import { IObjectData, IData } from "../../../db/home-data";
import { HeaderSlide } from "../../../types/dataType";
export interface SlideProps {
  arrayData: IData[];
}

const screenWidth = Dimensions.get("screen").width;

const SlideImage = (props: SlideProps) => {
  const { arrayData, ...rest } = props;
  const [slideIndex, setSlideIndex] = useState(0);
  const [facts, setFacts] = useState<IData[]>(getRandomArray(arrayData, 6));

  useFocusEffect(
    useCallback(() => {
      setFacts(getRandomArray(arrayData, 4));
    }, [arrayData])
  );
  return (
    <VStack alignItems={"center"} gap={"$2"}>
      <Carousel
        data={facts}
        renderItem={({ item }) => <MemberImage {...item} key={item.id} />}
        itemWidth={Math.round(screenWidth * 0.8)}
        sliderWidth={screenWidth}
        autoplay={true} // Enable autoplay
        loop={true} // Enable loop
        autoplayInterval={3000} // Set autoplay interval (in milliseconds)
        onSnapToItem={(index) => setSlideIndex(index)}
      />
      <HStack justifyContent="space-around" gap={8}>
        {facts.map((_, i) => (
          <Box
            width={i == slideIndex ? "$4" : "$2"}
            height={"$2"}
            marginTop={2}
            borderRadius={100}
            bg={i == slideIndex ? "$primary600" : "$blueGray600"}
            key={i}
          />
        ))}
      </HStack>
    </VStack>
  );
};

export default SlideImage;

const styles = StyleSheet.create({});
