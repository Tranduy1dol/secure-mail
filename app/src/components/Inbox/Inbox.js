// Inbox.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Inbox.css';

function Inbox() {
    const [emails, setEmails] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/emails')
            .then(response => {
                setEmails(response.data);
            });
    }, []);

    return (
        <div>
            {emails.map(email => (
                <div key={email.id}>
                    <h2>{email.subject}</h2>
                    <p>{email.body}</p>
                </div>
            ))}
        </div>
    );
}

export default Inbox;