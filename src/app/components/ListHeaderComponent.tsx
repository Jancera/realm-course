import React from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

import Realm from "realm";
import { IDog } from "../../business/models/interfaces/IDog";

import { IPerson } from "../../business/models/interfaces/IPerson";

type TListHeaderComponent = (
  data: IPerson,
  setter: React.Dispatch<React.SetStateAction<IPerson>>,
  realm: Realm | undefined,
  initialData: {
    name: string;
    age: undefined;
    dog: {
      id: number;
      name: string;
      age: undefined;
    }[];
  },
) => JSX.Element;

const ListHeaderComponent: TListHeaderComponent = (
  data,
  setter,
  realm,
  initialData,
) => {
  const { name, age, dog } = data;

  const addDogField = () => {
    setter((state) => {
      const stateCopy = { ...state };
      stateCopy.dog?.push({
        id: stateCopy.dog.length,
        name: "",
        age: undefined,
      });
      return stateCopy;
    });
  };

  const createPerson = () => {
    if (realm) {
      realm.write(() => {
        realm.create<IPerson>("Person", data);
      });
    }

    setter(initialData);
  };

  const logData = () => {
    if (realm) {
      console.log("Person: ", realm.objects<IPerson>("Person"));
      console.log("Dog: ", realm.objects<IDog>("Dog"));
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
      <Text style={styles.text}>Realm To-Many</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Person name"
          value={name}
          onChangeText={(text) => {
            setter((value) => ({ ...value, name: text }));
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="Person age"
          value={age?.toString()}
          keyboardType="numeric"
          onChangeText={(text) => {
            setter((value) => ({ ...value, age: parseInt(text, 10) }));
          }}
        />
      </View>
      {dog &&
        dog.map((i) => {
          return (
            <View style={styles.inputContainer} key={i.id}>
              <TextInput
                style={styles.input}
                placeholder="Dog name"
                value={i.name}
                onChangeText={(text) => {
                  setter((value) => {
                    const dataCopy = { ...value };
                    dataCopy.dog?.forEach((item) => {
                      // eslint-disable-next-line no-param-reassign
                      if (item.id === i.id) item.name = text;
                    });

                    return dataCopy;
                  });
                }}
              />
              <TextInput
                style={styles.input}
                placeholder="Dog age"
                value={i.age?.toString()}
                onChangeText={(text) => {
                  setter((value) => {
                    const dataCopy = { ...value };
                    dataCopy.dog?.forEach((item) => {
                      // eslint-disable-next-line no-param-reassign
                      if (item.id === i.id) item.age = parseInt(text, 10);
                    });
                    return dataCopy;
                  });
                }}
              />
            </View>
          );
        })}
      <View>
        <Button title="  Add Dog  " onPress={addDogField} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="   Add   " onPress={createPerson} />
        <Button title="   Log   " onPress={logData} />
        <Button title="   Del   " onPress={delAllPeople} />
      </View>
      <Text style={styles.textInfo}>Stored data</Text>
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
  buttonContainer: {
    flexDirection: "row",
    width: "60%",
    justifyContent: "space-around",
    margin: 10,
  },
});

export default ListHeaderComponent;
