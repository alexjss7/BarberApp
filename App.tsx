import "react-native-gesture-handler";
import React from "react";
import { StatusBar, SafeAreaView, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/HomeTabNavigator";
import { globalStyles, colors } from "./src/styles/globalStyles";
import Realm from "realm";
import { getRealm } from "./src/data/RealmConfig";

export default function App() {

  const initializeData = async () => {
    try {
      const realm = await getRealm();
      realm.write(() => {
       
        if (realm.objects("Service").length === 0) {
          realm.create("Service", {
            _id: new Realm.BSON.ObjectId(),
            name: "Corte Social",
            price: 30.0,
            duration: 45,
          });
          realm.create("Service", {
            _id: new Realm.BSON.ObjectId(),
            name: "Barba Modelada",
            price: 25.0,
            duration: 30,
          });
          realm.create("Service", {
            _id: new Realm.BSON.ObjectId(),
            name: "Hidratação Capilar",
            price: 40.0,
            duration: 20,
          });
        }
    
        if (realm.objects("Product").length === 0) {
          realm.create("Product", {
            _id: new Realm.BSON.ObjectId(),
            name: "Gel Fixador Forte",
            type: "Gel",
            quantity: 50,
            price: 15.0,
          });
          realm.create("Product", {
            _id: new Realm.BSON.ObjectId(),
            name: "Shampoo For Men",
            type: "Shampoo",
            quantity: 30,
            price: 25.0,
          });
          realm.create("Product", {
            _id: new Realm.BSON.ObjectId(),
            name: "Pomada Efeito Matte",
            type: "Pomada",
            quantity: 40,
            price: 20.0,
          });
          realm.create("Product", {
            _id: new Realm.BSON.ObjectId(),
            name: "Camisa Nego Bala G",
            type: "Camisa",
            quantity: 10,
            price: 70.0,
          });
        }
      });
    } catch (error) {
      console.error("Erro ao inicializar dados do Realm:", error);
    }
  };

  React.useEffect(() => {
    initializeData();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </SafeAreaView>
  );
}
