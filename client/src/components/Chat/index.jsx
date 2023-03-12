import styles from "./Chat.module.scss";
import { Button, Card, Icon, Portal } from "@blueprintjs/core";
import { useState } from "react";
import { wrapAuthenticationCheck } from "../../utils/hoc/wrapAuthenticationCheck";
import { useQuery } from "@apollo/client";
import { QUERY_MY_CHATS } from "../../utils/queries";
import { useAuth } from "../../contexts/Auth";
import { ChatUserButton } from "../ChatUserButton";

export const Chat = wrapAuthenticationCheck(function chat() {
	const [isOpen, setIsOpen] = useState(false);
	const auth = useAuth();
	const { data, loading } = useQuery(QUERY_MY_CHATS);

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
								data?.chats?.map((chat) => {
									const otherUser = chat.visibleTo.find((user) => user._id !== myUserId);
									return (
										<div key={otherUser._id} className={styles.user}>
											<ChatUserButton user={otherUser} onClick={() => { }} />
										</div>
									)
								})
							)}
					</div>
					<div className={styles.messages}></div>
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
