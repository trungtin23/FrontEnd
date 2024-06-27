import React, { useEffect, useState } from 'react';
import Message from './Message';
import MessageInput from './MessageInput';

const Messages = () => {


  return (
      <div className='overflow-auto'>
       <Message  />
          <Message  />
          <Message  />
          <Message  />
      </div>
  );
};

export default Messages;
