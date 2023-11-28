import { Image, StyleSheet, Text, View } from "react-native";

export default function HomeJanda() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.image}
          source={require("../assets/Bem-vindo-28-11-2023.png")}
        />
      </View>
      <View style={styles.branco}>
        <Text style={styles.title}>Janda: Uma Dupla Dinâmica em Ação</Text>
        <Text style={styles.subTitle}>
          Conheça Janda, a incrível dupla formada por Jão e Amanda, duas mentes
          criativas unidas por uma paixão comum: a realização de projetos
          inspiradores. Juntos, eles formam uma parceria única, combinando
          habilidades complementares e uma energia contagiante.
        </Text>
        <Image
          source={require("../assets/creeper-dance.gif")}
          style={styles.image2}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    backgroundColor: "#a600ff",
  },
  image: {
    width: "100%",
    height: 100,
    marginTop: 20,
  },
  image2: {
    width: "90%",
    height: "50%",
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 20,
  },
  branco: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: "100%",
  },

  header: {
    width: "100%",
    height: 100,
    backgroundColor: "#a600ff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
  subTitle: {
    fontSize: 15,
    textAlign: "justify",
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
  },
});
