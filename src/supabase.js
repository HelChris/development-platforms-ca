import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const supabaseUrl =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4anBpeWtpaXhweG9pdWlrdmxyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ5MzAxMjIsImV4cCI6MjA4MDUwNjEyMn0.UnoiCVCFlcCdo_qIWw_1gjeAqtzxmH4ViEPDM3WDFQc";
const supabaseKey = "https://gxjpiykiixpxoiuikvlr.supabase.co";

export const supabase = createClient(supabaseUrl, supabaseKey);
