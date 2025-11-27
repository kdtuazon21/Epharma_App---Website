import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface UserTypeSelectorProps {
  onSelectUserType: (type: string) => void;
}

export default function UserTypeSelector({ onSelectUserType }: UserTypeSelectorProps) {
  const userTypes = [
    { id: 'customer', title: 'Customer', subtitle: 'Browse & order products', color: '#4F46E5', icon: '🛒' },
    { id: 'merchant', title: 'Merchant', subtitle: 'Manage your store', color: '#059669', icon: '🏪' },
    { id: 'driver', title: 'Driver', subtitle: 'Deliver orders', color: '#DC2626', icon: '🚗' },
    { id: 'admin', title: 'Admin', subtitle: 'Platform management', color: '#7C2D12', icon: '⚙️' }
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Your Role</Text>
      <Text style={styles.subtitle}>Select how you want to use the platform</Text>
      
      <View style={styles.grid}>
        {userTypes.map((type) => (
          <TouchableOpacity
            key={type.id}
            style={[styles.card, { borderColor: type.color }]}
            onPress={() => onSelectUserType(type.id)}
          >
            <Text style={styles.icon}>{type.icon}</Text>
            <Text style={[styles.cardTitle, { color: type.color }]}>{type.title}</Text>
            <Text style={styles.cardSubtitle}>{type.subtitle}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1E293B',
    marginBottom: 8
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#64748B',
    marginBottom: 40
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  card: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 2,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4
  },
  icon: {
    fontSize: 32,
    marginBottom: 12
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center'
  }
});