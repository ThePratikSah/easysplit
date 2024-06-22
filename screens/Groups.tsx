import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getGroups } from "@/config/firebase-helper";
import { ActivityIndicator, FAB, List, Title } from "react-native-paper";
import { ScrollView, StyleSheet, View } from "react-native";

const iconMap = {
  trip: "airplane",
  home: "home",
  couple: "heart",
  other: "information",
} as { [key: string]: string };

function getIcon(category: string): string {
  return iconMap[category];
}

export default function Groups({ navigation }: any) {
  const { status, data, error, isFetching } = useQuery({
    queryKey: ["groups"],
    queryFn: getGroups,
  });

  return status === "pending" ? (
    <Title>Pending</Title>
  ) : status === "error" ? (
    <Title>Error {error?.message}</Title>
  ) : (
    <View style={styles.container}>
      <List.Section>
        {isFetching ? <ActivityIndicator /> : null}
        <ScrollView>
          {data && data?.length > 0 ? (
            data?.map((item) => (
              <List.Item
                onPress={() => {
                  navigation.navigate("GroupsExpense", {
                    id: item?.id,
                    title: item?.name,
                  });
                }}
                key={item?.id}
                left={() => (
                  <List.Icon
                    style={{
                      backgroundColor: "orange",
                      padding: 10,
                      borderRadius: 5,
                    }}
                    icon={
                      getIcon(item?.category?.toLowerCase()) || "information"
                    }
                  />
                )}
                title={<Title>{item?.name}</Title>}
              />
            ))
          ) : (
            <List.Item
              title="Start by creating a new group!"
              left={() => (
                <List.Icon
                  style={{
                    backgroundColor: "orange",
                    padding: 10,
                    borderRadius: 5,
                  }}
                  icon={"plus"}
                />
              )}
              onPress={() => navigation.navigate("CreateGroup")}
            />
          )}
        </ScrollView>
      </List.Section>
      <FAB
        label="Create Group"
        style={styles.fab}
        icon={"plus"}
        onPress={() => navigation.navigate("CreateGroup")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  fab: {
    backgroundColor: "orange",
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
});
