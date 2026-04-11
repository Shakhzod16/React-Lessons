import { useEffect, useMemo, useRef, useState } from 'react';
import { onAuthStateChanged, signOut, type User as FirebaseUser } from 'firebase/auth';
import { limitToLast, onValue, push, query, ref, set, update } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import { auth, realDB } from '../firebase/firebase';
import './Chat.css';

type ChatMessage = {
	id: string;
	text: string;
	uid: string;
	name: string;
	photoURL: string;
	createdAt: number;
	updatedAt?: number;
};

function Chat() {
	const navigate = useNavigate();
	const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
	const [loadingAuth, setLoadingAuth] = useState(true);
	const [messages, setMessages] = useState<ChatMessage[]>([]);
	const [messageText, setMessageText] = useState('');
	const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
	const [sending, setSending] = useState(false);
	const bottomRef = useRef<HTMLDivElement | null>(null);
	const inputRef = useRef<HTMLInputElement | null>(null);

	const messagesQuery = useMemo(() => query(ref(realDB, 'chat/messages'), limitToLast(100)), []);

	const getUserName = (user: FirebaseUser | null) => {
		if (!user) return 'User';
		if (user.displayName && user.displayName.trim().length > 0) return user.displayName;
		if (user.email) return user.email.split('@')[0];
		return 'User';
	};

	const getUserPhoto = (user: FirebaseUser | null) => {
		if (!user || !user.photoURL) return '';
		return user.photoURL;
	};

	const getFirstLetter = (name: string) => {
		if (!name) return 'U';
		return name.trim().charAt(0).toUpperCase() || 'U';
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, user => {
			setCurrentUser(user);
			setLoadingAuth(false);
			if (!user) {
				navigate('/login');
			}
		});

		return () => unsubscribe();
	}, [navigate]);

	useEffect(() => {
		const unsubscribe = onValue(messagesQuery, snapshot => {
			const data = snapshot.val() as Record<string, any> | null;
			if (!data) {
				setMessages([]);
				return;
			}

			const list = Object.entries(data)
				.map(([id, value]) => ({
					id,
					text: String(value.text ?? ''),
					uid: String(value.uid ?? ''),
					name: String(value.name ?? (value.email ? String(value.email).split('@')[0] : 'User')),
					photoURL: String(value.photoURL ?? ''),
					createdAt: Number(value.createdAt ?? 0),
					updatedAt: value.updatedAt ? Number(value.updatedAt) : undefined,
				}))
				.sort((a, b) => a.createdAt - b.createdAt);

			setMessages(list);
		});

		return () => unsubscribe();
	}, [messagesQuery]);

	useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messages]);

	const handleStartEdit = (message: ChatMessage) => {
		if (message.uid !== currentUser?.uid) return;
		setEditingMessageId(message.id);
		setMessageText(message.text);
		setTimeout(() => {
			inputRef.current?.focus();
		}, 0);
	};

	const handleCancelEdit = () => {
		setEditingMessageId(null);
		setMessageText('');
		inputRef.current?.focus();
	};

	const handleSend = async () => {
		const trimmed = messageText.trim();
		if (!trimmed || !currentUser) return;

		setSending(true);
		try {
			if (editingMessageId) {
				await update(ref(realDB, `chat/messages/${editingMessageId}`), {
					text: trimmed,
					updatedAt: Date.now(),
				});
			} else {
				const newMessageRef = push(ref(realDB, 'chat/messages'));
				await set(newMessageRef, {
					text: trimmed,
					uid: currentUser.uid,
					name: getUserName(currentUser),
					photoURL: getUserPhoto(currentUser),
					createdAt: Date.now(),
				});
			}
			setMessageText('');
			setEditingMessageId(null);
		} catch (error) {
			console.log(error);
			alert('Message send failed');
		} finally {
			setSending(false);
		}
	};

	const handleLogout = async () => {
		try {
			await signOut(auth);
			navigate('/login');
		} catch (error) {
			console.log(error);
		}
	};

	if (loadingAuth) {
		return (
			<div className='chat-page'>
				<div className='chat-shell p-4 text-center'>Loading chat...</div>
			</div>
		);
	}

	return (
		<div className='chat-page'>
			<div className='chat-shell'>
				<div className='chat-header'>
					<div className='chat-title'>Chat app</div>
					<button onClick={handleLogout} className='chat-close-btn' aria-label='Logout'>
						x
					</button>
				</div>

				<div className='chat-messages'>
					{messages.length === 0 ? <div className='chat-empty'>No messages yet. Start the conversation.</div> : null}
					{messages.map(message => {
						const ownMessage = message.uid === currentUser?.uid;
						const date = new Date(message.createdAt);
						const time = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
						return (
							<div key={message.id} className={`chat-row ${ownMessage ? 'own' : 'other'}`}>
								<div
									className={`chat-bubble ${ownMessage ? 'own' : 'other'} ${ownMessage ? 'can-edit' : ''}`}
									onDoubleClick={() => handleStartEdit(message)}
									title={ownMessage ? 'Double click to edit' : ''}>
									<div className='chat-user-row'>
										<div className='chat-avatar-box'>
											{message.photoURL ? (
												<img className='chat-avatar' src={message.photoURL} alt={message.name} />
											) : (
												<div className='chat-avatar-fallback'>{getFirstLetter(message.name)}</div>
											)}
											<span className='chat-online-dot' />
										</div>
										<div className='chat-name'>{message.name}</div>
									</div>
									<div>{message.text}</div>
									<div className='chat-meta'>
										{time}
										{message.updatedAt ? ' (edited)' : ''}
									</div>
								</div>
							</div>
						);
					})}
					<div ref={bottomRef} />
				</div>

				<div className='chat-input-wrap'>
					{editingMessageId ? (
						<div className='chat-editing-note'>
							Editing selected message
							<button onClick={handleCancelEdit} className='chat-cancel-btn'>
								Cancel
							</button>
						</div>
					) : null}
					<div className='chat-input-row'>
						<input
							ref={inputRef}
							value={messageText}
							onChange={e => setMessageText(e.target.value)}
							onKeyDown={e => {
								if (e.key === 'Enter' && !e.shiftKey) {
									e.preventDefault();
									void handleSend();
								}
							}}
							type='text'
							className='chat-input'
							placeholder='Type a message...'
						/>
						<button onClick={handleSend} className='chat-send-btn' disabled={sending || !messageText.trim()}>
							{editingMessageId ? 'Save' : 'Send'}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Chat;
