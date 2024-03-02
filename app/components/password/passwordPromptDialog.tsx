"use client";

import React, { useState } from 'react';

const PasswordPromptDialog = ({}) => {
    /************** Style classNames ***************/
    const styles: any = {
      passwordPromptDialog: [
        'w-full h-svh-screen min-h-[600px]',
        'flex flex-col justify-end',
      ].join(' '),
    }

  const [password, setPassword] = useState('');
  const [passwordIncorrect, setPasswordIncorrect] = useState(false)
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    const onSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);

      const request = await fetch(`/api`, {
        body: JSON.stringify({password}),
        headers: {"Content-Type": "application/json"},
        method: "post",
      });

      if (request.status !== 200) 
        return setPasswordIncorrect(true), setLoading(false);
      else window.location.reload();

    };
  }

  return (
    <div className={styles.passwordPromptDialog}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default PasswordPromptDialog;