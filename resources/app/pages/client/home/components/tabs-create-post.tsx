import { CustomTabs } from '@/components/custom';
import { CreateFeed } from './create-feed';

const tabsConfig = [
  {
    title: 'News Feed',
    content: <CreateFeed />,
  },
  {
    title: 'Share',
    content: ', when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
  },
  {
    title: 'Q & A',
    content:
      'xt ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
  },
];

export const TabsCreatePost = () => {
  return <CustomTabs tabsConfig={tabsConfig} defaultActiveKey={'News Feed'} />;
};
