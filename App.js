import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { api } from "./services/api";

export default function App() {
  const [champions, setChampions] = useState([]);
  const [details, setDetails] = useState(false);
  const [campeao, setCampeao] = useState();

  function Details(e) {
    setCampeao(e);
    setDetails(!details);
  }

  async function fetchChampions() {
    try {
      const response = await api.get("cdn/11.15.1/data/en_US/champion.json");
      const resposta = response.data;

      setChampions(Object.entries(resposta.data));
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchChampions();
  }, []);
  function Champion({ name, title, stats }) {
    return (
      <TouchableOpacity
        onPress={() => {
          Details();
        }}
      >
        <Image
          style={styles.championImage}
          source={{
            uri: `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${name}_0.jpg`,
          }}
        />
        <Text style={styles.championName}>{name}</Text>
        <Text style={styles.championTitle}>{title}</Text>
        <View style={styles.containerCampeao}>
          <Text style={styles.championTitle}>HP: {stats.hp}</Text>
          <Text style={styles.championTitle}>MP: {stats.mp}</Text>
          <Text style={styles.championTitle}>Armadura: {stats.armor}</Text>
          <Text style={styles.championTitle}>Ataque: {stats.attackdamage}</Text>
          <Text style={styles.championTitle}>
            Velocidade deAtaque: {stats.attackspeed}
          </Text>
        </View>
        <View></View>
      </TouchableOpacity>
    );
  }

  function MapChampions() {
    return (
      <View>
        {champions.map((champion, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                Details(champion);
              }}
            >
              <Text style={styles.text}> {champion[0]}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>League of Legends</Text>
      <ScrollView style={styles.view}>
        {!details ? (
          <MapChampions />
        ) : (
          <Champion
            name={campeao[1].name}
            title={campeao[1].title}
            stats={campeao[1].stats}
          />
        )}
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#042028",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    marginTop: 40,
    marginBottom: 10,
    color: "#BE5A04",
    fontSize: 40,
    borderBottomWidth: 4,
    borderBottomColor: "black",
  },
  view: {
    width: "100%",
    display: "flex",
  },
  text: {
    fontSize: 25,
    textAlign: "center",
    color: "#5A3A24",
    fontWeight: "bold",
  },
  containerCampeao: {
    marginTop: 40,
    flex: 1,
    backgroundColor: "#042028",
    alignItems: "center",
    justifyContent: "center",
  },
  championImage: {
    width: "100%",
    height: 200,
  },
  championName: {
    marginTop: 60,

    fontSize: 50,
    textAlign: "center",
    color: "#5A3A24",
    fontWeight: "bold",
  },
  championTitle: {
    fontSize: 20,
    textAlign: "center",
    color: "#A9A9A9",
    fontWeight: "bold",
  },
});
