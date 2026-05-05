import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import TableViewer from "./TableViewer";

const tables = [
  "users",
  "offices",
  "rooms",
  "memberships",
  "meetings",
  "sessions",
  "session_participants",
  "transcripts",
];

export default async function TestSupabasePage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  // default table
  const { data, error } = await supabase
    .from("users")
    .select("*");

  return (
    <TableViewer
      tables={tables}
      initialTable="users"
      initialData={data || []}
      initialError={error?.message || null}
    />
  );
}