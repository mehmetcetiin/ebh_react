import React from 'react';
import { View, ScrollView, Platform, StyleSheet } from 'react-native';
import { List, Divider } from 'react-native-paper';

export default function Settings() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <List.Section>
          <List.Subheader>Genel Ayarlar</List.Subheader>
          <List.Item
            title="Bildirimler"
            description="Uygulama bildirimlerini yönetin"
            left={props => <List.Icon {...props} icon="bell-outline" />}
          />
          <Divider />

          <List.Subheader>Hesap Ayarları</List.Subheader>
          <List.Item
            title="Profil"
            description="Profil bilgilerinizi düzenleyin"
            left={props => <List.Icon {...props} icon="account-circle-outline" />}
          />
          <List.Item
            title="Gizlilik ve Güvenlik"
            description="Gizlilik ayarlarını yönetin"
            left={props => <List.Icon {...props} icon="lock-outline" />}
          />
          <Divider />

          <List.Subheader>Diğer</List.Subheader>
          <List.Item
            title="Hakkında"
            description="Uygulama hakkında bilgiler"
            left={props => <List.Icon {...props} icon="information-outline" />}
          />
          <List.Item
            title="Yardım ve Destek"
            description="Yardım alın veya geri bildirim gönderin"
            left={props => <List.Icon {...props} icon="help-circle-outline" />}
          />
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
