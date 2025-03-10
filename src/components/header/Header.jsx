import styles from "./header.module.css";
import Logo from "./Logo";
import NavigationLinks from "./NavigationLinks";
import UserActions from "./UserActions";

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <Logo />
                <NavigationLinks />
                <UserActions />
            </div>
        </header>
    );
};

export default Header;
