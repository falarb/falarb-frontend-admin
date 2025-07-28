import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './styles.css';

export default function Menu( { menuIsOpen } ) {

    const location = useLocation();

    return (
        <aside className={`asside-menu-bar asside-menu-bar-${ menuIsOpen ? 'menu-is-close' : 'menu-is-open'}`}>
            { menuIsOpen ? <>
                <img className="logo" src="/imagens/logo-pequena.png" alt="logo" />
            </> : 
            <>
                <img className="logo" src="/imagens/logo.png" alt="logo" />
            </>}
            
            <div className='list-menu-itens'>

                <Link className={`menu-item ${location.pathname === '/' ? 'active' : ''}`} to="/">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M520-600v-240h320v240H520ZM120-440v-400h320v400H120Zm400 320v-400h320v400H520Zm-400 0v-240h320v240H120Zm80-400h160v-240H200v240Zm400 320h160v-240H600v240Zm0-480h160v-80H600v80ZM200-200h160v-80H200v80Zm160-320Zm240-160Zm0 240ZM360-280Z"/></svg>
                    <span>Dashboard</span>
                </Link>
                <Link className={`menu-item ${location.pathname === '/solicitacoes' ? 'active' : ''}`} to="/solicitacoes">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M480-280q-17 0-28.5-11.5T440-320q0-17 11.5-28.5T480-360q17 0 28.5 11.5T520-320q0 17-11.5 28.5T480-280Zm-40-160v-400h80v400h-80ZM200-120q-33 0-56.5-23.5T120-200v-120h80v120h560v-120h80v120q0 33-23.5 56.5T760-120H200Z"/></svg>
                    <span>Solicitações</span>
                </Link>
                <Link className={`menu-item ${location.pathname === '/usuarios' ? 'active' : ''}`} to="/usuarios">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z"/></svg>
                    <span>Usuários</span>
                </Link>
                <Link className={`menu-item ${location.pathname === '/comunidades' ? 'active' : ''}`} to="/comunidades">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M80-140v-320h320v320H80Zm80-80h160v-160H160v160Zm60-340 220-360 220 360H220Zm142-80h156l-78-126-78 126ZM863-42 757-148q-21 14-45.5 21t-51.5 7q-75 0-127.5-52.5T480-300q0-75 52.5-127.5T660-480q75 0 127.5 52.5T840-300q0 26-7 50.5T813-204L919-98l-56 56ZM660-200q42 0 71-29t29-71q0-42-29-71t-71-29q-42 0-71 29t-29 71q0 42 29 71t71 29ZM320-380Zm120-260Z"/></svg>
                    <span>Comunidades</span>
                </Link>
                <Link className={`menu-item ${location.pathname === '/relatorios' ? 'active' : ''}`} to="/relatorios">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h360v80H200v560h560v-360h80v360q0 33-23.5 56.5T760-120H200Zm80-160h80v-280h-80v280Zm160 0h80v-400h-80v400Zm160 0h80v-160h-80v160Zm80-320v-80h-80v-80h80v-80h80v80h80v80h-80v80h-80ZM480-480Z"/></svg>
                    <span>Relatórios</span>
                </Link>
                <Link className={`menu-item ${location.pathname === '/administradores' ? 'active' : ''}`} to="/administradores">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M480-440q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0-80q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0 440q-139-35-229.5-159.5T160-516v-244l320-120 320 120v244q0 152-90.5 276.5T480-80Zm0-400Zm0-315-240 90v189q0 54 15 105t41 96q42-21 88-33t96-12q50 0 96 12t88 33q26-45 41-96t15-105v-189l-240-90Zm0 515q-36 0-70 8t-65 22q29 30 63 52t72 34q38-12 72-34t63-52q-31-14-65-22t-70-8Z"/></svg>
                    <span>Administradores</span>
                </Link>


            </div>
           
        </aside>
    );
}