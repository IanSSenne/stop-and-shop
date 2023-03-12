import styles from "./ChatUserButton.module.scss";
import { Button, Card, Icon, Portal } from "@blueprintjs/core";
// import { wrapAuthenticationCheck } from "../../utils/hoc/wrapAuthenticationCheck";
export const ChatUserButton = ({ user,onClick}) => (
	<Card className={styles.root} interactive onClick={onClick}>
		{/* <div className={styles.avatar}>
			<img src={user.avatar} alt="avatar" width={40} height={40} />
		</div> */}
		<div className={styles.name}>{user.displayName}</div>
	</Card>
);
