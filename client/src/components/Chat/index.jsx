import styles from "./Chat.module.scss";
import { Button, Card, Elevation, Icon, InputGroup, Portal, Spinner, SpinnerSize } from "@blueprintjs/core";
import { useRef, useState } from "react";
import { wrapAuthenticationCheck } from "../../utils/hoc/wrapAuthenticationCheck";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_MY_CHATS, QUERY_CHAT } from "../../utils/queries";
import { useAuth } from "../../contexts/Auth";
import { ChatUserButton } from "../ChatUserButton";
import { Tooltip2 } from "@blueprintjs/popover2";
import clsx from "clsx";
import { SEND_MESSAGE } from "../../utils/mutations";
export const Chat = wrapAuthenticationCheck(function chat() {
	const [isOpen, setIsOpen] = useState(false);
	let [selectedChat, setSelectedChat] = useState(null);
	const auth = useAuth();
	const { data, loading } = useQuery(QUERY_MY_CHATS);

	const endDiv = useRef();

	const { data: updateData, refetch } = useQuery(QUERY_CHAT, {
		skip: !selectedChat,
		variables: {
			chatId: selectedChat?._id,
		},
		pollInterval: 1000,
		onCompleted: (data) => {
			if (selectedChat && data.chat.messages.length > selectedChat.messages.length) {
				setSelectedChat(data.chat);
				if (endDiv.current) endDiv.current.scrollIntoView({ behavior: "smooth" });
			}
		},
	});
	const [sendMessageMutation, { loading: sendingMessage }] = useMutation(SEND_MESSAGE);

	function sendMessage(event) {
		event.preventDefault();
		const formData = new FormData(event.target);
		const message = formData.get("message");
		const chatId = formData.get("chatId");
		const messageData = {
			message,
			chatId,
		};
		sendMessageMutation({
			variables: messageData,
		}).then(() => {
			event.target.reset();
		});
	}

	const myName = selectedChat
		? selectedChat.visibleTo.find((user) => user._id === auth.user.data._id).displayName
		: null;

	const otherUserName = selectedChat
		? selectedChat.visibleTo.find((user) => user._id !== auth.user.data._id).displayName
		: null;

	if(!auth.user.data) return null; // hide the chat until we have a user
	const myUserId = auth.user.data._id;

	return isOpen ? (
		<Portal className={styles.root}>
			<Card className={styles.card} elevation={Elevation.THREE}>
				<div className={styles.header}>
					<div className={styles.title}>
						{selectedChat ? (
							<>
								<Button
									icon="arrow-left"
									minimal
									onClick={() => {
										setSelectedChat(null);
										refetch();
									}}></Button>
								<span>{otherUserName}</span>
							</>
						) : (
							<>
								<Icon icon="chat" className={styles.icon}></Icon>
								<span>Conversations</span>
							</>
						)}
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
								{!selectedChat &&
									data?.chats?.map((chat) => {
										const otherUser = chat.visibleTo.find((user) => user._id !== myUserId);
										return (
											<div key={otherUser._id} className={styles.user}>
												<ChatUserButton
													user={otherUser}
													onClick={() => {
														setSelectedChat(chat);
													}}
												/>
											</div>
										);
									})}

								{selectedChat && (
									<div className={styles.chat}>
										<div className={styles.messages}>
											{selectedChat.messages.map((message, i, arr) => {
												const hasName = i === 0 || arr[i - 1].from._id !== message.from._id;
												const isMyMessage = message.from._id === myUserId;
												return (
													<div
														key={message.timestamp + "-" + isMyMessage}
														className={clsx(styles.message, isMyMessage ? styles.self : styles.other)}>
														{hasName && <div className={styles.name}>{isMyMessage ? myName : otherUserName}</div>}
														<div className={styles.messageContent}>
															<div className={styles.messageText}>{message.message}</div>
														</div>
													</div>
												);
											})}
											<div ref={endDiv}></div>
										</div>
										<form onSubmit={sendMessage}>
											<input type="hidden" name="chatId" value={selectedChat._id}></input>
											<InputGroup
												name="message"
												disabled={sendingMessage}
												rightElement={
													sendingMessage ? (
														<Spinner size={SpinnerSize.SMALL}></Spinner>
													) : (
														<Tooltip2 content={`Send`}>
															<Button icon={"send-message"} minimal={true} type="submit" />
														</Tooltip2>
													)
												}></InputGroup>
										</form>
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
