import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View, type TextInputProps, type ViewProps } from 'react-native';

export const colors = { ink: '#172B28', muted: '#71817D', green: '#167C68', pale: '#EAF5F1', line: '#E2EAE7', white: '#FFFFFF', red: '#B54747', amber: '#A66A16' };
export function Screen({ children, ...props }: ViewProps) { return <View style={[styles.screen, props.style]}>{children}</View>; }
export function Heading({ title, subtitle }: { title: string; subtitle?: string }) { return <View style={{ marginBottom: 20 }}><Text style={styles.heading}>{title}</Text>{!!subtitle && <Text style={styles.sub}>{subtitle}</Text>}</View>; }
export function Card({ children, style }: ViewProps) { return <View style={[styles.card, style]}>{children}</View>; }
export function Label({ children }: { children: React.ReactNode }) { return <Text style={styles.label}>{children}</Text>; }
export function Field(props: TextInputProps) { return <TextInput placeholderTextColor="#9AA8A3" {...props} style={[styles.input, props.style]} />; }
export function Button({ title, onPress, secondary, disabled }: { title: string; onPress: () => void; secondary?: boolean; disabled?: boolean }) {
  return <Pressable disabled={disabled} onPress={onPress} style={[styles.button, secondary && styles.secondary, disabled && { opacity: .55 }]}><Text style={[styles.buttonText, secondary && { color: colors.green }]}>{title}</Text></Pressable>;
}
export function Busy() { return <ActivityIndicator color={colors.green} style={{ margin: 24 }} />; }
export function Message({ children, error }: { children: React.ReactNode; error?: boolean }) { return <Text style={{ color: error ? colors.red : colors.muted, marginVertical: 10 }}>{children}</Text>; }
export const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F6F9F7', padding: 20 },
  heading: { color: colors.ink, fontSize: 27, fontWeight: '800', letterSpacing: -.6 },
  sub: { color: colors.muted, fontSize: 14, marginTop: 5, lineHeight: 20 },
  card: { backgroundColor: colors.white, borderColor: colors.line, borderWidth: 1, borderRadius: 18, padding: 16, marginBottom: 12 },
  label: { color: colors.ink, fontWeight: '700', fontSize: 13, marginBottom: 7, marginTop: 10 },
  input: { borderWidth: 1, borderColor: colors.line, borderRadius: 12, backgroundColor: colors.white, paddingHorizontal: 14, paddingVertical: 12, color: colors.ink, fontSize: 15 },
  button: { backgroundColor: colors.green, borderRadius: 12, padding: 14, alignItems: 'center', marginTop: 12 },
  secondary: { backgroundColor: colors.pale, borderWidth: 1, borderColor: '#CDE4DA' },
  buttonText: { color: colors.white, fontWeight: '800', fontSize: 15 },
});
