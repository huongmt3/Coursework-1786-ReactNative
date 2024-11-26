import { off, onValue, ref } from 'firebase/database';
import { useEffect, useState } from 'react';
import { database } from "../utils/FirebaseConfig";
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function ClassDetailsScreen({ route }: { route: any }) {
    const { date, teacher, additionalComments, yogaCourseId } = route.params;

    const [course, setCourse] = useState<any>(null);

    //Get course data from firebase
    useEffect(() => {
        const courseRef = ref(database, `yoga_courses/${yogaCourseId}`);
        //Listener to get updated course data
        const unsubscribe = onValue(courseRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setCourse({ id: yogaCourseId, ...data });
            } else {
                setCourse(null);
            }
        });

        //Clean up listener when the component unmounts
        return () => off(courseRef, 'value', unsubscribe);
    }, [yogaCourseId]);

    //Show text when course data is not loaded yet
    if (!course) {
        return <Text>Loading...</Text>;
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Date: <Text style={styles.value}>{date}</Text></Text>
            <Text style={styles.title}>Teacher: <Text style={styles.value}>{teacher}</Text></Text>
            <Text style={styles.title}>Additional comments: <Text style={styles.value}>{additionalComments}</Text></Text>

            <View style={styles.separator} />

            <Text style={styles.title}>Day of the week: <Text style={styles.value}>{course.day_of_the_week}</Text></Text>
            <Text style={styles.title}>Time of course: <Text style={styles.value}>{course.time_of_course}</Text></Text>
            <Text style={styles.title}>Capacity: <Text style={styles.value}>{course.capacity}</Text></Text>
            <Text style={styles.title}>Duration: <Text style={styles.value}>{course.duration}</Text></Text>
            <Text style={styles.title}>Price per class: <Text style={styles.value}>{course.price_per_class}</Text></Text>
            <Text style={styles.title}>Type of class: <Text style={styles.value}>{course.type_of_class}</Text></Text>
            <Text style={styles.title}>Description: <Text style={styles.value}>{course.description}</Text></Text>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        padding: 20,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 5,
    },
    value: {
        fontSize: 16,
        fontWeight: '400',
        color: '#555',
    },
    separator: {
        height: 1,
        backgroundColor: '#e0e0e0',
        marginVertical: 10,
    },
});