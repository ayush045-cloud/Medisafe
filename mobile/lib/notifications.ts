import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { supabase } from './supabase';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true, shouldPlaySound: true, shouldSetBadge: false,
    shouldShowBanner: true, shouldShowList: true,
  }),
});

export async function requestReminderPermission() {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('medication-reminders', {
      name: 'Medication reminders', importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250], sound: 'default',
    });
  }
  const current = await Notifications.getPermissionsAsync();
  if (current.granted) return true;
  const requested = await Notifications.requestPermissionsAsync();
  return requested.granted;
}

/** Schedule the next 30 days from the shared Supabase schedules. Re-run after login,
 * schedule edits, and app launch. Android may defer alarms under battery restrictions. */
export async function refreshMedicationReminders() {
  const allowed = await requestReminderPermission();
  if (!allowed) return;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;
  const { data: schedules, error } = await supabase.from('medication_schedules')
    .select('id, medication_id, scheduled_time, frequency_type, days_of_week, start_date, end_date, medications(medication_name)')
    .eq('user_id', user.id).eq('is_active', true);
  if (error) throw error;
  const existing = await Notifications.getAllScheduledNotificationsAsync();
  await Promise.all(existing.filter(n => n.content.data?.source === 'medisafe').map(n => Notifications.cancelScheduledNotificationAsync(n.identifier)));
  const now = new Date();
  const end = new Date(now); end.setDate(end.getDate() + 30);
  for (const schedule of schedules || []) {
    const med = Array.isArray(schedule.medications) ? schedule.medications[0] : schedule.medications;
    const [hour, minute] = schedule.scheduled_time.split(':').map(Number);
    for (let day = new Date(now); day <= end; day.setDate(day.getDate() + 1)) {
      const date = new Date(day); date.setHours(hour || 0, minute || 0, 0, 0);
      const iso = date.toISOString().slice(0, 10);
      const weekday = date.getDay();
      if (date <= now || iso < schedule.start_date || (schedule.end_date && iso > schedule.end_date)) continue;
      if (schedule.frequency_type === 'weekly' && !(schedule.days_of_week || []).includes(weekday)) continue;
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Time for your medicine',
          body: `Please check your schedule for ${med?.medication_name || 'your medication'}.`,
          sound: 'default', data: { source: 'medisafe', scheduleId: schedule.id, medicationId: schedule.medication_id },
        },
        trigger: { type: Notifications.SchedulableTriggerInputTypes.DATE, date },
      });
    }
  }
}
