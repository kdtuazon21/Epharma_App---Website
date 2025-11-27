import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';

interface User {
  id: string;
  name: string;
  email: string;
  type: string;
  status: string;
}

export default function AdminApp() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [users] = useState<User[]>([
    { id: '1', name: 'John Merchant', email: 'john@store.com', type: 'Merchant', status: 'Active' },
    { id: '2', name: 'Jane Driver', email: 'jane@delivery.com', type: 'Driver', status: 'Active' },
    { id: '3', name: 'Bob Customer', email: 'bob@email.com', type: 'Customer', status: 'Active' }
  ]);

  const renderDashboard = () => (
    <ScrollView style={styles.content}>
      <Text style={styles.sectionTitle}>Platform Overview</Text>
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>₱125,000</Text>
          <Text style={styles.statLabel}>Total Sales</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>450</Text>
          <Text style={styles.statLabel}>Total Orders</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>25</Text>
          <Text style={styles.statLabel}>Active Merchants</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>15</Text>
          <Text style={styles.statLabel}>Active Drivers</Text>
        </View>
      </View>
      
      <Text style={styles.sectionTitle}>Recent Activity</Text>
      <View style={styles.activityCard}>
        <Text style={styles.activityText}>• New merchant registered: ABC Pharmacy</Text>
        <Text style={styles.activityText}>• Driver completed 5 deliveries today</Text>
        <Text style={styles.activityText}>• System maintenance scheduled</Text>
      </View>
    </ScrollView>
  );

  const renderUsers = () => (
    <ScrollView style={styles.content}>
      <Text style={styles.sectionTitle}>User Management</Text>
      {users.map((user) => (
        <View key={user.id} style={styles.userCard}>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userEmail}>{user.email}</Text>
            <Text style={styles.userType}>{user.type}</Text>
            <Text style={[styles.userStatus, { color: user.status === 'Active' ? '#059669' : '#DC2626' }]}>
              {user.status}
            </Text>
          </View>
          <View style={styles.userActions}>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.suspendButton}>
              <Text style={styles.suspendButtonText}>Suspend</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );

  const renderAnalytics = () => (
    <ScrollView style={styles.content}>
      <Text style={styles.sectionTitle}>Sales Analytics</Text>
      <View style={styles.analyticsCard}>
        <Text style={styles.analyticsTitle}>Revenue Breakdown</Text>
        <Text style={styles.analyticsItem}>• Medicines: ₱75,000 (60%)</Text>
        <Text style={styles.analyticsItem}>• Medical Supplies: ₱30,000 (24%)</Text>
        <Text style={styles.analyticsItem}>• Supplements: ₱20,000 (16%)</Text>
      </View>
      
      <View style={styles.analyticsCard}>
        <Text style={styles.analyticsTitle}>Top Performing Merchants</Text>
        <Text style={styles.analyticsItem}>1. ABC Pharmacy - ₱25,000</Text>
        <Text style={styles.analyticsItem}>2. MediCare Store - ₱18,500</Text>
        <Text style={styles.analyticsItem}>3. Health Plus - ₱15,200</Text>
      </View>
      
      <TouchableOpacity style={styles.exportButton}>
        <Text style={styles.exportButtonText}>📊 Export Excel Report</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const renderSettings = () => (
    <ScrollView style={styles.content}>
      <Text style={styles.sectionTitle}>System Configuration</Text>
      
      <View style={styles.settingsCard}>
        <Text style={styles.settingsTitle}>Commission Rates</Text>
        <TextInput style={styles.settingsInput} placeholder="Merchant Commission (%)" defaultValue="10" />
        <TextInput style={styles.settingsInput} placeholder="Driver Commission (%)" defaultValue="15" />
      </View>
      
      <View style={styles.settingsCard}>
        <Text style={styles.settingsTitle}>Delivery Zones</Text>
        <TextInput style={styles.settingsInput} placeholder="Add new delivery zone" />
        <Text style={styles.zoneItem}>• Manila</Text>
        <Text style={styles.zoneItem}>• Quezon City</Text>
        <Text style={styles.zoneItem}>• Makati</Text>
      </View>
      
      <View style={styles.settingsCard}>
        <Text style={styles.settingsTitle}>Product Categories</Text>
        <TextInput style={styles.settingsInput} placeholder="Add new category" />
        <Text style={styles.categoryItem}>• Medicines</Text>
        <Text style={styles.categoryItem}>• Medical Supplies</Text>
        <Text style={styles.categoryItem}>• Supplements</Text>
      </View>
      
      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save Settings</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return renderDashboard();
      case 'users': return renderUsers();
      case 'analytics': return renderAnalytics();
      case 'settings': return renderSettings();
      default: return renderDashboard();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Admin Dashboard</Text>
      {renderContent()}
      
      <View style={styles.tabBar}>
        {[
          { id: 'dashboard', title: 'Dashboard', icon: '📊' },
          { id: 'users', title: 'Users', icon: '👥' },
          { id: 'analytics', title: 'Analytics', icon: '📈' },
          { id: 'settings', title: 'Settings', icon: '⚙️' }
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
  header: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', padding: 16, backgroundColor: '#7C2D12', color: 'white' },
  content: { flex: 1, padding: 16 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 16, color: '#1E293B' },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 20 },
  statCard: { width: '48%', backgroundColor: 'white', borderRadius: 8, padding: 16, marginBottom: 12, alignItems: 'center' },
  statValue: { fontSize: 24, fontWeight: 'bold', color: '#7C2D12' },
  statLabel: { fontSize: 12, color: '#64748B', marginTop: 4 },
  activityCard: { backgroundColor: 'white', borderRadius: 8, padding: 16 },
  activityText: { fontSize: 14, color: '#64748B', marginBottom: 8 },
  userCard: { backgroundColor: 'white', borderRadius: 8, padding: 16, marginBottom: 12, flexDirection: 'row', justifyContent: 'space-between' },
  userInfo: { flex: 1 },
  userName: { fontSize: 16, fontWeight: 'bold', color: '#1E293B' },
  userEmail: { fontSize: 12, color: '#64748B', marginTop: 2 },
  userType: { fontSize: 12, color: '#4F46E5', marginTop: 2, fontWeight: 'bold' },
  userStatus: { fontSize: 12, fontWeight: 'bold', marginTop: 2 },
  userActions: { alignItems: 'center' },
  editButton: { backgroundColor: '#F59E0B', borderRadius: 6, paddingHorizontal: 12, paddingVertical: 6, marginBottom: 4 },
  editButtonText: { color: 'white', fontSize: 10, fontWeight: 'bold' },
  suspendButton: { backgroundColor: '#DC2626', borderRadius: 6, paddingHorizontal: 12, paddingVertical: 6 },
  suspendButtonText: { color: 'white', fontSize: 10, fontWeight: 'bold' },
  analyticsCard: { backgroundColor: 'white', borderRadius: 8, padding: 16, marginBottom: 16 },
  analyticsTitle: { fontSize: 16, fontWeight: 'bold', color: '#1E293B', marginBottom: 8 },
  analyticsItem: { fontSize: 14, color: '#64748B', marginBottom: 4 },
  exportButton: { backgroundColor: '#059669', borderRadius: 8, padding: 16, alignItems: 'center' },
  exportButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  settingsCard: { backgroundColor: 'white', borderRadius: 8, padding: 16, marginBottom: 16 },
  settingsTitle: { fontSize: 16, fontWeight: 'bold', color: '#1E293B', marginBottom: 12 },
  settingsInput: { borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 6, padding: 12, marginBottom: 8, backgroundColor: '#F8FAFC' },
  zoneItem: { fontSize: 14, color: '#64748B', marginBottom: 4 },
  categoryItem: { fontSize: 14, color: '#64748B', marginBottom: 4 },
  saveButton: { backgroundColor: '#7C2D12', borderRadius: 8, padding: 16, alignItems: 'center' },
  saveButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  tabBar: { flexDirection: 'row', backgroundColor: 'white', paddingVertical: 8, borderTopWidth: 1, borderTopColor: '#E2E8F0' },
  tab: { flex: 1, alignItems: 'center', paddingVertical: 8 },
  activeTab: { backgroundColor: '#FEF7ED', borderRadius: 8, marginHorizontal: 4 },
  tabIcon: { fontSize: 20, marginBottom: 4 },
  tabText: { fontSize: 10, color: '#64748B' },
  activeTabText: { color: '#7C2D12', fontWeight: 'bold' }
});