import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';

interface Delivery {
  id: string;
  customerName: string;
  address: string;
  items: string;
  total: number;
  status: string;
  distance: string;
}

export default function DriverApp() {
  const [activeTab, setActiveTab] = useState('requests');
  const [deliveries, setDeliveries] = useState<Delivery[]>([
    { id: '1', customerName: 'John Doe', address: '123 Main St, Manila', items: 'Paracetamol x2', total: 50, status: 'Available', distance: '2.5 km' },
    { id: '2', customerName: 'Jane Smith', address: '456 Oak Ave, Quezon City', items: 'Vitamin C x1', total: 150, status: 'Available', distance: '1.8 km' }
  ]);
  const [acceptedDeliveries, setAcceptedDeliveries] = useState<Delivery[]>([]);
  const [completedDeliveries] = useState<Delivery[]>([
    { id: '3', customerName: 'Bob Wilson', address: '789 Pine St, Makati', items: 'Medical Supplies', total: 300, status: 'Delivered', distance: '3.2 km' }
  ]);

  const acceptDelivery = (delivery: Delivery) => {
    setDeliveries(deliveries.filter(d => d.id !== delivery.id));
    setAcceptedDeliveries([...acceptedDeliveries, { ...delivery, status: 'Accepted' }]);
    Alert.alert('Success', 'Delivery request accepted!');
  };

  const updateDeliveryStatus = (deliveryId: string, newStatus: string) => {
    setAcceptedDeliveries(acceptedDeliveries.map(d => 
      d.id === deliveryId ? { ...d, status: newStatus } : d
    ));
    Alert.alert('Success', `Status updated to ${newStatus}`);
  };

  const renderRequests = () => (
    <ScrollView style={styles.content}>
      <Text style={styles.sectionTitle}>Available Delivery Requests</Text>
      {deliveries.map((delivery) => (
        <View key={delivery.id} style={styles.deliveryCard}>
          <View style={styles.deliveryInfo}>
            <Text style={styles.customerName}>{delivery.customerName}</Text>
            <Text style={styles.address}>{delivery.address}</Text>
            <Text style={styles.items}>{delivery.items}</Text>
            <Text style={styles.distance}>📍 {delivery.distance}</Text>
            <Text style={styles.total}>₱{delivery.total}</Text>
          </View>
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={styles.acceptButton}
              onPress={() => acceptDelivery(delivery)}
            >
              <Text style={styles.acceptButtonText}>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.rejectButton}>
              <Text style={styles.rejectButtonText}>Reject</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );

  const renderActive = () => (
    <ScrollView style={styles.content}>
      <Text style={styles.sectionTitle}>Active Deliveries</Text>
      {acceptedDeliveries.map((delivery) => (
        <View key={delivery.id} style={styles.activeDeliveryCard}>
          <View style={styles.deliveryInfo}>
            <Text style={styles.customerName}>{delivery.customerName}</Text>
            <Text style={styles.address}>{delivery.address}</Text>
            <Text style={styles.items}>{delivery.items}</Text>
            <Text style={styles.distance}>📍 {delivery.distance}</Text>
            <Text style={styles.total}>₱{delivery.total}</Text>
            <Text style={[styles.status, { color: '#F59E0B' }]}>Status: {delivery.status}</Text>
          </View>
          <View style={styles.statusButtons}>
            <TouchableOpacity 
              style={styles.statusButton}
              onPress={() => updateDeliveryStatus(delivery.id, 'Picked Up')}
            >
              <Text style={styles.statusButtonText}>Picked Up</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.statusButton}
              onPress={() => updateDeliveryStatus(delivery.id, 'In Transit')}
            >
              <Text style={styles.statusButtonText}>In Transit</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.statusButton, { backgroundColor: '#059669' }]}
              onPress={() => updateDeliveryStatus(delivery.id, 'Delivered')}
            >
              <Text style={styles.statusButtonText}>Delivered</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.mapButton}>
              <Text style={styles.mapButtonText}>🗺️ Navigate</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );

  const renderEarnings = () => (
    <ScrollView style={styles.content}>
      <Text style={styles.sectionTitle}>Earnings Overview</Text>
      <View style={styles.earningsCard}>
        <Text style={styles.earningsTitle}>Today's Earnings</Text>
        <Text style={styles.earningsAmount}>₱450</Text>
        <Text style={styles.earningsDetails}>3 deliveries completed</Text>
      </View>
      
      <Text style={styles.sectionTitle}>Completed Deliveries</Text>
      {completedDeliveries.map((delivery) => (
        <View key={delivery.id} style={styles.completedCard}>
          <View style={styles.deliveryInfo}>
            <Text style={styles.customerName}>{delivery.customerName}</Text>
            <Text style={styles.address}>{delivery.address}</Text>
            <Text style={styles.items}>{delivery.items}</Text>
            <Text style={styles.total}>₱{delivery.total}</Text>
            <Text style={[styles.status, { color: '#059669' }]}>✅ Delivered</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );

  const renderProfile = () => (
    <View style={styles.content}>
      <Text style={styles.sectionTitle}>Driver Profile</Text>
      <View style={styles.profileCard}>
        <Text style={styles.profileName}>Juan Dela Cruz</Text>
        <Text style={styles.profileInfo}>Driver ID: DR001</Text>
        <Text style={styles.profileInfo}>Rating: 4.9 ⭐</Text>
        <Text style={styles.profileInfo}>Total Deliveries: 156</Text>
        <Text style={styles.profileInfo}>Vehicle: Motorcycle</Text>
      </View>
    </View>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'requests': return renderRequests();
      case 'active': return renderActive();
      case 'earnings': return renderEarnings();
      case 'profile': return renderProfile();
      default: return renderRequests();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Driver App</Text>
      {renderContent()}
      
      <View style={styles.tabBar}>
        {[
          { id: 'requests', title: 'Requests', icon: '📋' },
          { id: 'active', title: 'Active', icon: '🚗' },
          { id: 'earnings', title: 'Earnings', icon: '💰' },
          { id: 'profile', title: 'Profile', icon: '👤' }
        ].map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tab, activeTab === tab.id && styles.activeTab]}
            onPress={() => setActiveTab(tab.id)}
          >
            <Text style={styles.tabIcon}>{tab.icon}</Text>
            <Text style={[styles.tabText, activeTab === tab.id && styles.activeTabText]}>
              {tab.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', padding: 16, backgroundColor: '#DC2626', color: 'white' },
  content: { flex: 1, padding: 16 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 16, color: '#1E293B' },
  deliveryCard: { backgroundColor: 'white', borderRadius: 8, padding: 16, marginBottom: 12, flexDirection: 'row', justifyContent: 'space-between' },
  activeDeliveryCard: { backgroundColor: 'white', borderRadius: 8, padding: 16, marginBottom: 12, borderLeftWidth: 4, borderLeftColor: '#F59E0B' },
  completedCard: { backgroundColor: 'white', borderRadius: 8, padding: 16, marginBottom: 12, borderLeftWidth: 4, borderLeftColor: '#059669' },
  deliveryInfo: { flex: 1 },
  customerName: { fontSize: 16, fontWeight: 'bold', color: '#1E293B' },
  address: { fontSize: 12, color: '#64748B', marginTop: 2 },
  items: { fontSize: 14, color: '#1E293B', marginTop: 4 },
  distance: { fontSize: 12, color: '#64748B', marginTop: 2 },
  total: { fontSize: 16, fontWeight: 'bold', color: '#DC2626', marginTop: 4 },
  status: { fontSize: 12, fontWeight: 'bold', marginTop: 4 },
  actionButtons: { alignItems: 'center' },
  acceptButton: { backgroundColor: '#059669', borderRadius: 6, paddingHorizontal: 16, paddingVertical: 8, marginBottom: 8 },
  acceptButtonText: { color: 'white', fontSize: 12, fontWeight: 'bold' },
  rejectButton: { backgroundColor: '#DC2626', borderRadius: 6, paddingHorizontal: 16, paddingVertical: 8 },
  rejectButtonText: { color: 'white', fontSize: 12, fontWeight: 'bold' },
  statusButtons: { marginTop: 8 },
  statusButton: { backgroundColor: '#4F46E5', borderRadius: 6, paddingHorizontal: 12, paddingVertical: 6, marginBottom: 4 },
  statusButtonText: { color: 'white', fontSize: 10, fontWeight: 'bold', textAlign: 'center' },
  mapButton: { backgroundColor: '#F59E0B', borderRadius: 6, paddingHorizontal: 12, paddingVertical: 6 },
  mapButtonText: { color: 'white', fontSize: 10, fontWeight: 'bold', textAlign: 'center' },
  earningsCard: { backgroundColor: 'white', borderRadius: 8, padding: 20, marginBottom: 16, alignItems: 'center' },
  earningsTitle: { fontSize: 16, color: '#64748B', marginBottom: 8 },
  earningsAmount: { fontSize: 32, fontWeight: 'bold', color: '#DC2626', marginBottom: 4 },
  earningsDetails: { fontSize: 12, color: '#64748B' },
  profileCard: { backgroundColor: 'white', borderRadius: 8, padding: 20 },
  profileName: { fontSize: 20, fontWeight: 'bold', color: '#1E293B', marginBottom: 8 },
  profileInfo: { fontSize: 14, color: '#64748B', marginBottom: 4 },
  tabBar: { flexDirection: 'row', backgroundColor: 'white', paddingVertical: 8, borderTopWidth: 1, borderTopColor: '#E2E8F0' },
  tab: { flex: 1, alignItems: 'center', paddingVertical: 8 },
  activeTab: { backgroundColor: '#FEF2F2', borderRadius: 8, marginHorizontal: 4 },
  tabIcon: { fontSize: 20, marginBottom: 4 },
  tabText: { fontSize: 10, color: '#64748B' },
  activeTabText: { color: '#DC2626', fontWeight: 'bold' }
});