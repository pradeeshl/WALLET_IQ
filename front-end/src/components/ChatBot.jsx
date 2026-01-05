import { useEffect } from 'react';
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';

export default function ChatBot() {
	useEffect(() => {
		createChat({
			webhookUrl:'http://localhost:5678/webhook/67e10dfc-52b1-4b15-99c6-cf07f12ee36a/chat'
		});
	}, []);

	return (<div></div>);
};