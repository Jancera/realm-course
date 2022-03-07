import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

import getRealm from "../../../infrastructure/realm";
import { ITask } from "../../../business/models/interfaces/ITask";
import getAllTasks from "../../../business/services/getAllTasks";

const Home = () => {
  const getAll = async () => {
    const data = await getAllTasks();
    console.log(data);
  };

  const deleteTask = async () => {
    const realm = await getRealm();

    realm.write(() => {
      realm.delete(realm.objects<ITask>("Task").filtered("_id = 1"));
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Realm Delete</Text>
      <Button title="Get All Tasks" onPress={getAll} />
      <Button title="Delete Task" onPress={deleteTask} />
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
    marginBottom: 30,
    fontSize: 30,
    fontWeight: "bold",
  },
});

export default Home;
