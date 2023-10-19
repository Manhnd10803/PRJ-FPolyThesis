import { CustomTabs } from '@/components/custom';
import { CreateAsk } from './create-ask';

const tabsConfig = [
  {
    title: 'Ask questions',
    content: <CreateAsk />,
  },
  // {
  //   title: 'Share',
  //   content: ', when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
  // },
  // {
  //   title: 'Q & A',
  //   content:
  //     'xt ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
  // },
];

export const TabsAskQuestion = () => {
  return <CustomTabs tabsConfig={tabsConfig} defaultActiveKey={'Ask questions'} />;
};
