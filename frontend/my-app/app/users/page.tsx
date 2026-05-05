import UsersManagement from "../components/users/UsersManagement";

const mockUsers = [
  { id: "u-001", full_name: "Alex Johnson", email: "alex.johnson@virtualoffice.com", department: "hr", role: "manager", created_at: "2026-01-08T09:15:00.000Z", employee_code: "VO-1001", phone: "+65 8123 7781", location: "Singapore" },
  { id: "u-002", full_name: "Mira Chen", email: "mira.chen@virtualoffice.com", department: "solutions", role: "employee", created_at: "2026-01-12T10:45:00.000Z", employee_code: "VO-1002", phone: "+65 8342 1124", location: "Kuala Lumpur" },
  { id: "u-003", full_name: "Ethan Brooks", email: "ethan.brooks@virtualoffice.com", department: "accounting", role: "user", created_at: "2026-01-20T14:30:00.000Z", employee_code: "VO-1003", phone: "+65 9231 6512", location: "Manila" },
  { id: "u-004", full_name: "Sofia Ramirez", email: "sofia.ramirez@virtualoffice.com", department: "hr", role: "employee", created_at: "2026-02-01T08:20:00.000Z", employee_code: "VO-1004", phone: "+65 9452 1894", location: "Jakarta" },
  { id: "u-005", full_name: "Daniel Wu", email: "daniel.wu@virtualoffice.com", department: "solutions", role: "manager", created_at: "2026-02-10T11:05:00.000Z", employee_code: "VO-1005", phone: "+65 9784 0091", location: "Singapore" },
  { id: "u-006", full_name: "Nadia Lim", email: "nadia.lim@virtualoffice.com", department: "accounting", role: "employee", created_at: "2026-02-16T07:50:00.000Z", employee_code: "VO-1006", phone: "+65 9008 7122", location: "Bangkok" },
  { id: "u-007", full_name: "Marcus Lee", email: "marcus.lee@virtualoffice.com", department: "solutions", role: "user", created_at: "2026-02-21T15:10:00.000Z", employee_code: "VO-1007", phone: "+65 8660 5521", location: "Ho Chi Minh City" },
  { id: "u-008", full_name: "Priya Nair", email: "priya.nair@virtualoffice.com", department: "hr", role: "user", created_at: "2026-03-02T13:40:00.000Z", employee_code: "VO-1008", phone: "+65 8455 1172", location: "Singapore" },
  { id: "u-009", full_name: "Oliver Tan", email: "oliver.tan@virtualoffice.com", department: "accounting", role: "manager", created_at: "2026-03-10T09:00:00.000Z", employee_code: "VO-1009", phone: "+65 8771 6118", location: "Singapore" },
  { id: "u-010", full_name: "Grace Kim", email: "grace.kim@virtualoffice.com", department: "solutions", role: "employee", created_at: "2026-03-14T16:25:00.000Z", employee_code: "VO-1010", phone: "+65 8882 1050", location: "Seoul" },
  { id: "u-011", full_name: "Hannah Goh", email: "hannah.goh@virtualoffice.com", department: "hr", role: "manager", created_at: "2026-03-21T12:15:00.000Z", employee_code: "VO-1011", phone: "+65 8542 9810", location: "Singapore" },
  { id: "u-012", full_name: "Leo Santos", email: "leo.santos@virtualoffice.com", department: "accounting", role: "user", created_at: "2026-04-01T10:10:00.000Z", employee_code: "VO-1012", phone: "+65 9120 4340", location: "Cebu" },
];

export default function UsersPage() {
  return (
    <UsersManagement
      initialUsers={mockUsers}
      initialError={null}
    />
  );
}
