import React from 'react';
import { View, ScrollView, Platform, StyleSheet } from 'react-native';
import { List, Divider } from 'react-native-paper';

export default function Search() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <List.Section>
          <List.Accordion
            title="İşlem Listesi"
            left={props => <List.Icon {...props} icon="file-document-outline" />}
          >
            <List.Item title="Talep Kaydı" />
            <List.Item title="İnceleme" />
            <List.Item title="Karar" />
            <List.Item title="Sıralı Programlar" />
          </List.Accordion>
          
          <Divider />

          <List.Accordion
            title="Raporlar"
            left={props => <List.Icon {...props} icon="file-chart-outline" />}
          >
            <List.Item title="Tarihler Arası Rapor" />
            <List.Item title="Genel Rapor" />
            <List.Item title="Mahalle Rapor" />
          </List.Accordion>
          
          <Divider />

          <List.Accordion
            title="Tanımlamalar"
            left={props => <List.Icon {...props} icon="account-outline" />}
          >
            <List.Item title="Kullanıcı Ekle" />
            <List.Item title="Personel Ekle" />
            <List.Item title="Ekip Ekle" />
            <List.Item title="Adres Sıra" />
            <List.Item title="Mahalle Ekle" />
          </List.Accordion>
          
          <Divider />
          
        </List.Section>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    marginTop: 100,
  },
  content: {
    marginHorizontal: 10,
    marginBottom: Platform.OS === 'ios' ? 50 : 60,
  },
});
