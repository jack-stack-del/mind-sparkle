export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      challenge_results: {
        Row: {
          challenge_id: string
          result_id: string
          score: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          challenge_id: string
          result_id?: string
          score?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          challenge_id?: string
          result_id?: string
          score?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "challenge_results_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      cognitive_progress: {
        Row: {
          creativity_score: number | null
          emotional_regulation_score: number | null
          focus_score: number | null
          id: number
          last_updated: string | null
          memory_score: number | null
          problem_solving_score: number | null
          user_id: number | null
        }
        Insert: {
          creativity_score?: number | null
          emotional_regulation_score?: number | null
          focus_score?: number | null
          id?: number
          last_updated?: string | null
          memory_score?: number | null
          problem_solving_score?: number | null
          user_id?: number | null
        }
        Update: {
          creativity_score?: number | null
          emotional_regulation_score?: number | null
          focus_score?: number | null
          id?: number
          last_updated?: string | null
          memory_score?: number | null
          problem_solving_score?: number | null
          user_id?: number | null
        }
        Relationships: []
      }
      daily_challenges: {
        Row: {
          challenge_id: string
          challenge_type: string | null
          completed: boolean | null
          scheduled_date: string | null
          user_id: string
        }
        Insert: {
          challenge_id?: string
          challenge_type?: string | null
          completed?: boolean | null
          scheduled_date?: string | null
          user_id: string
        }
        Update: {
          challenge_id?: string
          challenge_type?: string | null
          completed?: boolean | null
          scheduled_date?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "daily_challenges_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      user_progress: {
        Row: {
          progress_data: Json | null
          progress_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          progress_data?: Json | null
          progress_id?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          progress_data?: Json | null
          progress_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_progress_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      user_settings: {
        Row: {
          difficulty_level: string | null
          notification_preferences: Json | null
          settings_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          difficulty_level?: string | null
          notification_preferences?: Json | null
          settings_id?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          difficulty_level?: string | null
          notification_preferences?: Json | null
          settings_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_settings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      users: {
        Row: {
          auth_user_id: string | null
          created_at: string | null
          email: string
          profile_picture: string | null
          updated_at: string | null
          user_id: string
          username: string
        }
        Insert: {
          auth_user_id?: string | null
          created_at?: string | null
          email: string
          profile_picture?: string | null
          updated_at?: string | null
          user_id?: string
          username: string
        }
        Update: {
          auth_user_id?: string | null
          created_at?: string | null
          email?: string
          profile_picture?: string | null
          updated_at?: string | null
          user_id?: string
          username?: string
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
