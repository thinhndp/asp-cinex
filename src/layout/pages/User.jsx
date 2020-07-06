import React from 'react';
import { useStoreState } from 'easy-peasy';

function User() {
  const todos = useStoreState(state => state.todos.items);

  console.log(todos);
  return (
    <div>
      user
    </div>
  )
}

export default User;