CREATE TABLE IF NOT EXISTS {schema}.patients (
  patient_id text,
  first_name text,
  last_name text,
  unit text,
  obs_level text,
  precautions text[],
  active boolean,
  updated_date timestamp with time zone,
  created_date timestamp with time zone
);

CREATE UNIQUE INDEX IF NOT EXISTS patient_index ON {schema}.patients (patient_id);
