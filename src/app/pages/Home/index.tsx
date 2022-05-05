import React, { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import "react-native-get-random-values";
import { v4 as uuid } from "uuid";
import Realm from "realm";

import { ITask } from "../../../business/models/interfaces/ITask";
import getAllTasks from "../../../business/services/getAllTasks";
import { useMainContext } from "../../../business/context/RealmContext";

const Home = () => {
  const realm = useMainContext();

  const [taskName, setTaskName] = useState("");

  const [data, setData] = useState<
    Realm.Results<ITask & Realm.Object> | ITask[]
  >([]);

  useEffect(() => {
    if (realm) {
      const tasks = realm.objects<ITask>("Task");

      setData(tasks);

      tasks.addListener((values) => {
        setData([...values]);
      });
    } else {
      // Handle realm undefined error
    }
  }, [realm]);

  const addTask = () => {
    if (realm) {
      realm.write(() => {
        realm.create<ITask>("Task", {
          _id: uuid(),
          _partition: "Jancer",
          task: taskName,
        });
      });
      setTaskName("");
    }
  };

  const getAll = async () => {
    console.log(await getAllTasks());
  };

  const deleteAll = () => {
    if (realm) {
      realm.write(() => {
        realm.deleteAll();
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Realm Listen</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={taskName}
          onChangeText={(value) => setTaskName(value)}
        />
        <Button title="Add" onPress={addTask} />
      </View>

      <Text style={styles.textInfo}>Stored data</Text>

      <FlatList
        data={data}
        style={styles.flatList}
        renderItem={({ item }) => {
          return (
            <View style={styles.itemContainer}>
              <Text style={styles.itemTitle}>{item._partition}</Text>
              <Text style={styles.itemText}>{item.task}</Text>
            </View>
          );
        }}
      />
      <View style={styles.buttonContainer}>
        <Button title="Get all" onPress={getAll} />
        <Button title="Delete all" onPress={deleteAll} />
      </View>
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
  textInfo: {
    fontSize: 25,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
    marginHorizontal: 10,
  },
  input: {
    width: "80%",
    borderWidth: 2,
    borderColor: "grey",
    fontSize: 20,
    padding: 5,
  },
  flatList: {
    flexGrow: 0,
    width: "90%",
    height: "50%",
    borderWidth: 2,
    borderColor: "grey",
  },
  itemContainer: {
    marginHorizontal: 5,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: "grey",
  },
  itemText: {
    fontSize: 18,
    marginLeft: 10,
  },
  itemTitle: {
    fontSize: 20,
    fontWeight: "500",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "50%",
    justifyContent: "space-between",
    margin: 10,
  },
});

export default Home;
