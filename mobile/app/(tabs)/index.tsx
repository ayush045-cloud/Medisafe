import { useCallback, useEffect, useState } from 'react';
import { Alert, RefreshControl, ScrollView, Text, View } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { supabase } from '../../lib/supabase';
import { refreshMedicationReminders } from '../../lib/notifications';
import { Card, Heading, Message, Screen, colors } from '../../components/ui';
export default function Dashboard() {
  const [name, setName] = useState('there'); const [meds, setMeds] = useState<any[]>([]); const [logs, setLogs] = useState<any[]>([]); const [alerts, setAlerts] = useState<any[]>([]); const [refreshing, setRefreshing] = useState(false);
  const load = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser(); if (!user) return;
    setName(user.user_metadata?.full_name || user.email?.split('@')[0] || 'there');
    const [m, l, a] = await Promise.all([
      supabase.from('medications').select('*').eq('user_id', user.id).eq('is_active', true).order('created_at', { ascending: false }),
      supabase.from('medication_logs').select('*, medications(medication_name)').eq('user_id', user.id).order('scheduled_at', { ascending: true }).limit(20),
      supabase.from('alerts').select('*').eq('user_id', user.id).eq('is_read', false).order('created_at', { ascending: false }).limit(5),
    ]);
    if (m.error) throw m.error; if (l.error) throw l.error; if (a.error) throw a.error;
    setMeds(m.data || []); setLogs(l.data || []); setAlerts(a.data || []);
    await refreshMedicationReminders();
  }, []);
  useFocusEffect(useCallback(() => { load().catch(e => Alert.alert('Could not load dashboard', e.message)); }, [load]));
  return <Screen><ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={async()=>{setRefreshing(true);try{await load()}catch(e:any){Alert.alert('Refresh failed',e.message)}finally{setRefreshing(false)}}} />} showsVerticalScrollIndicator={false}>
    <Text style={{ color: colors.green, fontWeight: '900', letterSpacing: 1.5, marginTop: 10 }}>MEDISAFE</Text>
    <Heading title={`Good day, ${name}.`} subtitle="Here is your health overview." />
    <View style={{ flexDirection: 'row', gap: 10 }}>
      <Card style={{ flex: 1 }}><Text style={{ color: colors.muted }}>Active medicines</Text><Text style={{ fontSize: 30, fontWeight: '900', color: colors.ink }}>{meds.length}</Text></Card>
      <Card style={{ flex: 1 }}><Text style={{ color: colors.muted }}>Unread alerts</Text><Text style={{ fontSize: 30, fontWeight: '900', color: colors.ink }}>{alerts.length}</Text></Card>
    </View>
    <Text style={{ fontSize: 18, fontWeight: '800', color: colors.ink, marginVertical: 10 }}>Today's medication activity</Text>
    {logs.length === 0 ? <Card><Message>No dose activity is recorded yet. Add a medicine schedule to get started.</Message></Card> : logs.map((item) => <Card key={item.id}><Text style={{ fontWeight: '800', color: colors.ink }}>{item.medications?.medication_name || 'Medication'}</Text><Text style={{ color: colors.muted, marginTop: 5 }}>{new Date(item.scheduled_at).toLocaleString()} · {item.status}</Text></Card>)}
    <Text style={{ fontSize: 18, fontWeight: '800', color: colors.ink, marginVertical: 10 }}>Recent alerts</Text>
    {alerts.length === 0 ? <Card><Message>You are all caught up.</Message></Card> : alerts.map(a => <Card key={a.id}><Text style={{ fontWeight: '700', color: colors.ink }}>{a.message}</Text><Text style={{ color: colors.muted, marginTop: 5 }}>{a.severity} · {new Date(a.created_at).toLocaleString()}</Text></Card>)}
  </ScrollView></Screen>;
}
