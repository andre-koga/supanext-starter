export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      routine_stretches: {
        Row: {
          duration: number
          id: string
          order_index: number
          repetitions: number | null
          routine_id: string | null
          stretch_id: string | null
        }
        Insert: {
          duration: number
          id?: string
          order_index: number
          repetitions?: number | null
          routine_id?: string | null
          stretch_id?: string | null
        }
        Update: {
          duration?: number
          id?: string
          order_index?: number
          repetitions?: number | null
          routine_id?: string | null
          stretch_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "routine_stretches_routine_id_fkey"
            columns: ["routine_id"]
            isOneToOne: false
            referencedRelation: "routines"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "routine_stretches_stretch_id_fkey"
            columns: ["stretch_id"]
            isOneToOne: false
            referencedRelation: "stretches"
            referencedColumns: ["id"]
          },
        ]
      }
      routines: {
        Row: {
          created_at: string | null
          description: string | null
          difficulty: string | null
          id: string
          is_preset: boolean | null
          name: string
          total_duration: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          difficulty?: string | null
          id?: string
          is_preset?: boolean | null
          name: string
          total_duration?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          difficulty?: string | null
          id?: string
          is_preset?: boolean | null
          name?: string
          total_duration?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      sessions: {
        Row: {
          completion_percentage: number | null
          created_at: string | null
          duration: number | null
          end_time: string | null
          id: string
          routine_id: string | null
          routine_name: string
          start_time: string
          user_id: string | null
        }
        Insert: {
          completion_percentage?: number | null
          created_at?: string | null
          duration?: number | null
          end_time?: string | null
          id?: string
          routine_id?: string | null
          routine_name: string
          start_time: string
          user_id?: string | null
        }
        Update: {
          completion_percentage?: number | null
          created_at?: string | null
          duration?: number | null
          end_time?: string | null
          id?: string
          routine_id?: string | null
          routine_name?: string
          start_time?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sessions_routine_id_fkey"
            columns: ["routine_id"]
            isOneToOne: false
            referencedRelation: "routines"
            referencedColumns: ["id"]
          },
        ]
      }
      stretches: {
        Row: {
          benefits: string | null
          created_at: string | null
          default_duration: number
          difficulty: string
          id: string
          image_url: string | null
          instructions: string[]
          name: string
          precautions: string | null
          target_muscles: string[]
          updated_at: string | null
          video_url: string | null
        }
        Insert: {
          benefits?: string | null
          created_at?: string | null
          default_duration: number
          difficulty: string
          id?: string
          image_url?: string | null
          instructions: string[]
          name: string
          precautions?: string | null
          target_muscles: string[]
          updated_at?: string | null
          video_url?: string | null
        }
        Update: {
          benefits?: string | null
          created_at?: string | null
          default_duration?: number
          difficulty?: string
          id?: string
          image_url?: string | null
          instructions?: string[]
          name?: string
          precautions?: string | null
          target_muscles?: string[]
          updated_at?: string | null
          video_url?: string | null
        }
        Relationships: []
      }
      user_settings: {
        Row: {
          created_at: string | null
          notifications_enabled: boolean | null
          reminder_time: string | null
          sound_enabled: boolean | null
          theme: string | null
          transition_duration: number | null
          updated_at: string | null
          user_id: string
          voice_guidance_enabled: boolean | null
        }
        Insert: {
          created_at?: string | null
          notifications_enabled?: boolean | null
          reminder_time?: string | null
          sound_enabled?: boolean | null
          theme?: string | null
          transition_duration?: number | null
          updated_at?: string | null
          user_id: string
          voice_guidance_enabled?: boolean | null
        }
        Update: {
          created_at?: string | null
          notifications_enabled?: boolean | null
          reminder_time?: string | null
          sound_enabled?: boolean | null
          theme?: string | null
          transition_duration?: number | null
          updated_at?: string | null
          user_id?: string
          voice_guidance_enabled?: boolean | null
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
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const

