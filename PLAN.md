# Stretch & Flex - PWA Specification

## Overview
A minimalist Progressive Web App for stretching and flexibility training that enables users to follow guided routines, track progress, and customize their stretching practice.

---

## Core Features

### 1. Stretch Library
- **Comprehensive Database**: 50+ stretches covering all major muscle groups
  - Upper body (neck, shoulders, arms, chest, back)
  - Core (abs, obliques, lower back)
  - Lower body (hips, glutes, quads, hamstrings, calves, ankles)
- **Stretch Details**: Each stretch includes:
  - Name and target muscle groups
  - Animated illustration or image
  - Step-by-step instructions
  - Duration recommendation (e.g., 30-60 seconds)
  - Difficulty level (Beginner, Intermediate, Advanced)
  - Benefits and precautions
  - Common mistakes to avoid

### 2. Preset Routines
Pre-built routines for common use cases:
- **Morning Wake-Up** (5-10 minutes)
- **Post-Workout Cool Down** (10-15 minutes)
- **Office Break** (5 minutes)
- **Full Body Flexibility** (20-30 minutes)
- **Lower Back Relief** (10 minutes)
- **Hip Opener** (15 minutes)
- **Shoulder & Neck Release** (10 minutes)
- **Pre-Bedtime Relaxation** (10 minutes)

Each routine includes:
- Total duration
- Difficulty level
- Target areas
- Ordered sequence of stretches with hold times

### 3. Custom Routine Builder
- **Drag-and-Drop Interface**: Build routines by selecting stretches from the library
- **Customization Options**:
  - Set hold duration for each stretch (15s, 30s, 45s, 60s, 90s, custom)
  - Set number of repetitions per stretch
  - Add rest periods between stretches
  - Reorder stretches within routine
  - Name and describe custom routines
- **Save & Manage**: Save unlimited custom routines locally
- **Edit & Delete**: Modify or remove saved routines anytime

### 4. Guided Session Player
- **Full-Screen Mode**: Distraction-free stretching experience
- **Visual Timer**: Large, clear countdown timer for each stretch
- **Progress Indicator**: Show current stretch position in routine (e.g., "3 of 12")
- **Auto-Advance**: Automatically move to next stretch when timer completes
- **Controls**:
  - Play/Pause
  - Skip to next stretch
  - Go back to previous stretch
  - Exit session
- **Audio Cues** (optional):
  - Gentle chime when transitioning between stretches
  - Voice guidance for stretch names (optional toggle)
- **Transition Period**: 5-10 second rest between stretches to prepare

### 5. Progress Tracking
- **Session History**: Log every completed session
  - Date and time
  - Routine name
  - Total duration
  - Completion percentage
- **Statistics Dashboard**:
  - Total sessions completed
  - Total time spent stretching
  - Current streak (consecutive days)
  - Longest streak
  - Weekly/monthly activity calendar heatmap
  - Most practiced routines
  - Favorite stretches (most frequently done)

### 6. PWA Features
- **Offline Functionality**: Full app works without internet
- **Install Prompt**: Add to home screen for app-like experience
- **Push Notifications** (optional):
  - Daily stretch reminders
  - Streak maintenance alerts
  - Custom reminder times
- **Responsive Design**: Works on mobile, tablet, and desktop
- **Fast Loading**: Optimized performance with service workers

---

## Technical Architecture

### Technology Stack (Based on Existing SupaNext Starter)
```
Frontend Framework: Next.js 16 with App Router and Turbopack
UI Framework: React 19
Language: TypeScript 5
Styling: Tailwind CSS 3
Component Library: Shadcn UI (already installed)
Icons: Lucide React (already installed)
Backend: Supabase (PostgreSQL, Auth, Realtime, Storage)
State Management: React Context API + Supabase Realtime
Storage: Supabase Database (PostgreSQL) + IndexedDB for offline caching
PWA: Next.js PWA features (already configured with manifest + service worker)
Package Manager: pnpm (monorepo with workspaces)
Development: Docker (for local Supabase)
```

### Existing Infrastructure to Leverage
- ✅ **PWA Setup**: Manifest, service worker, offline page already configured
- ✅ **Authentication**: Supabase Auth with email/OTP flow already implemented
- ✅ **UI Components**: Shadcn UI components (Button, Card, Input, Label, etc.)
- ✅ **Monorepo**: Frontend/backend separation with pnpm workspaces
- ✅ **Local Development**: Supabase running in Docker with smart-start script
- ✅ **TypeScript**: Full type safety with strict mode
- ✅ **Styling System**: Tailwind CSS with design tokens

### Data Models

#### Stretch (TypeScript Interface)
```typescript
interface Stretch {
  id: string;
  name: string;
  target_muscles: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  default_duration: number; // seconds
  instructions: string[];
  benefits: string;
  precautions: string;
  image_url: string;
  video_url?: string;
  created_at: string;
  updated_at: string;
}
```

#### Routine (TypeScript Interface)
```typescript
interface Routine {
  id: string;
  user_id: string; // Supabase Auth user
  name: string;
  description: string;
  is_preset: boolean;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  total_duration: number; // calculated
  created_at: string;
  updated_at: string;
}

interface RoutineStretch {
  id: string;
  routine_id: string;
  stretch_id: string;
  duration: number;
  repetitions: number;
  order: number;
}
```

#### Session (TypeScript Interface)
```typescript
interface Session {
  id: string;
  user_id: string;
  routine_id: string;
  routine_name: string;
  start_time: string;
  end_time: string;
  duration: number;
  completion_percentage: number;
  created_at: string;
}
```

