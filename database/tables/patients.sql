CREATE TABLE IF NOT EXISTS {schema}.patients (
  patient_id text,
  first_name text,
  last_name text,
  unit text,
  obs_level text,
  precautions text[]
)
