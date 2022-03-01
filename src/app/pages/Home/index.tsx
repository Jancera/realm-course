import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

import Realm from "realm";
import getRealm from "../../../infrastructure/realm";
import { ITask, ITaskObject } from "../../../business/models/interfaces/ITask";

import writeTask from "../../../business/services/writeTask";

const Home = () => {
  let task: Realm.Results<ITaskObject>;

  const write = async () => {
    await writeTask({
      _id: 1,
      name: "Record Video",
      status: "Task running now...",
    });
  };

  const getTask = async () => {
    const realm = await getRealm();
    try {
      task = realm.objects<ITask>("Task").filtered("_id = 1");
      console.log(task);
    } catch (error) {
      console.log(error);
    }
  };

  const updateTask = async () => {
    const realm = await getRealm();

    const data = {
      _id: 1,
      status: "Finished 2",
    };

    realm.write(() => {
      realm.create("Task", data, Realm.UpdateMode.Modified);
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello from Home</Text>
      <Button title="Get Tasks" onPress={getTask} />
      <Button title="Update Task" onPress={updateTask} />
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
