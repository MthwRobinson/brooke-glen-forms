CREATE TABLE IF NOT EXISTS {schema}.patient_views (
  view_id text,
  user_id text,
  patient_id text,
  time_viewed timestamp with time zone
);
