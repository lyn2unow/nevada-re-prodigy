
-- Custom modules table
CREATE TABLE public.custom_modules (
  id text PRIMARY KEY,
  week_number integer NOT NULL,
  title text NOT NULL,
  source_tag text NOT NULL DEFAULT 'Lecture Notes',
  data jsonb NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.custom_modules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can select custom_modules"
  ON public.custom_modules FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert custom_modules"
  ON public.custom_modules FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update custom_modules"
  ON public.custom_modules FOR UPDATE TO authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users can delete custom_modules"
  ON public.custom_modules FOR DELETE TO authenticated
  USING (true);

-- Custom exam questions table
CREATE TABLE public.custom_exam_questions (
  id text PRIMARY KEY,
  topic text NOT NULL DEFAULT '',
  difficulty text NOT NULL DEFAULT 'basic',
  source text NOT NULL DEFAULT 'Lecture Notes',
  data jsonb NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.custom_exam_questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can select custom_exam_questions"
  ON public.custom_exam_questions FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert custom_exam_questions"
  ON public.custom_exam_questions FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update custom_exam_questions"
  ON public.custom_exam_questions FOR UPDATE TO authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users can delete custom_exam_questions"
  ON public.custom_exam_questions FOR DELETE TO authenticated
  USING (true);

-- Custom activities table
CREATE TABLE public.custom_activities (
  id text PRIMARY KEY,
  title text NOT NULL DEFAULT '',
  type text NOT NULL DEFAULT 'other',
  data jsonb NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.custom_activities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can select custom_activities"
  ON public.custom_activities FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert custom_activities"
  ON public.custom_activities FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update custom_activities"
  ON public.custom_activities FOR UPDATE TO authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users can delete custom_activities"
  ON public.custom_activities FOR DELETE TO authenticated
  USING (true);

-- Custom practice exams table
CREATE TABLE public.custom_practice_exams (
  id text PRIMARY KEY,
  title text NOT NULL DEFAULT '',
  question_ids jsonb NOT NULL DEFAULT '[]'::jsonb,
  data jsonb NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.custom_practice_exams ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can select custom_practice_exams"
  ON public.custom_practice_exams FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert custom_practice_exams"
  ON public.custom_practice_exams FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update custom_practice_exams"
  ON public.custom_practice_exams FOR UPDATE TO authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users can delete custom_practice_exams"
  ON public.custom_practice_exams FOR DELETE TO authenticated
  USING (true);
