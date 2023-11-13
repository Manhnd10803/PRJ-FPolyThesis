import ItemUserChat from './item-user-chat';
import diacritics from 'diacritics';

export const ListUserChat = ({ data, search }) => {
  const normalizedSearch = diacritics.remove(search.toLowerCase());

  const filteredUsers = search
    ? data.filter(item => diacritics.remove(item.username.toLowerCase()).includes(normalizedSearch))
    : data;

  return (
    <>{filteredUsers?.map((item, index) => <ItemUserChat item={item} index={index} search={search} key={index} />)}</>
  );
};
