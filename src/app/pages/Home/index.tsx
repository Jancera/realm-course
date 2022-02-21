import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

import getRealm from "../../../infrastructure/realm";
import {
  ITask,
  ITaskObject,
} from "../../../business/models/interfaces/ITask";

import writeTask from "../../../business/services/writeTask";

const Home = () => {
  let firstTask: ITaskObject;

  const write = async () => {
    firstTask = await writeTask({
      _id: 1,
      name: "Record Video",
      status: "Task running now...",
    });
  };

  const getTasks = async () => {
    const realm = await getRealm();

    try {
      const data = realm.objects<ITask>("Task");

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello from Home</Text>
      <Button title="Write Tasks" onPress={write} />
      <Button title="Get Tasks" onPress={getTasks} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    marginBottom: 20,
  },
});

export default Home;
