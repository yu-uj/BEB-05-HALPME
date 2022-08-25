import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from 'react-bootstrap'
import '../../assets/styles/tabs/Navbar.css';

// eslint-disable-next-line
function Navbar({ }) {
    const [showLogoutModal, setShowLogoutModal] = useState(false)
    const [showFaucetModal, setShowFaucetModal] = useState(false)
    let account = useSelector((state) => state.account)

    const dispatch = useDispatch()

    const handleCloseLogoutModal = () => setShowLogoutModal(false)
    const handleShowLogoutModal = () => setShowLogoutModal(true)
    const handleCloseFaucetModal = () => setShowFaucetModal(false)
    const handleShowFaucetModal = () => setShowFaucetModal(true)
    
    let getFaucet = () => {

    }
    let signout = () => {
        dispatch({ type: 'SET_ACCOUNT', data: {}});
        window.location.replace("/")
    }
    return (
        <div className="Navbar">
            <nav className="navbar navbar-expand-lg" id="navbar">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand" id="nav-brand">
                        HALP ME
                    </Link>
                    <div className="navbar-items">
                        <Link to="/" className="nav-item">Home</Link>
                        <Link to="/market" className="nav-item">Market</Link>
                        <Link to="/mypage" className="nav-item">MyPage</Link>
                        {
                            account.id
                            ? <span>
                                <button className="btn" id="main-btn-sm" onClick={handleShowFaucetModal}>Faucet</button>
                                <button className="btn" id="main-btn-sm" onClick={handleShowLogoutModal}>Logout</button>
                            </span>
                            : <span>
                            <Link to="/signin">
                                <button className="btn" id="main-btn-sm">Login</button>
                            </Link>
                            <Link to="/signup">
                                <button className="btn" id="main-btn-sm">Signup</button>
                            </Link>
                        </span>
                        }
                    </div>
                </div>
            </nav>
            {/* Faucet Modal */}
            <Modal className="faucet-modal" show={showFaucetModal} onHide={handleCloseFaucetModal}>
                {/* closeButton 속성 있음 */}
                <Modal.Header>
                    <Modal.Title>Faucet</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    Are you sure you want to request 1 ether from faucet?
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn" id="main-btn-sm" onClick={handleCloseFaucetModal}>Close</button>
                    <button className="btn" id="main-btn-sm" onClick={getFaucet}>Sure</button>
                </Modal.Footer>
            </Modal>
            {/* Signout Modal */}
            <Modal className="logout-modal" show={showLogoutModal} onHide={handleCloseLogoutModal}>
                {/* closeButton 속성 있음 */}
                <Modal.Header>
                    <Modal.Title>Logout</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    Are you sure you want to logout?
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn" id="main-btn-sm" onClick={handleCloseLogoutModal}>Close</button>
                    <button className="btn btn-danger" id="logout-modal-btn-2" onClick={signout}>Logout</button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Navbar