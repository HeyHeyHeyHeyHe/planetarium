import { StyleSheet, Dimensions } from "react-native";
import { Button, Text, Image, Box, VStack } from "@gluestack-ui/themed";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { quizzData } from "../../db/quizz";
import TextBox, { EStatus } from "../../components/common/TextBox";
import { getRandomArray } from "../../utils/function";
import LottieView from "lottie-react-native";

interface IShowData {
  [key: string]: string;
}

const show: IShowData = {
  easy: "Dễ",
  medium: "Trung bình",
  hard: "Khó",
};
const listLottie = [
  "https://lottie.host/14e75ac5-53d5-41f8-ab34-74548e3e96b4/4wKer7S7cj.json",
  "https://lottie.host/853bcc73-78a9-42cc-b4e3-2bc8bab35aec/m2Zf5uYuGL.json",
  "https://lottie.host/038cda99-f9a4-4077-bfcf-5d3f433c1daf/aBoYMbCKLu.json",
  "https://lottie.host/b96527a4-b93e-436b-8845-3c8fba029dd1/YDmOuWBw4X.json"
  
];

const QuizzScreen = () => {
  const [status, setStatus] = useState<EStatus[]>([
    EStatus.NORMAL,
    EStatus.NORMAL,
    EStatus.NORMAL,
    EStatus.NORMAL,
  ]);
  
  const [next, setNext] = useState(false);
  const [point, setPoint] = useState(0);

  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const [currQues, setCurrQues] = useState(0);
  const level: string = route.params.level ? route.params.level : "easy";
  const [quizzes] = useState(getRandomArray(quizzData[level], 4));

  const onPress = (i: number) => () => {
    const { ans } = quizzes[currQues];
    const newStatus = [...status];
    for (let index = 0; index < newStatus.length; index++) {
      newStatus[index] = EStatus.DISABLE;
    }
    if (i == ans) {
      newStatus[i] = EStatus.CORRECT;
      setPoint(point + 1);
    } else {
      newStatus[ans] = EStatus.CORRECT;
      newStatus[i] = EStatus.IN_CORRECT;
    }
    setNext(true);
    
    setStatus(newStatus);
  };

  const onNext = () => {
    if (currQues < quizzes.length - 1) {
      setCurrQues(currQues + 1);
      setNext(false);

      const newStatus = [...status];
      for (let index = 0; index < newStatus.length; index++) {
        newStatus[index] = EStatus.NORMAL;
      }
      setStatus(newStatus);
    } else {
      navigation.navigate("QuizzResult", {
        level: level,
        point,
        length: quizzes.length,
      });
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `Mức độ ${show[level]}`,
    });
  }, []);

  return (
    <VStack flex={1} justifyContent="flex-start" bg="$white" gap={"$8"}>
      <VStack gap={"$6"}>
        <Image
          alignSelf="center"
          alt="img-ques"
          style={styles.ima}
          source={quizzes[currQues].image}
        />
        <VStack px="$4" gap="$4">
          <Text
            color="$textDark900"
            fontWeight="600"
            fontSize={"$md"}
            w={"$full"}
            textAlign="left"
          >
            {quizzes[currQues].ques}
          </Text>

          <Box w={"$full"} gap={"$4"}>
            {quizzes[currQues].choose.map((item: string, i: number) => (
              <TextBox
                key={`${item}-${i}`}
                status={status[i]}
                onPress={onPress(i)}
                content={item}
                next={next}
              />
            ))}
          </Box>
        </VStack>
      </VStack>
      <LottieView
        source={{
          uri: listLottie[Math.floor(Math.random() * listLottie.length)],
        }}
        autoPlay
        loop
        style={{ width: "100%", height: 150 }}
      />
      {next && (
        <Box
          w={"100%"}
          p={"$4"}
          flex={1}
          position="absolute"
          bottom={0}
          pb={"$8"}
        >
          <Button
            disabled={!next}
            w={"$full"}
            rounded={"$xl"}
            bg={status[currQues] == EStatus.CORRECT ? "$green500" : "$red500"}
            onPress={onNext}
            opacity={!next ? 0.5 : 1}
            marginTop={"auto"}
          >
            <Text color="$white" fontWeight={"$bold"}>
              {next && currQues === quizzes.length - 1
                ? "HOÀN THÀNH"
                : "TIẾP TỤC"}
            </Text>
          </Button>
        </Box>
      )}
    </VStack>
  );
};

export default QuizzScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 30,
  },
  text_main: {
    color: "#A1783F",
    fontSize: 30,
    fontWeight: "bold",
  },
  text_level: {
    color: "#3D7944",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  btn__stop: {
    backgroundColor: "#FFFFFF",
    borderColor: "#3D7944",
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  btn__continue: {
    backgroundColor: "#3D7944",
    borderRadius: 10,
    marginHorizontal: 5,
  },
  ima: {
    margin: 20,
    height: Math.round(
      (159 / 290) * Math.round(Dimensions.get("screen").width)
    ),
    width: Math.round(1 * Dimensions.get("screen").width),
    resizeMode: "contain",
  },
});
