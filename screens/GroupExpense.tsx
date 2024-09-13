import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Avatar,
  Button,
  FAB,
  List,
  Modal,
  Portal,
  TextInput,
  Title,
} from 'react-native-paper';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  addUserToGroup,
  getGroupById,
  isValidEmail,
} from '../config/firebase-helper';
import Toast from 'react-native-toast-message';

export default function GroupExpense({ route, navigation }: any) {
  const { id, title } = route.params;
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState<string>('');

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  useEffect(() => {
    navigation.setOptions({ title });
  }, []);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: addUserToGroup,
    onSuccess: () => {
      hideModal();
      setLoading(false);
      setEmail('');
      queryClient.invalidateQueries({ queryKey: ['groupByID'] });
      Toast.show({
        type: 'success',
        text1: 'New group member added',
      });
    },
  });

  // TODO: get expense info
  const { status, data, error, isFetching, refetch } = useQuery({
    queryKey: ['groupByID', id],
    queryFn: async () => getGroupById({ groupId: id }) as any,
  });

  const onRefresh = useCallback(() => {
    refetch();
  }, []);

  async function handleFormSubmit() {
    if (!email || !isValidEmail(email)) {
      Toast.show({
        type: 'error',
        text1: 'Please enter a valid email',
      });
      return;
    }

    setLoading(true);
    mutation.mutate({
      email: email.toLowerCase(),
      groupId: id,
    });
  }

  return status === 'pending' ? (
    <Title>Fetching group data...</Title>
  ) : status === 'error' ? (
    <Title>Error {error?.message}</Title>
  ) : (
    <>
      <View style={styles.container}>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={styles.modalStyle}
          >
            <Title>Enter email of your friend</Title>
            <TextInput
              mode="outlined"
              style={styles.inputWrapper}
              label="Email"
              value={email}
              onChangeText={text => setEmail(text)}
            />
            {loading ? (
              <ActivityIndicator />
            ) : (
              <Button
                onPress={handleFormSubmit}
                style={styles.button}
                mode="contained"
              >
                Add member
              </Button>
            )}
          </Modal>
        </Portal>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.buttonScrollGroup}
        >
          <Button onPress={showModal} style={styles.button} mode="contained">
            Add members
          </Button>
          <View style={{ flexDirection: 'row' }}>
            {data?.groupMembers?.map((member: string, index: number) => (
              <Avatar.Text
                key={index}
                style={{ marginRight: 5 }}
                size={40}
                label={member[0]?.toUpperCase()}
              />
            ))}
          </View>
        </ScrollView>
        <Title>Expenses</Title>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={isFetching} onRefresh={onRefresh} />
          }
        >
          <List.Section>
            <List.Item
              onPress={() => navigation.navigate('ExpenseDetails')}
              left={() => (
                <List.Icon
                  style={{
                    backgroundColor: 'orange',
                    padding: 10,
                    borderRadius: 5,
                  }}
                  icon={'cash'}
                />
              )}
              right={() => (
                <Title style={{ fontSize: 16, fontWeight: 'bold' }}>
                  Rs. 300
                </Title>
              )}
              title={'Expense one'}
              description={'Hope this one is good'}
            />
          </List.Section>
        </ScrollView>
      </View>
      <FAB
        label="Add Expense"
        style={styles.fab}
        icon={'plus'}
        onPress={() =>
          navigation.navigate('AddExpense', { members: data?.groupMembers })
        }
      />
    </>
  );
}

const styles = StyleSheet.create({
  fab: {
    backgroundColor: 'orange',
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  container: {
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  buttonScrollGroup: {
    marginVertical: 10,
  },
  button: {
    height: 40,
    marginRight: 5,
    marginBottom: 5,
    borderRadius: 5,
  },
  modalStyle: {
    margin: 20,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  inputWrapper: {
    marginBottom: 20,
  },
});
