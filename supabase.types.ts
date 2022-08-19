export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      votes: {
        Row: {
          id: string;
          created_at: string;
          feature_id: string;
          user_id: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          feature_id: string;
          user_id?: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          feature_id?: string;
          user_id?: string;
        };
      };
      features: {
        Row: {
          id: string;
          created_at: string;
          title: string;
          upvote_count: number;
        };
        Insert: {
          id?: string;
          created_at?: string;
          title: string;
          upvote_count?: number;
        };
        Update: {
          id?: string;
          created_at?: string;
          title?: string;
          upvote_count?: number;
        };
      };
    };
    Functions: {};
  };
}

