import styles from "./Chat.module.scss";
import { Button, Card, Icon, Portal } from "@blueprintjs/core";
import { useState } from "react";
import { wrapAuthenticationCheck } from "../../utils/hoc/wrapAuthenticationCheck";
import { useQuery } from "@apollo/client";
import { QUERY_MY_CHATS } from "../../utils/queries";
import { useAuth } from "../../contexts/Auth";
import { ChatUserButton } from "../ChatUserButton";
import clsx from "clsx";
export const Chat = wrapAuthenticationCheck(function chat() {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedChat, setSelectedChat] = useState(null);
	const auth = useAuth();
	const { data, loading } = useQuery(QUERY_MY_CHATS);

	console.log(selectedChat);
	const myUserId = auth.user.data._id;
	return isOpen ? (
		<Portal className={styles.root}>
			<Card className={styles.card}>
				<div className={styles.header}>
					<div className={styles.title}>
						<Icon icon="chat" className={styles.icon}></Icon>
						<span>Chat</span>
					</div>
					<Button onClick={() => setIsOpen(false)} minimal>
						<Icon icon="cross" size={32}></Icon>
					</Button>
				</div>
				<div className={styles.body}>
					<div className={styles.users}>
						{loading ? (
							<div>Loading...</div>
						) : (
								<>
								{data?.chats?.map((chat) => {
									const otherUser = chat.visibleTo.find((user) => user._id !== myUserId);
									return (
										<div key={otherUser._id} className={styles.user}>
											<ChatUserButton user={otherUser} onClick={() => {
												setSelectedChat(chat);
											 }} />
										</div>
									)
								})}
									
									{selectedChat && (
										<div className={styles.messages}>
											{selectedChat.messages.map((message) => {
												const isMyMessage = message.from._id === myUserId;
												return (
													<div key={message._id} className={clsx(styles.message,isMyMessage ? styles.self : styles.other)}>
														<div className={styles.messageContent}>
															<div className={styles.messageAuthor}>
																{message.from.displayName}
															</div>
															<div className={styles.messageText}>
																{message.message}
															</div>
														</div>
														<div className={styles.messageTime}>
															{message.timestamp}
														</div>
													</div>
												);
											})}
										</div>
									)}
								</>
							)}
					</div>
				</div>
			</Card>
		</Portal>
	) : (
		<Card
			className={styles.openIcon}
			interactive
			onClick={() => {
				setIsOpen(true);
			}}>
			<Icon icon="chat"></Icon>
		</Card>
	);
});
