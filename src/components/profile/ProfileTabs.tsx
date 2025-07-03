import clsx from 'clsx';
import Link from 'next/link';

const tabs = [
  {
    id: 1,
    text: 'Reviews',
    tabName: 'reviews',
  },
  {
    id: 2,
    text: 'Movies Watched',
    tabName: 'movies',
  },
  {
    id: 3,
    text: 'Series Watched',
    tabName: 'series',
  },
  {
    id: 4,
    text: 'Achievements',
    tabName: 'achievements',
  },
];

export default function ProfileTabs({
  currentTab,
  userId,
}: {
  currentTab: string;
  userId: string;
}) {
  return (
    <div className="space-y-5">
      <div className="flex justify-between md:justify-start md:space-x-10">
        {tabs.map(tab => (
          <Link href={`/profile/${userId}/${tab.tabName}`}>
            <div
              key={`tab_name_${tab.tabName}-${tab.id}`}
              className={clsx(
                'uppercase font-semibold text-sm md:text-xl  cursor-pointer pb-1 border-orange-400',
                currentTab === tab.tabName
                  ? 'text-white border-b-2'
                  : 'hover:border-b-2 text-gray-400 hover:text-white'
              )}
            >
              {tab.text}
            </div>
          </Link>
        ))}
      </div>
      <hr className="border-gray-600" />
    </div>
  );
}
