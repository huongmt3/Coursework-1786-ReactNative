import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput, Button } from 'react-native';
import { onValue, ref, off } from "firebase/database";
import { database } from "../utils/FirebaseConfig";
import React, { useEffect, useState } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';

export default function YogaClassScreen({ navigation }: { navigation: any }) {
    const [classes, setClasses] = useState<any[]>([]);
    const [filteredClasses, setFilteredClasses] = useState<any[]>([]);
    const [searchText, setSearchText] = useState('');
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const [showDatePicker, setShowDatePicker] = useState(false);

    //Get class data from firebase
    useEffect(() => {
        const classesRef = ref(database, "yoga_classes/");
        onValue(classesRef, (snapshot) => {
            const data = snapshot.val();
            const classList = data
                ? Object.keys(data).map((key) => ({ id: key, ...data[key] }))
                : [];
            setClasses(classList);
            setFilteredClasses(classList);
        });
        //Clean up listener when the component unmounts
        return () => off(classesRef);
    }, []);

    //Handle search based on teacher name
    const handleSearch = (text: string) => {
        setSearchText(text);
        filterClasses(text, selectedDate);
    };

    //Handle search based on date
    const handleDateChange = (event: any, selectedDate: Date | undefined) => {
        const currentDate = selectedDate || new Date();
        //Close date picker
        if (event.type === 'dismissed') {
            setShowDatePicker(false);
            return;
        }
        setShowDatePicker(false);
        setSelectedDate(currentDate);
        filterClasses(searchText, currentDate);
    };

    //Format date
    const formatDateToDDMMYYYY = (date: Date): string => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    //Show class(es) based on teacher name and date
    const filterClasses = (search: string, date: Date | undefined) => {
        let filtered = classes;

        if (date) {
            const dateString = formatDateToDDMMYYYY(date);
            filtered = filtered.filter(item => item.date.includes(dateString));
        }

        if (search) {
            filtered = filtered.filter(item =>
                item.teacher.toLowerCase().includes(search.toLowerCase())
            );
        }

        setFilteredClasses(filtered);
    };

    //To remove date filter
    const unselectDate = () => {
        setSelectedDate(undefined);
        filterClasses(searchText, undefined);
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchBar}
                placeholder="Search by teacher"
                value={searchText}
                onChangeText={handleSearch}
            />

            <View style={styles.buttonContainer}>
                <Button
                    title="Select Date"
                    onPress={() => setShowDatePicker(true)}
                />

                {showDatePicker && (
                    <DateTimePicker
                        value={selectedDate || new Date()}
                        mode="date"
                        display="default"
                        onChange={handleDateChange}
                    />
                )}

                {selectedDate && (
                    <Button
                        title="Unselect Date"
                        onPress={unselectDate}
                    />
                )}
            </View>

            <FlatList
                data={filteredClasses}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Details', {
                            date: item.date,
                            teacher: item.teacher,
                            additionalComments: item.additional_comments,
                            yogaCourseId: item.yoga_course_id,
                        })}
                    >
                        <View style={styles.itemContainer}>
                            <Text style={styles.date}>{item.date}</Text>
                            <Text style={styles.teacher}>{item.teacher}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22,
        backgroundColor: '#f7f7f7',
        paddingHorizontal: 10,
    },
    searchBar: {
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
        borderRadius: 5,
    },
    buttonContainer: {
        marginBottom: 20,
    },
    selectedDate: {
        fontSize: 16,
        marginTop: 10,
    },
    itemContainer: {
        backgroundColor: '#ffffff',
        padding: 15,
        marginBottom: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    date: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    teacher: {
        fontSize: 16,
        color: '#555',
        marginTop: 5,
    },
});
