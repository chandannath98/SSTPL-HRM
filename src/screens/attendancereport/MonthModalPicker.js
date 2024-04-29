import React, { useState } from 'react';
import { Modal, View, Button, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const MonthPickerModal = ({ visible, onClose, onSubmit }) => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth()+1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const months = [
    { label: 'January', value: '01' },
    { label: 'February', value: '02' },
    { label: 'March', value: '03' },
    { label: 'April', value: '04' },
    { label: 'May', value: '05' },
    { label: 'June', value: '06' },
    { label: 'July', value: '07' },
    { label: 'August', value: '08' },
    { label: 'September', value: '09' },
    { label: 'October', value: '10' },
    { label: 'November', value: '11' },
    { label: 'December', value: '12' },
  ];

  const years = [
    { label: '2022', value: '2022' },
    { label: '2023', value: '2023' },
    { label: '2024', value: '2024' },
    // Add more years as needed
  ];

  const handleCancel = () => {
    onClose();
  };

  const handleSubmit = () => {
    onSubmit(selectedMonth, selectedYear);
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
          <Picker
            placeholder={months[Number(selectedMonth)].label}
            selectedValue={selectedMonth}
            onValueChange={(itemValue) => setSelectedMonth(itemValue)}
          >
            {months.map(month => (
              <Picker.Item key={month.value} label={month.label} value={month.value} />
            ))}
          </Picker>
          <Picker
            selectedValue={selectedYear}
            onValueChange={(itemValue) => setSelectedYear(itemValue)}
          >
            {years.map(year => (
              <Picker.Item key={year.value} label={year.label} value={year.value} />
            ))}
          </Picker>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20,gap:5 }}>
            <Button title="Cancel" onPress={handleCancel} />
            <Button title="Submit" onPress={handleSubmit} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default MonthPickerModal;