#### UserSettings (TypeScript Interface)
```typescript
interface UserSettings {
  user_id: string; // Primary key, references auth.users
  theme: 'light' | 'dark' | 'auto';
  sound_enabled: boolean;
  voice_guidance_enabled: boolean;
  notifications_enabled: boolean;
  reminder_time?: string;
  transition_duration: number; // seconds between stretches
  created_at: string;
  updated_at: string;
}
```

### Database Schema (Supabase PostgreSQL)

#### Stretches Table
```sql
CREATE TABLE stretches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  target_muscles TEXT[] NOT NULL,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  default_duration INTEGER NOT NULL,
  instructions TEXT[] NOT NULL,
  benefits TEXT,
  precautions TEXT,
  image_url TEXT,
  video_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### Routines Table
```sql
CREATE TABLE routines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  is_preset BOOLEAN DEFAULT FALSE,
  difficulty TEXT CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  total_duration INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE routines ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view preset routines"
  ON routines FOR SELECT
  USING (is_preset = TRUE OR user_id = auth.uid());

CREATE POLICY "Users can manage their own routines"
  ON routines FOR ALL
  USING (user_id = auth.uid());
```

#### Routine Stretches (Junction Table)
```sql
CREATE TABLE routine_stretches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  routine_id UUID REFERENCES routines(id) ON DELETE CASCADE,
  stretch_id UUID REFERENCES stretches(id) ON DELETE CASCADE,
  duration INTEGER NOT NULL,
  repetitions INTEGER DEFAULT 1,
  order_index INTEGER NOT NULL,
  UNIQUE(routine_id, order_index)
);
```

#### Sessions Table
```sql
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  routine_id UUID REFERENCES routines(id) ON DELETE SET NULL,
  routine_name TEXT NOT NULL,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ,
  duration INTEGER,
  completion_percentage INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own sessions"
  ON sessions FOR ALL
  USING (user_id = auth.uid());
```

#### User Settings Table
```sql
CREATE TABLE user_settings (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  theme TEXT DEFAULT 'auto' CHECK (theme IN ('light', 'dark', 'auto')),
  sound_enabled BOOLEAN DEFAULT TRUE,
  voice_guidance_enabled BOOLEAN DEFAULT FALSE,
  notifications_enabled BOOLEAN DEFAULT FALSE,
  reminder_time TIME,
  transition_duration INTEGER DEFAULT 5,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own settings"
  ON user_settings FOR ALL
  USING (user_id = auth.uid());
```

---

## User Interface Design

### Design Principles
- **Minimalist**: Clean, uncluttered interface with ample whitespace
- **Calming Colors**: Soft, muted color palette (blues, greens, neutrals)
- **Large Touch Targets**: Easy to use during stretching sessions
- **Clear Typography**: Readable fonts, appropriate sizing for instructions
- **Smooth Animations**: Gentle transitions, no jarring movements
- **Accessibility**: High contrast, screen reader support, keyboard navigation

### Screen Structure

#### 1. Home/Dashboard
- Welcome message with user's name (optional)
- Quick stats: current streak, total sessions
- "Start Stretching" CTA button
- Quick access to favorite/recent routines
- Navigation to other sections

#### 2. Routines Library
- Tabs: "Preset Routines" | "My Routines"
- Card-based layout showing:
  - Routine name
  - Duration
  - Difficulty badge
  - Number of stretches
  - Preview of first few stretches
- Search/filter by duration, difficulty, target area
- "Create New Routine" button

#### 3. Routine Builder
- Two-panel layout:
  - Left: Stretch library (searchable, filterable)
  - Right: Current routine being built
- Drag stretches from library to routine
- Inline editing of duration and reps
- Save/Cancel buttons
- Preview button to test routine

#### 4. Session Player
- Full-screen immersive mode
- Large central area for:
  - Stretch illustration/animation
  - Stretch name
  - Current instruction step
- Prominent timer (circular progress or large digits)
- Progress bar at top (X of Y stretches)
- Bottom controls (previous, play/pause, next, exit)
- Minimal UI that can be hidden for focus

#### 5. Stretch Library/Browser
- Grid or list view of all stretches
- Filter by muscle group, difficulty
- Search functionality
- Tap to view detailed stretch page
- Option to add directly to quick routine

#### 6. Progress/Stats
- Calendar heatmap showing activity
- Key metrics in cards
- Charts showing trends over time
- Session history list (most recent first)
- Export data option (CSV)

#### 7. Settings
- User preferences
- Notification settings
- App information
- Data management (clear data, export)
- About/credits

---

## User Flows

### First-Time User
1. Land on welcome screen
2. Optional: Quick onboarding (3-4 screens explaining features)
3. Choose a preset routine or explore library
4. Start first session
5. Complete session, see completion celebration
6. Prompted to enable notifications

### Returning User - Quick Session
1. Open app
2. Tap "Continue" on recent routine or "Quick Stretch"
3. Session starts immediately
4. Complete and log

### Creating Custom Routine
1. Navigate to Routines → My Routines
2. Tap "Create New"
3. Name routine
4. Browse/search stretch library
5. Add stretches (drag or tap)
6. Adjust durations and order
7. Save routine
8. Option to start immediately

### Tracking Progress
1. Navigate to Progress tab
2. View stats dashboard
3. Tap on calendar day to see session details
4. Identify trends and improvements

---

## Conclusion

This specification outlines a minimalist PWA for stretching and flexibility that focuses on core functionality: a comprehensive stretch library, preset and custom routines, guided session playback, and progress tracking.

The app leverages your existing **SupaNext** infrastructure (Next.js 16, React 19, TypeScript, Tailwind CSS, Shadcn UI, Supabase) to deliver a clean, user-friendly experience.

Ready to build when you are! 🧘‍♀️
