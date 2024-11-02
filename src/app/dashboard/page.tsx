import { HomeTab } from './_components/home/home-tab';
import { UsersTab } from './_components/users/users-tab';

type DashboardPageProps = {
  searchParams: {
    tab: string;
  };
};

const users = [
  {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    isActive: true,
  },
  {
    id: 2,
    name: 'Bob Smith',
    email: 'bob.smith@example.com',
    isActive: false,
  },
  {
    id: 3,
    name: 'Catherine Lee',
    email: 'catherine.lee@example.com',
    isActive: true,
  },
  {
    id: 4,
    name: 'David Brown',
    email: 'david.brown@example.com',
    isActive: true,
  },
  {
    id: 5,
    name: 'Evelyn White',
    email: 'evelyn.white@example.com',
    isActive: false,
  },
];

export default async function DashboardPage({ searchParams }: DashboardPageProps): Promise<JSX.Element> {
  return (
    <>
      {searchParams.tab === 'home' && <HomeTab />}
      {searchParams.tab === 'users' && <UsersTab users={users} />}
      {!searchParams.tab && <HomeTab />}
    </>
  );
}
