import { getUsers } from '../actions/users/get-users';
import { HomeTab } from './_components/home/home-tab';
import { UsersTab } from './_components/users/users-tab';
import { User } from './_types';

type DashboardPageProps = {
  searchParams: {
    tab: string;
  };
};

export default async function DashboardPage({ searchParams }: DashboardPageProps): Promise<JSX.Element> {
  const { data, error, success } = await getUsers();
  if (searchParams.tab === 'users' && !success) {
    return <div>{error}</div>;
  }
  const users: User[] = data;
  return (
    <>
      {searchParams.tab === 'home' && <HomeTab />}
      {searchParams.tab === 'users' && <UsersTab users={users} />}
      {!searchParams.tab && <HomeTab />}
    </>
  );
}
