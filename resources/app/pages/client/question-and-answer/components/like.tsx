import React, { useState } from 'react';
import { likeApi } from './likeApi';

function LikeButton() {
  const [isLiked, setIsLiked] = useState(false);
  const [error, setError] = useState('');

  const handleLike = async () => {
    setIsLiked(true);

    const response = await likeApi();

    if (!response.success) {
      setIsLiked(false);
      setError('Something went wrong');
    }
  };

  return (
    <div>
      <p>{error}</p>
      <button onClick={handleLike}>{isLiked ? 'Đã Thích' : 'Thích'}</button>
    </div>
  );
}

export default LikeButton;
