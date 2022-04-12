import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import Realm from "realm";

import { useMainContext } from "../../../business/context/RealmContext";
import { IPerson } from "../../../business/models/interfaces/IPerson";
import ListHeaderComponent from "../../components/ListHeaderComponent";

const Home = () => {
  const realm = useMainContext();

  const initialFormData = {
    name: "",
    age: undefined,
    dog: [{ id: Math.round(Math.random() * 1000), name: "", age: undefined }],
  };
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

  const renderItem = ({ item }: { item: IPerson }) => {
    const dogInfo = item.dog?.map((i) => {
      return (
        <React.Fragment key={i.id}>
          <Text>Dog:</Text>
          <View style={styles.contentContainer}>
            <Text style={styles.itemText}>
              Name: {i.name}, age: {i.age}
            </Text>
          </View>
        </React.Fragment>
      );
    });
    return (
      <View style={styles.itemContainer}>
        <Text>Person:</Text>
        <View style={styles.contentContainer}>
          <Text style={styles.itemText}>
            Name: {item.name}, age: {item.age}
          </Text>
        </View>
        {dogInfo}
      </View>
    );
  };
  return (
    <FlatList
      data={data}
      contentContainerStyle={styles.flatList}
      ListHeaderComponent={ListHeaderComponent(
        formData,
        setFormData,
        realm,
        initialFormData,
      )}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  flatList: {
    /* flexGrow: 0, */
    /*  justifyContent: "center",
    alignItems: "center", */
    /*  width: "90%",
    height: "50%", */
    /*  borderWidth: 2,
    borderColor: "grey", */
  },
  itemContainer: {
    marginHorizontal: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
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
});

export default Home;
