import { useEffect, useState } from 'react';
import { Redirect } from 'expo-router';
import { supabase } from '../lib/supabase';
import { Busy } from '../components/ui';
export default function Index() {
  const [ready, setReady] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => { setSignedIn(!!data.session); setReady(true); });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => setSignedIn(!!session));
    return () => listener.subscription.unsubscribe();
  }, []);
  if (!ready) return <Busy />;
  return <Redirect href={signedIn ? '/(tabs)' : '/login'} />;
}
