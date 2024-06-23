import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, StyleSheet } from "react-native";

const SafeScrollView = ({ children, header }) => {
  return (
    <SafeAreaView style={styles.container}>
      {header}
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    marginHorizontal: 16,
  },
});

export default SafeScrollView;
