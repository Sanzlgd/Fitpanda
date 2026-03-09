import { LocalNotifications } from '@capacitor/local-notifications';
import { Capacitor } from '@capacitor/core';

/**
 * Request permission to show local notifications.
 * Should be called when the app starts.
 */
export async function requestNotificationPermissions() {
    if (!Capacitor.isNativePlatform()) return true; // Web doesn't need this for local-only visual alerts usually, but Capacitor handles it

    try {
        const status = await LocalNotifications.checkPermissions();
        if (status.display !== 'granted') {
            const req = await LocalNotifications.requestPermissions();
            return req.display === 'granted';
        }
        return true;
    } catch (e) {
        console.warn('Notification permissions error:', e);
        return false;
    }
}

/**
 * Schedule a repeating notification every day at 8:00 PM.
 * This is the baseline "reminder to log" that gets scheduled once.
 */
export async function scheduleDailyReminder() {
    if (!Capacitor.isNativePlatform()) return;

    try {
        const hasPerm = await requestNotificationPermissions();
        if (!hasPerm) return;

        // Clear existing to avoid duplicates
        await LocalNotifications.cancel({ notifications: [{ id: 100 }] });

        await LocalNotifications.schedule({
            notifications: [
                {
                    title: "FitPanda Reminder 🐼",
                    body: "Don't forget to log your meals and workouts today to stay on track!",
                    id: 100,
                    schedule: {
                        on: {
                            hour: 20, // 8:00 PM
                            minute: 0,
                        },
                        repeats: true, // Repeat every day at 8 PM
                        allowWhileIdle: true,
                    },
                    sound: null, // Default sound
                    actionTypeId: "",
                    extra: null
                }
            ]
        });
        console.log("Daily 8 PM reminder scheduled.");
    } catch (e) {
        console.warn('Failed to schedule reminder:', e);
    }
}

/**
 * Cancel the reminder.
 * We'll use this if the user logs a meal or workout so they aren't bugged.
 * We will then re-schedule a one-off for *tomorrow* at 8PM, or simply leave the repeating one 
 * and let them get it again tomorrow if they forget.
 * For simplicity, we'll cancel today's and schedule tomorrow's.
 */
export async function snoozeReminderToTomorrow() {
    if (!Capacitor.isNativePlatform()) return;

    try {
        // Cancel the repeating one
        await LocalNotifications.cancel({ notifications: [{ id: 100 }] });

        // Calculate tomorrow at 8:00 PM
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(20, 0, 0, 0);

        // Schedule a new one for tomorrow (repeating daily from then on)
        await LocalNotifications.schedule({
            notifications: [
                {
                    title: "FitPanda Reminder 🐼",
                    body: "Don't forget to log your meals and workouts today to stay on track!",
                    id: 100,
                    schedule: {
                        at: tomorrow,
                        repeats: true,
                        every: 'day',
                        allowWhileIdle: true,
                    }
                }
            ]
        });
        console.log("Reminder snoozed to tomorrow at 8 PM.");
    } catch (e) {
        console.warn('Failed to snooze reminder:', e);
    }
}
