-- Insert Stretches
INSERT INTO stretches (id, name, target_muscles, difficulty, default_duration, instructions, benefits, precautions, image_url)
VALUES
  (
    '00000000-0000-0000-0000-000000000001',
    'Neck Roll',
    ARRAY['Neck', 'Upper Trapezius'],
    'beginner',
    30,
    ARRAY['Sit or stand with a straight spine.', 'Gently drop your chin to your chest.', 'Slowly roll your head to the right, then back, then left.', 'Repeat in the other direction.'],
    'Relieves neck tension and improves mobility.',
    'Avoid if you have cervical spine injuries. Do not force the movement.',
    'https://placehold.co/600x400?text=Neck+Roll'
  ),
  (
    '00000000-0000-0000-0000-000000000002',
    'Shoulder Stretch',
    ARRAY['Shoulders', 'Deltoids'],
    'beginner',
    30,
    ARRAY['Bring your right arm across your chest.', 'Use your left arm to gently pull the right arm closer.', 'Hold and breathe deeply.', 'Repeat on the other side.'],
    'Loosens tight shoulders and improves range of motion.',
    'Keep your shoulders down and relaxed.',
    'https://placehold.co/600x400?text=Shoulder+Stretch'
  ),
  (
    '00000000-0000-0000-0000-000000000003',
    'Cat-Cow Stretch',
    ARRAY['Spine', 'Core', 'Back'],
    'beginner',
    60,
    ARRAY['Start on your hands and knees.', 'Inhale, arch your back and look up (Cow).', 'Exhale, round your spine and tuck your chin (Cat).', 'Repeat slowly with your breath.'],
    'Increases spinal flexibility and relieves back pain.',
    'Use padding for your knees if needed.',
    'https://placehold.co/600x400?text=Cat-Cow'
  ),
  (
    '00000000-0000-0000-0000-000000000004',
    'Hamstring Stretch',
    ARRAY['Hamstrings', 'Lower Back'],
    'beginner',
    45,
    ARRAY['Sit on the floor with one leg extended.', 'Bend the other leg and place the foot against the inner thigh.', 'Reach towards the extended foot.', 'Keep your back straight.'],
    'Lengthens hamstrings and relieves lower back tightness.',
    'Do not bounce. Only go as far as comfortable.',
    'https://placehold.co/600x400?text=Hamstring+Stretch'
  ),
  (
    '00000000-0000-0000-0000-000000000005',
    'Child''s Pose',
    ARRAY['Lower Back', 'Hips', 'Shoulders'],
    'beginner',
    60,
    ARRAY['Kneel on the floor with toes together and knees apart.', 'Sit back on your heels.', 'Reach your arms forward and rest your forehead on the floor.', 'Breathe deeply into your back.'],
    'Restorative pose that gently stretches the back and hips.',
    'Avoid if you have knee injuries.',
    'https://placehold.co/600x400?text=Childs+Pose'
  );

-- Insert Test User
-- Password: "password"
-- Using Supabase's crypt extension to hash the password
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  confirmation_token,
  recovery_token,
  email_change_token_new,
  email_change,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  role,
  aud
)
VALUES (
  '00000000-0000-0000-0000-000000000099',
  '00000000-0000-0000-0000-000000000000',
  'test@test.com',
  crypt('password', gen_salt('bf')),
  NOW(),
  '',
  '',
  '',
  '',
  NOW(),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  false,
  'authenticated',
  'authenticated'
);

-- Insert identity for the test user
INSERT INTO auth.identities (
  id,
  user_id,
  provider_id,
  identity_data,
  provider,
  last_sign_in_at,
  created_at,
  updated_at
)
VALUES (
  '00000000-0000-0000-0000-000000000099',
  '00000000-0000-0000-0000-000000000099',
  '00000000-0000-0000-0000-000000000099',
  '{"sub":"00000000-0000-0000-0000-000000000099","email":"test@test.com"}',
  'email',
  NOW(),
  NOW(),
  NOW()
);

-- Insert Preset Routine
INSERT INTO routines (id, name, description, is_preset, difficulty, total_duration)
VALUES
  (
    '00000000-0000-0000-0000-000000000001',
    'Morning Wake-Up',
    'A gentle routine to energize your body and mind for the day ahead.',
    TRUE,
    'beginner',
    225 -- 30+30+60+45+60
  );

-- Insert Routine Stretches
INSERT INTO routine_stretches (routine_id, stretch_id, duration, repetitions, order_index)
VALUES
  ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 30, 1, 1), -- Neck Roll
  ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000002', 30, 1, 2), -- Shoulder Stretch
  ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000003', 60, 1, 3), -- Cat-Cow
  ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000004', 45, 1, 4), -- Hamstring Stretch
  ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000005', 60, 1, 5); -- Child's Pose
