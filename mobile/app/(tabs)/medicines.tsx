import { useCallback, useState } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { supabase } from '../../lib/supabase';
import { api } from '../../lib/api';
import { refreshMedicationReminders } from '../../lib/notifications';
import { Button, Card, Field, Heading, Label, Message, Screen, colors } from '../../components/ui';
export default function Medicines() {
  const [rows,setRows]=useState<any[]>([]); const [name,setName]=useState(''); const [dosage,setDosage]=useState(''); const [unit,setUnit]=useState('mg'); const [frequency,setFrequency]=useState('Daily'); const [time,setTime]=useState('08:00'); const [busy,setBusy]=useState(false);
  const load=useCallback(async()=>{const r=await api<{data:any[]}>('/medications');setRows(r.data||[])},[]);
  useFocusEffect(useCallback(()=>{load().catch(e=>Alert.alert('Load failed',e.message))},[load]));
  async function add() {
    if(!name.trim()) return Alert.alert('Medicine name required');
    setBusy(true);
    try {
      const r=await api<{data:any}>('/medications',{method:'POST',body:JSON.stringify({medication_name:name.trim(),dosage:dosage?Number(dosage):null,dosage_unit:unit,frequency,is_active:true})});
      const {data:{user}}=await supabase.auth.getUser(); if(!user) throw new Error('Please sign in again.');
      const {error}=await supabase.from('medication_schedules').insert({user_id:user.id,medication_id:r.data.id,scheduled_time:time+':00',frequency_type:'daily',days_of_week:[],start_date:new Date().toISOString().slice(0,10),is_active:true});
      if(error) throw error;
      setName('');setDosage(''); await load(); await refreshMedicationReminders();
      Alert.alert('Saved','Medicine and daily reminder schedule have been added.');
    } catch(e:any){Alert.alert('Could not save',e.message)} finally{setBusy(false)}
  }
  async function toggle(row:any){try{await api(`/medications/${row.id}`,{method:'PATCH',body:JSON.stringify({is_active:!row.is_active})});await load();await refreshMedicationReminders()}catch(e:any){Alert.alert('Update failed',e.message)}}
  async function remove(row:any){Alert.alert('Delete medicine',`Delete ${row.medication_name}? Its schedules may also need cleanup.`,[{text:'Cancel',style:'cancel'},{text:'Delete',style:'destructive',onPress:async()=>{try{await api(`/medications/${row.id}`,{method:'DELETE'});await load();await refreshMedicationReminders()}catch(e:any){Alert.alert('Delete failed',e.message)}}}])}
  return <Screen><ScrollView keyboardShouldPersistTaps="handled"><Heading title="Medicines" subtitle="Manage your medication and daily dose reminders."/>
    <Card><Text style={{fontSize:18,fontWeight:'800',color:colors.ink}}>Add a medicine</Text><Label>Medicine name *</Label><Field value={name} onChangeText={setName} placeholder="e.g. Medicine name"/>
      <Label>Dosage</Label><Field value={dosage} onChangeText={setDosage} placeholder="e.g. 500" keyboardType="decimal-pad"/>
      <Label>Dosage unit</Label><Field value={unit} onChangeText={setUnit} placeholder="mg"/>
      <Label>Frequency</Label><Field value={frequency} onChangeText={setFrequency} placeholder="Daily"/>
      <Label>Daily reminder time (24-hour)</Label><Field value={time} onChangeText={setTime} placeholder="08:00"/>
      <Button title={busy?'Saving…':'Save medicine + reminder'} onPress={add} disabled={busy}/>
    </Card>
    <Text style={{fontSize:18,fontWeight:'800',color:colors.ink,marginBottom:10}}>Your medicines</Text>
    {rows.length===0?<Card><Message>No medicines found. Add your first medicine above.</Message></Card>:rows.map(row=><Card key={row.id}>
      <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'flex-start'}}><View style={{flex:1}}><Text style={{fontSize:17,fontWeight:'800',color:colors.ink}}>{row.medication_name}</Text><Text style={{color:colors.muted,marginTop:4}}>{[row.dosage&&row.dosage+' '+(row.dosage_unit||''),row.frequency,row.route].filter(Boolean).join(' · ')||'Dosage details not set'}</Text>{row.instructions?<Text style={{color:colors.muted,marginTop:5}}>{row.instructions}</Text>:null}</View><Text style={{color:row.is_active?colors.green:colors.amber,fontWeight:'800'}}>{row.is_active?'ACTIVE':'PAUSED'}</Text></View>
      <View style={{flexDirection:'row',gap:8}}><View style={{flex:1}}><Button title={row.is_active?'Pause':'Activate'} secondary onPress={()=>toggle(row)}/></View><View style={{flex:1}}><Button title="Delete" secondary onPress={()=>remove(row)}/></View></View>
    </Card>)}
  </ScrollView></Screen>;
}
