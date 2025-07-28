import './styles.css';

export default function Header( {children , menuIsOpen, setMenuIsOpen } ) {

    return (
        <header className={`header header-${menuIsOpen === true ? 'menu-is-open' : 'menu-is-close'}`}>
                <svg 
                    className={`header-svg ${menuIsOpen === true ? 'header-svg-true' : 'header-svg-false'}`}
                    onClick={ () => {
                        setMenuIsOpen(menuIsOpen === true ? false : true)
                    }}
                    fill="#344054"
                    height="24px" 
                    width="24px"
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 -960 960 960"
                >
                    <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/>
                </svg>
        

                <svg
                    className={`header-svg ${menuIsOpen === true ? 'header-svg-false' : 'header-svg-true'}`}
                    onClick={ () => {
                        setMenuIsOpen(menuIsOpen === true ? false : true)
                    }}
                    height="24px" 
                    width="24px" 
                    fill="#344054"
                    viewBox="0 -960 960 960" 
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                </svg>
        </header>
    );
}