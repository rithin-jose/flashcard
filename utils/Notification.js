import AsyncStorage from '@react-native-community/async-storage'
import * as Permissions from 'expo-permissions';
import {Notifications} from "expo";

const NOTIFICATION_KEY = 'test:notifications'

export function clearLocalNotifications() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY).then(Notifications.cancelAllScheduledNotificationsAsync)
}


function createNotifications() {
    return {
        title: 'Study Time!',
        body: "Hey, Don't forget to study today!",
        ios: {
            sound: true
        },
        android: {
            sounds: true,
            priority: 'high',
            sticky: false,
            vibrate: true
        }
    }
}


export function setLocalNotification() {
    console.log("herehrer",Permissions.askAsync)
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((date) => {
            if (!date) {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                .then((status) => {
                    console.log("herehrerere",status);
                    if (status === 'granted') {
                        Notifications.cancelAllScheduledNotificationsAsync();

                        let tomorrow = new Date()
                        tomorrow.setDate(tomorrow.getDate() + 1);
                        tomorrow.setHours(20);
                        tomorrow.setMinutes(0);

                        Notifications.scheduleLocalNotificationAsync(
                            createNotifications(),
                            {
                                time: tomorrow,
                                repeat: 'day'
                            }
                        )

                        AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));

                    }
                })
            }
        });
}
