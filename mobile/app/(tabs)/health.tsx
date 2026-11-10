import React, { useCallback, useState } from 'react';
import { Alert, ScrollView, Text } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { api } from '../../lib/api';
import { Button, Card, Field, Heading, Label, Message, Screen, colors } from '../../components/ui';
const fields=[['blood_pressure_systolic','Systolic BP (mmHg)'],['blood_pressure_diastolic','Diastolic BP (mmHg)'],['heart_rate','Heart rate (bpm)'],['blood_glucose','Blood glucose'],['temperature','Temperature (°C)'],['oxygen_saturation','SpO2 (%)'],['weight','Weight (kg)']] as const;
export default function Health() {
 const [values,setValues]=useState<Record<string,string>>({});const [rows,setRows]=useState<any[]>([]);const [busy,setBusy]=useState(false);
 const load=useCallback(async()=>{const r=await api<{data:any[]}>('/vitals');setRows(r.data||[])},[]);
 useFocusEffect(useCallback(()=>{load().catch(e=>Alert.alert('Load failed',e.message))},[load]));
 async function save(){const body:any={};for(const [k] of fields)if(values[k]?.trim())body[k]=Number(values[k]);if(!Object.keys(body).length)return Alert.alert('Enter a reading','Add at least one health value.');setBusy(true);try{await api('/vitals',{method:'POST',body:JSON.stringify(body)});setValues({});await load();Alert.alert('Saved','Your health reading has been saved.')}catch(e:any){Alert.alert('Save failed',e.message)}finally{setBusy(false)}}
 async function remove(id:string){try{await api('/vitals/'+id,{method:'DELETE'});await load()}catch(e:any){Alert.alert('Delete failed',e.message)}}
 return <Screen><ScrollView keyboardShouldPersistTaps="handled"><Heading title="Health records" subtitle="Record and review your health measurements."/><Card><Text style={{fontSize:18,fontWeight:'800',color:colors.ink}}>Add health reading</Text>{fields.map(([key,label])=><ReactField key={key} label={label} value={values[key]||''} onChangeText={v=>setValues(p=>({...p,[key]:v}))}/>)}<Button title={busy?'Saving…':'Save reading'} onPress={save} disabled={busy}/></Card><Text style={{fontSize:18,fontWeight:'800',color:colors.ink,marginBottom:10}}>Recent readings</Text>{rows.length===0?<Card><Message>No readings recorded yet.</Message></Card>:rows.map(r=><Card key={r.id}><Text style={{fontWeight:'800',color:colors.ink}}>{new Date(r.recorded_at).toLocaleString()}</Text><Text style={{color:colors.muted,marginTop:6}}>{fields.filter(([k])=>r[k]!=null).map(([k,label])=>label.split(' (')[0]+': '+r[k]).join(' · ')}</Text><Button title="Delete reading" secondary onPress={()=>remove(r.id)}/></Card>)}</ScrollView></Screen>;
}
function ReactField({label,...props}:{label:string;value:string;onChangeText:(v:string)=>void}){return <><Label>{label}</Label><Field {...props} keyboardType="decimal-pad" placeholder="Optional"/></>}
