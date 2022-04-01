import React, { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import Realm from "realm";

import { useMainContext } from "../../../business/context/RealmContext";
import { IPerson } from "../../../business/models/interfaces/IPerson";

const initialFormData = {
  name: "",
  age: undefined,
  dog: { name: "", age: undefined },
};

const Home = () => {
  const realm = useMainContext();

  const [formData, setFormData] = useState<IPerson>(initialFormData);

  const [data, setData] = useState<
    Realm.Results<IPerson & Realm.Object> | IPerson[]
  >([]);

  useEffect(() => {
    if (realm) {
      const dataStored = realm.objects<IPerson>("Person");

      setData(dataStored);

      dataStored.addListener((value) => {
        setData([...value]);
      });
    } else {
      // Handle realm undefined error
    }
  }, [realm]);

  const createPerson = () => {
    if (realm) {
      const personData: IPerson = {
        name: formData.name,
        age: formData.age,
      };

      if (
        formData.dog &&
        formData.dog.name !== "" &&
        formData.dog.age !== undefined
      ) {
        personData.dog = {
          name: formData.dog.name,
          age: formData.dog.age,
        };
      }
      realm.write(() => {
        realm.create<IPerson>("Person", personData);
      });
      setFormData(initialFormData);
    }
  };

  const logData = () => {
    if (realm) {
      console.log("Person: ", realm.objects<IPerson>("Person"));
      console.log("Dog: ", realm.objects("Dog"));
    }
  };

  const delAllPeople = () => {
    if (realm) {
      realm.write(() => {
        realm.deleteAll();
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Realm To-One</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Person name"
          value={formData.name}
          onChangeText={(text) => {
            setFormData((value) => ({ ...value, name: text }));
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="Person age"
          value={formData.age?.toString()}
          keyboardType="numeric"
          onChangeText={(text) => {
            setFormData((value) => ({ ...value, age: parseInt(text, 10) }));
          }}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Dog name"
          value={formData.dog?.name}
          onChangeText={(text) => {
            setFormData((value) => ({
              ...value,
              dog: { ...value.dog, name: text },
            }));
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="Dog age"
          value={formData.dog?.age?.toString()}
          onChangeText={(text) => {
            setFormData((value) => ({
              ...value,
              dog: { ...value.dog, age: parseInt(text, 10) },
            }));
          }}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="   Add   " onPress={createPerson} />
        <Button title="   Log   " onPress={logData} />
        <Button title="   Del   " onPress={delAllPeople} />
      </View>

      <Text style={styles.textInfo}>Stored data</Text>

      <FlatList
        data={data}
        style={styles.flatList}
        renderItem={({ item }) => {
          return (
            <View style={styles.itemContainer}>
              <Text>Person:</Text>
              <View style={styles.contentContainer}>
                <Text style={styles.itemText}>
                  Name: {item.name}, age: {item.age}
                </Text>
              </View>
              {item.dog && (
                <>
                  <Text>Dog:</Text>
                  <View style={styles.contentContainer}>
                    <Text style={styles.itemText}>
                      Name: {item.dog.name}, age: {item.dog.age}
                    </Text>
                  </View>
                </>
              )}
            </View>
          );
        }}
      />
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
    margin: 10,
  },
  input: {
    width: "45%",
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
  contentContainer: {
    flexDirection: "row",
    marginBottom: 5,
  },
  itemText: {
    fontSize: 20,
    fontWeight: "500",
    marginRight: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    width: "60%",
    justifyContent: "space-around",
    margin: 10,
  },
});

export default Home;
