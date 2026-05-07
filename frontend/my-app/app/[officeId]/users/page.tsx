import UsersManagement from "@/app/components/users/UsersManagement";

const mockUsers = [
  { id: "u-001", full_name: "Alex Johnson", email: "alex.johnson@virtualoffice.com", department: "hr", role: "manager", created_at: "2026-01-08T09:15:00.000Z", employee_code: "VO-1001", phone: "+65 8123 7781", location: "Singapore" },
];

export default function OfficeUsersPage() {
  return <UsersManagement initialUsers={mockUsers} initialError={null} />;
}

