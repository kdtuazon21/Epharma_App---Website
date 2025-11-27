import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput } from 'react-native';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
}

export default function CustomerApp() {
  const [activeTab, setActiveTab] = useState('browse');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<Product[]>([]);

  const products: Product[] = [
    { id: '1', name: 'Paracetamol 500mg', price: 25, category: 'Medicine', stock: 100 },
    { id: '2', name: 'Vitamin C', price: 150, category: 'Supplements', stock: 50 },
    { id: '3', name: 'Face Mask', price: 5, category: 'Medical Supplies', stock: 200 },
    { id: '4', name: 'Hand Sanitizer', price: 75, category: 'Medical Supplies', stock: 80 }
  ];

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  const renderBrowse = () => (
    <ScrollView style={styles.content}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search products..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      
      <Text style={styles.sectionTitle}>Available Products</Text>
      {products.map((product) => (
        <View key={product.id} style={styles.productCard}>
          <View style={styles.productInfo}>
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productCategory}>{product.category}</Text>
            <Text style={styles.productPrice}>₱{product.price}</Text>
            <Text style={styles.productStock}>Stock: {product.stock}</Text>
          </View>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => addToCart(product)}
          >
            <Text style={styles.addButtonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );

  const renderPrescription = () => (
    <View style={styles.content}>
      <Text style={styles.sectionTitle}>Upload Prescription</Text>
      <TouchableOpacity style={styles.uploadButton}>
        <Text style={styles.uploadButtonText}>📷 Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.uploadButton}>
        <Text style={styles.uploadButtonText}>📁 Choose from Gallery</Text>
      </TouchableOpacity>
    </View>
  );

  const renderConsultation = () => (
    <View style={styles.content}>
      <Text style={styles.sectionTitle}>Online Consultation</Text>
      <Text style={styles.consultText}>Available Doctors:</Text>
      <View style={styles.doctorCard}>
        <Text style={styles.doctorName}>Dr. Maria Santos</Text>
        <Text style={styles.doctorSpecialty}>General Practitioner</Text>
        <TouchableOpacity style={styles.consultButton}>
          <Text style={styles.consultButtonText}>Consult Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderOrders = () => (
    <View style={styles.content}>
      <Text style={styles.sectionTitle}>My Orders</Text>
      <View style={styles.orderCard}>
        <Text style={styles.orderTitle}>Order #12345</Text>
        <Text style={styles.orderStatus}>Status: In Transit</Text>
        <Text style={styles.orderTotal}>Total: ₱250</Text>
      </View>
    </View>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'browse': return renderBrowse();
      case 'prescription': return renderPrescription();
      case 'consultation': return renderConsultation();
      case 'orders': return renderOrders();
      default: return renderBrowse();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Customer App</Text>
      {renderContent()}
      
      <View style={styles.tabBar}>
        {[
          { id: 'browse', title: 'Browse', icon: '🛒' },
          { id: 'prescription', title: 'Prescription', icon: '📋' },
          { id: 'consultation', title: 'Consult', icon: '👨‍⚕️' },
          { id: 'orders', title: 'Orders', icon: '📦' }
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
  header: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', padding: 16, backgroundColor: '#4F46E5', color: 'white' },
  content: { flex: 1, padding: 16 },
  searchInput: { borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 8, padding: 12, marginBottom: 16, backgroundColor: 'white' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 16, color: '#1E293B' },
  productCard: { backgroundColor: 'white', borderRadius: 8, padding: 16, marginBottom: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  productInfo: { flex: 1 },
  productName: { fontSize: 16, fontWeight: 'bold', color: '#1E293B' },
  productCategory: { fontSize: 12, color: '#64748B', marginTop: 2 },
  productPrice: { fontSize: 16, fontWeight: 'bold', color: '#4F46E5', marginTop: 4 },
  productStock: { fontSize: 12, color: '#64748B', marginTop: 2 },
  addButton: { backgroundColor: '#4F46E5', borderRadius: 6, paddingHorizontal: 16, paddingVertical: 8 },
  addButtonText: { color: 'white', fontSize: 12, fontWeight: 'bold' },
  uploadButton: { backgroundColor: 'white', borderRadius: 8, padding: 20, marginBottom: 12, alignItems: 'center', borderWidth: 2, borderColor: '#E2E8F0', borderStyle: 'dashed' },
  uploadButtonText: { fontSize: 16, color: '#64748B' },
  consultText: { fontSize: 14, color: '#64748B', marginBottom: 12 },
  doctorCard: { backgroundColor: 'white', borderRadius: 8, padding: 16, marginBottom: 12 },
  doctorName: { fontSize: 16, fontWeight: 'bold', color: '#1E293B' },
  doctorSpecialty: { fontSize: 12, color: '#64748B', marginTop: 2 },
  consultButton: { backgroundColor: '#059669', borderRadius: 6, paddingHorizontal: 16, paddingVertical: 8, marginTop: 8, alignSelf: 'flex-start' },
  consultButtonText: { color: 'white', fontSize: 12, fontWeight: 'bold' },
  orderCard: { backgroundColor: 'white', borderRadius: 8, padding: 16, marginBottom: 12 },
  orderTitle: { fontSize: 16, fontWeight: 'bold', color: '#1E293B' },
  orderStatus: { fontSize: 12, color: '#64748B', marginTop: 2 },
  orderTotal: { fontSize: 14, fontWeight: 'bold', color: '#4F46E5', marginTop: 4 },
  tabBar: { flexDirection: 'row', backgroundColor: 'white', paddingVertical: 8, borderTopWidth: 1, borderTopColor: '#E2E8F0' },
  tab: { flex: 1, alignItems: 'center', paddingVertical: 8 },
  activeTab: { backgroundColor: '#EEF2FF', borderRadius: 8, marginHorizontal: 4 },
  tabIcon: { fontSize: 20, marginBottom: 4 },
  tabText: { fontSize: 10, color: '#64748B' },
  activeTabText: { color: '#4F46E5', fontWeight: 'bold' }
});