import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
import { supabase } from '../lib/supabase';
import { Button, Card, Field, Heading, Label, Screen, colors } from '../components/ui';
export default function Login() {
  const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [name, setName] = useState('');
  const [mode, setMode] = useState<'login'|'signup'>('login'); const [busy, setBusy] = useState(false);
  async function submit() {
    if (!email.trim() || !password) return Alert.alert('Missing details', 'Enter your email and password.');
    setBusy(true);
    try {
      const result = mode === 'login'
        ? await supabase.auth.signInWithPassword({ email: email.trim(), password })
        : await supabase.auth.signUp({ email: email.trim(), password, options: { data: { full_name: name.trim() } } });
      if (result.error) throw result.error;
      if (mode === 'signup' && !result.data.session) Alert.alert('Check your email', 'Confirm your email address, then sign in.');
    } catch (e) { Alert.alert('Authentication failed', e instanceof Error ? e.message : 'Please try again.'); }
    finally { setBusy(false); }
  }
  return <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#F6F9F7' }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 24 }}>
      <View style={{ marginBottom: 24 }}><Text style={{ color: colors.green, fontWeight: '900', letterSpacing: 2 }}>MEDISAFE</Text><Heading title="Your health, organised." subtitle="One place for medicines, prescriptions and health records." /></View>
      <Card>
        <Text style={{ fontSize: 21, fontWeight: '800', color: colors.ink }}>{mode === 'login' ? 'Welcome back' : 'Create your account'}</Text>
        {mode === 'signup' && <><Label>Full name</Label><Field value={name} onChangeText={setName} placeholder="Your name" autoCapitalize="words" /></>}
        <Label>Email address</Label><Field value={email} onChangeText={setEmail} placeholder="you@example.com" keyboardType="email-address" autoCapitalize="none" />
        <Label>Password</Label><Field value={password} onChangeText={setPassword} placeholder="Your password" secureTextEntry />
        <Button title={busy ? 'Please wait…' : mode === 'login' ? 'Sign in' : 'Create account'} onPress={submit} disabled={busy} />
        <Button title={mode === 'login' ? 'New to Medisafe? Create account' : 'Already registered? Sign in'} secondary onPress={() => setMode(mode === 'login' ? 'signup' : 'login')} />
      </Card>
      <Text style={{ color: colors.muted, textAlign: 'center', marginTop: 18, fontSize: 12 }}>Use the same account as your Medisafe website.</Text>
    </ScrollView>
  </KeyboardAvoidingView>;
}
