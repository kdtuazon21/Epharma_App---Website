import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
}

interface Order {
  id: string;
  customerName: string;
  items: string;
  total: number;
  status: string;
}

export default function MerchantApp() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState<Product[]>([
    { id: '1', name: 'Paracetamol 500mg', price: 25, stock: 100, category: 'Medicine' },
    { id: '2', name: 'Vitamin C', price: 150, stock: 50, category: 'Supplements' }
  ]);
  const [orders] = useState<Order[]>([
    { id: '1', customerName: 'John Doe', items: 'Paracetamol x2', total: 50, status: 'Pending' },
    { id: '2', customerName: 'Jane Smith', items: 'Vitamin C x1', total: 150, status: 'Processing' }
  ]);

  const [newProduct, setNewProduct] = useState({ name: '', price: '', stock: '', category: '' });

  const addProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.stock) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    
    const product: Product = {
      id: Date.now().toString(),
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      stock: parseInt(newProduct.stock),
      category: newProduct.category || 'General'
    };
    
    setProducts([...products, product]);
    setNewProduct({ name: '', price: '', stock: '', category: '' });
    Alert.alert('Success', 'Product added successfully!');
  };

  const renderDashboard = () => (
    <ScrollView style={styles.content}>
      <Text style={styles.sectionTitle}>Sales Overview</Text>
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>₱12,500</Text>
          <Text style={styles.statLabel}>Today's Sales</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>45</Text>
          <Text style={styles.statLabel}>Orders</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{products.length}</Text>
          <Text style={styles.statLabel}>Products</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>4.8</Text>
          <Text style={styles.statLabel}>Rating</Text>
        </View>
      </View>
    </ScrollView>
  );

  const renderProducts = () => (
    <ScrollView style={styles.content}>
      <Text style={styles.sectionTitle}>Product Management</Text>
      
      <View style={styles.addProductForm}>
        <TextInput
          style={styles.input}
          placeholder="Product Name"
          value={newProduct.name}
          onChangeText={(text) => setNewProduct({...newProduct, name: text})}
        />
        <TextInput
          style={styles.input}
          placeholder="Price (₱)"
          value={newProduct.price}
          onChangeText={(text) => setNewProduct({...newProduct, price: text})}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Stock Quantity"
          value={newProduct.stock}
          onChangeText={(text) => setNewProduct({...newProduct, stock: text})}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Category"
          value={newProduct.category}
          onChangeText={(text) => setNewProduct({...newProduct, category: text})}
        />
        <TouchableOpacity style={styles.addButton} onPress={addProduct}>
          <Text style={styles.addButtonText}>Add Product</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Your Products</Text>
      {products.map((product) => (
        <View key={product.id} style={styles.productCard}>
          <View style={styles.productInfo}>
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productCategory}>{product.category}</Text>
            <Text style={styles.productPrice}>₱{product.price}</Text>
            <Text style={styles.productStock}>Stock: {product.stock}</Text>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );

  const renderOrders = () => (
    <ScrollView style={styles.content}>
      <Text style={styles.sectionTitle}>Order Management</Text>
      {orders.map((order) => (
        <View key={order.id} style={styles.orderCard}>
          <View style={styles.orderInfo}>
            <Text style={styles.orderTitle}>Order #{order.id}</Text>
            <Text style={styles.orderCustomer}>{order.customerName}</Text>
            <Text style={styles.orderItems}>{order.items}</Text>
            <Text style={styles.orderTotal}>₱{order.total}</Text>
            <Text style={[styles.orderStatus, { color: order.status === 'Pending' ? '#DC2626' : '#059669' }]}>
              {order.status}
            </Text>
          </View>
          <TouchableOpacity style={styles.processButton}>
            <Text style={styles.processButtonText}>Process</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );

  const renderPayments = () => (
    <View style={styles.content}>
      <Text style={styles.sectionTitle}>Payment Management</Text>
      <View style={styles.paymentCard}>
        <Text style={styles.paymentTitle}>Total Earnings</Text>
        <Text style={styles.paymentAmount}>₱25,750</Text>
        <Text style={styles.paymentPending}>Pending: ₱2,500</Text>
      </View>
    </View>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return renderDashboard();
      case 'products': return renderProducts();
      case 'orders': return renderOrders();
      case 'payments': return renderPayments();
      default: return renderDashboard();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Merchant Dashboard</Text>
      {renderContent()}
      
      <View style={styles.tabBar}>
        {[
          { id: 'dashboard', title: 'Dashboard', icon: '📊' },
          { id: 'products', title: 'Products', icon: '📦' },
          { id: 'orders', title: 'Orders', icon: '📋' },
          { id: 'payments', title: 'Payments', icon: '💰' }
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
  header: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', padding: 16, backgroundColor: '#059669', color: 'white' },
  content: { flex: 1, padding: 16 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 16, color: '#1E293B' },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  statCard: { width: '48%', backgroundColor: 'white', borderRadius: 8, padding: 16, marginBottom: 12, alignItems: 'center' },
  statValue: { fontSize: 24, fontWeight: 'bold', color: '#059669' },
  statLabel: { fontSize: 12, color: '#64748B', marginTop: 4 },
  addProductForm: { backgroundColor: 'white', borderRadius: 8, padding: 16, marginBottom: 16 },
  input: { borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 6, padding: 12, marginBottom: 12, backgroundColor: '#F8FAFC' },
  addButton: { backgroundColor: '#059669', borderRadius: 6, padding: 12, alignItems: 'center' },
  addButtonText: { color: 'white', fontWeight: 'bold' },
  productCard: { backgroundColor: 'white', borderRadius: 8, padding: 16, marginBottom: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  productInfo: { flex: 1 },
  productName: { fontSize: 16, fontWeight: 'bold', color: '#1E293B' },
  productCategory: { fontSize: 12, color: '#64748B', marginTop: 2 },
  productPrice: { fontSize: 16, fontWeight: 'bold', color: '#059669', marginTop: 4 },
  productStock: { fontSize: 12, color: '#64748B', marginTop: 2 },
  editButton: { backgroundColor: '#F59E0B', borderRadius: 6, paddingHorizontal: 16, paddingVertical: 8 },
  editButtonText: { color: 'white', fontSize: 12, fontWeight: 'bold' },
  orderCard: { backgroundColor: 'white', borderRadius: 8, padding: 16, marginBottom: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  orderInfo: { flex: 1 },
  orderTitle: { fontSize: 16, fontWeight: 'bold', color: '#1E293B' },
  orderCustomer: { fontSize: 12, color: '#64748B', marginTop: 2 },
  orderItems: { fontSize: 14, color: '#1E293B', marginTop: 4 },
  orderTotal: { fontSize: 16, fontWeight: 'bold', color: '#059669', marginTop: 4 },
  orderStatus: { fontSize: 12, fontWeight: 'bold', marginTop: 2 },
  processButton: { backgroundColor: '#4F46E5', borderRadius: 6, paddingHorizontal: 16, paddingVertical: 8 },
  processButtonText: { color: 'white', fontSize: 12, fontWeight: 'bold' },
  paymentCard: { backgroundColor: 'white', borderRadius: 8, padding: 20, alignItems: 'center' },
  paymentTitle: { fontSize: 16, color: '#64748B', marginBottom: 8 },
  paymentAmount: { fontSize: 32, fontWeight: 'bold', color: '#059669', marginBottom: 8 },
  paymentPending: { fontSize: 14, color: '#F59E0B' },
  tabBar: { flexDirection: 'row', backgroundColor: 'white', paddingVertical: 8, borderTopWidth: 1, borderTopColor: '#E2E8F0' },
  tab: { flex: 1, alignItems: 'center', paddingVertical: 8 },
  activeTab: { backgroundColor: '#ECFDF5', borderRadius: 8, marginHorizontal: 4 },
  tabIcon: { fontSize: 20, marginBottom: 4 },
  tabText: { fontSize: 10, color: '#64748B' },
  activeTabText: { color: '#059669', fontWeight: 'bold' }
});