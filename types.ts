export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.15"
  }
  public: {
    Tables: {
      alerts: {
        Row: {
          alert_type: string
          created_at: string
          id: string
          is_read: boolean
          medication_id: string | null
          message: string
          severity: string
          user_id: string
        }
        Insert: {
          alert_type: string
          created_at?: string
          id?: string
          is_read?: boolean
          medication_id?: string | null
          message: string
          severity?: string
          user_id: string
        }
        Update: {
          alert_type?: string
          created_at?: string
          id?: string
          is_read?: boolean
          medication_id?: string | null
          message?: string
          severity?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "alerts_medication_id_fkey"
            columns: ["medication_id"]
            isOneToOne: false
            referencedRelation: "medications"
            referencedColumns: ["id"]
          },
        ]
      }
      medication_logs: {
        Row: {
          created_at: string
          id: string
          medication_id: string
          notes: string | null
          schedule_id: string | null
          scheduled_at: string
          status: string
          taken_at: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          medication_id: string
          notes?: string | null
          schedule_id?: string | null
          scheduled_at: string
          status?: string
          taken_at?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          medication_id?: string
          notes?: string | null
          schedule_id?: string | null
          scheduled_at?: string
          status?: string
          taken_at?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "medication_logs_medication_id_fkey"
            columns: ["medication_id"]
            isOneToOne: false
            referencedRelation: "medications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "medication_logs_schedule_id_fkey"
            columns: ["schedule_id"]
            isOneToOne: false
            referencedRelation: "medication_schedules"
            referencedColumns: ["id"]
          },
        ]
      }
      medication_schedules: {
        Row: {
          created_at: string
          days_of_week: number[]
          end_date: string | null
          frequency_type: string
          id: string
          is_active: boolean
          medication_id: string
          scheduled_time: string
          start_date: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          days_of_week?: number[]
          end_date?: string | null
          frequency_type?: string
          id?: string
          is_active?: boolean
          medication_id: string
          scheduled_time: string
          start_date?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          days_of_week?: number[]
          end_date?: string | null
          frequency_type?: string
          id?: string
          is_active?: boolean
          medication_id?: string
          scheduled_time?: string
          start_date?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "medication_schedules_medication_id_fkey"
            columns: ["medication_id"]
            isOneToOne: false
            referencedRelation: "medications"
            referencedColumns: ["id"]
          },
        ]
      }
      medications: {
        Row: {
          created_at: string
          dosage: number | null
          dosage_unit: string | null
          end_date: string | null
          frequency: string | null
          generic_name: string | null
          id: string
          instructions: string | null
          is_active: boolean
          medication_name: string
          notes: string | null
          prescribed_by: string | null
          route: string | null
          start_date: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          dosage?: number | null
          dosage_unit?: string | null
          end_date?: string | null
          frequency?: string | null
          generic_name?: string | null
          id?: string
          instructions?: string | null
          is_active?: boolean
          medication_name: string
          notes?: string | null
          prescribed_by?: string | null
          route?: string | null
          start_date?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          dosage?: number | null
          dosage_unit?: string | null
          end_date?: string | null
          frequency?: string | null
          generic_name?: string | null
          id?: string
          instructions?: string | null
          is_active?: boolean
          medication_name?: string
          notes?: string | null
          prescribed_by?: string | null
          route?: string | null
          start_date?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      notification_preferences: {
        Row: {
          browser_enabled: boolean
          created_at: string
          email_enabled: boolean
          id: string
          reminder_minutes_before: number
          updated_at: string
          user_id: string
        }
        Insert: {
          browser_enabled?: boolean
          created_at?: string
          email_enabled?: boolean
          id?: string
          reminder_minutes_before?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          browser_enabled?: boolean
          created_at?: string
          email_enabled?: boolean
          id?: string
          reminder_minutes_before?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      prescriptions: {
        Row: {
          created_at: string
          diagnosis: string | null
          doctor_name: string | null
          document_path: string | null
          hospital_name: string | null
          id: string
          notes: string | null
          prescription_date: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          diagnosis?: string | null
          doctor_name?: string | null
          document_path?: string | null
          hospital_name?: string | null
          id?: string
          notes?: string | null
          prescription_date?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          diagnosis?: string | null
          doctor_name?: string | null
          document_path?: string | null
          hospital_name?: string | null
          id?: string
          notes?: string | null
          prescription_date?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          date_of_birth: string | null
          email: string | null
          full_name: string
          gender: string | null
          id: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          date_of_birth?: string | null
          email?: string | null
          full_name?: string
          gender?: string | null
          id: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          date_of_birth?: string | null
          email?: string | null
          full_name?: string
          gender?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      vital_logs: {
        Row: {
          blood_glucose: number | null
          blood_pressure_diastolic: number | null
          blood_pressure_systolic: number | null
          created_at: string
          heart_rate: number | null
          id: string
          notes: string | null
          oxygen_saturation: number | null
          recorded_at: string
          temperature: number | null
          updated_at: string
          user_id: string
          weight: number | null
        }
        Insert: {
          blood_glucose?: number | null
          blood_pressure_diastolic?: number | null
          blood_pressure_systolic?: number | null
          created_at?: string
          heart_rate?: number | null
          id?: string
          notes?: string | null
          oxygen_saturation?: number | null
          recorded_at?: string
          temperature?: number | null
          updated_at?: string
          user_id: string
          weight?: number | null
        }
        Update: {
          blood_glucose?: number | null
          blood_pressure_diastolic?: number | null
          blood_pressure_systolic?: number | null
          created_at?: string
          heart_rate?: number | null
          id?: string
          notes?: string | null
          oxygen_saturation?: number | null
          recorded_at?: string
          temperature?: number | null
          updated_at?: string
          user_id?: string
          weight?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
