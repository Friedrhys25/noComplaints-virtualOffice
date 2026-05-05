import { login, register } from '@/app/(auth)/auth-actions';

export default function AuthTestPage() {
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Supabase Auth Test</h1>
      
      <hr style={{ margin: '20px 0' }} />

      {/* REGISTER TEST FORM */}
      <div>
        <h2>1. Test Register</h2>
        <form action={register}>
          <div style={{ marginBottom: '10px' }}>
            <label>Name: </label>
            <input name="name" type="text" required />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Email: </label>
            <input name="email" type="email" required />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Password: </label>
            <input name="password" type="password" required />
          </div>
          <button type="submit" style={{ backgroundColor: 'blue', color: 'white', padding: '10px 20px', cursor: 'pointer' }}>
            Execute Register
          </button>
        </form>
      </div>

      <hr style={{ margin: '20px 0' }} />

      {/* LOGIN TEST FORM */}
      <div>
        <h2>2. Test Login</h2>
        <form action={login}>
          <div style={{ marginBottom: '10px' }}>
            <label>Email: </label>
            <input name="email" type="email" required />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Password: </label>
            <input name="password" type="password" required />
          </div>
          <button type="submit" style={{ backgroundColor: 'green', color: 'white', padding: '10px 20px', cursor: 'pointer' }}>
            Execute Login
          </button>
        </form>
      </div>

    </div>
  );
}