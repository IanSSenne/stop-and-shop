import styles from "./Chat.module.scss";
import { Card, Icon, Portal } from "@blueprintjs/core";
import { useState } from "react";
import { wrapAuthenticationCheck } from "../../utils/hoc/wrapAuthenticationCheck";
export const Chat = wrapAuthenticationCheck(function chat() {
	const [isOpen, setIsOpen] = useState(false);
	return isOpen ? (
		<Portal className={styles.root}>
			<Card className={styles.card}>
				<div className={styles.header}>
					<div className={styles.title}>
						<Icon icon="chat" className={styles.icon}></Icon>
						<span>Chat</span>
					</div>
					<div className={styles.close}>
						<Icon icon="cross" onClick={() => setIsOpen(false)}></Icon>
					</div>
				</div>
				<div className={styles.body}>
					<div className={styles.users}></div>
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
