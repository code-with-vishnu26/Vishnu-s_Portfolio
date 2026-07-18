
ALTER TABLE public.otp_codes ADD COLUMN IF NOT EXISTS verified_at timestamptz;

CREATE OR REPLACE FUNCTION public.has_completed_otp(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.otp_codes
    WHERE user_id = _user_id
      AND verified = true
      AND verified_at IS NOT NULL
      AND verified_at > now() - interval '12 hours'
  );
$$;

GRANT EXECUTE ON FUNCTION public.has_completed_otp(uuid) TO authenticated;
