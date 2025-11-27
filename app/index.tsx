import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import UserTypeSelector from '../components/UserTypeSelector';
import AuthForm from '../components/AuthForm';
import CustomerApp from '../components/CustomerApp';
import MerchantApp from '../components/MerchantApp';
import DriverApp from '../components/DriverApp';
import AdminApp from '../components/AdminApp';

export default function Index() {
  const [selectedUserType, setSelectedUserType] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleUserTypeSelect = (userType: string) => {
    setSelectedUserType(userType);
  };

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleBackToSelection = () => {
    setSelectedUserType(null);
    setIsAuthenticated(false);
  };

  const renderApp = () => {
    if (!isAuthenticated || !selectedUserType) return null;

    switch (selectedUserType) {
      case 'customer':
        return <CustomerApp />;
      case 'merchant':
        return <MerchantApp />;
      case 'driver':
        return <DriverApp />;
      case 'admin':
        return <AdminApp />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {!selectedUserType ? (
        <UserTypeSelector onSelectUserType={handleUserTypeSelect} />
      ) : !isAuthenticated ? (
        <AuthForm 
          userType={selectedUserType} 
          onAuthSuccess={handleAuthSuccess}
        />
      ) : (
        renderApp()
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC'
  }
});