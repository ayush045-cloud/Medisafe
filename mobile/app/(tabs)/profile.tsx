import { useCallback, useState } from 'react';
import { Alert, ScrollView, Text } from 'react-native';
import { useFocusEffect, router } from 'expo-router';
import { supabase } from '../../lib/supabase';
import { requestReminderPermission, refreshMedicationReminders } from '../../lib/notifications';
import { Button, Card, Field, Heading, Label, Message, Screen, colors } from '../../components/ui';
export default function Profile(){
 const [email,setEmail]=useState('');const [name,setName]=useState('');const [phone,setPhone]=useState('');const [busy,setBusy]=useState(false);
 const load=useCallback(async()=>{const {data:{user}}=await supabase.auth.getUser();if(!user)return;setEmail(user.email||'');const {data}=await supabase.from('profiles').select('*').eq('id',user.id).maybeSingle();setName(data?.full_name||user.user_metadata?.full_name||'');setPhone(data?.phone||'')},[]);
 useFocusEffect(useCallback(()=>{load().catch(e=>Alert.alert('Load failed',e.message))},[load]));
 async function save(){setBusy(true);try{const {data:{user}}=await supabase.auth.getUser();if(!user)throw new Error('Please sign in again.');const {error}=await supabase.from('profiles').upsert({id:user.id,full_name:name,email:user.email,phone},{onConflict:'id'});if(error)throw error;Alert.alert('Saved','Profile updated.')}catch(e:any){Alert.alert('Save failed',e.message)}finally{setBusy(false)}}
 async function signOut(){await supabase.auth.signOut();router.replace('/login')}
 return <Screen><ScrollView><Heading title="Profile" subtitle="Your Medisafe account and app preferences."/><Card><Text style={{fontSize:18,fontWeight:'800',color:colors.ink}}>Personal information</Text><Label>Email</Label><Field value={email} editable={false}/><Label>Full name</Label><Field value={name} onChangeText={setName} placeholder="Your name"/><Label>Phone</Label><Field value={phone} onChangeText={setPhone} keyboardType="phone-pad" placeholder="Phone number"/><Button title={busy?'Saving…':'Save profile'} onPress={save} disabled={busy}/></Card><Card><Text style={{fontSize:18,fontWeight:'800',color:colors.ink}}>Medication reminders</Text><Message>Allow notifications and refresh the next 30 days of reminders.</Message><Button title="Enable notifications" onPress={async()=>{const ok=await requestReminderPermission();Alert.alert(ok?'Notifications enabled':'Permission needed',ok?'You can receive medication reminders.':'Enable notifications in Android settings.')}}/><Button title="Refresh scheduled reminders" secondary onPress={()=>refreshMedicationReminders().then(()=>Alert.alert('Updated','Upcoming reminders have been refreshed.')).catch(e=>Alert.alert('Could not refresh',e.message))}/></Card><Card><Button title="Sign out" onPress={signOut}/></Card></ScrollView></Screen>;
}
