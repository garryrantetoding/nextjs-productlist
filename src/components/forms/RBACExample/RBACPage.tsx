// src/app/brother/page.tsx
// add in each page/form component
import { cookies } from 'next/headers'; // To access cookies
import { getUserFromToken } from '@/lib/auth';
import { redirect } from 'next/navigation'; // To handle redirects
import { getAccessTokenFromCookies } from '@/data/services/token/get-token';
import { ensureValidAccessToken } from '@/data/services/token-handler';
// const BrotherPage = () => {
//   const cookieStore = cookies();
//   const token = cookieStore.get('accessToken')?.value;

  const BrotherPage = async () => {
    const token = await getAccessTokenFromCookies();
    // const token = await ensureValidAccessToken();

  if (!token) {
    redirect('/unauthorized'); // Redirect to unauthorized if no token
  }

  const user = getUserFromToken(token);

  if (!user || user.roles !== 'Owner') {
    redirect('/unauthorized'); // Redirect to unauthorized if role is not 'Owner'
  }

  return (
    <div>
      <h1>Welcome to the Brother page</h1>
      <p>This is a protected page for users with the "Owner" role.</p>
    </div>
  );
};

export default BrotherPage;
