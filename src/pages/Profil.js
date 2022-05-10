import React, { useContext, useState } from 'react'; import cssModule from '../css/profile.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Col, Row, Container, Button, Offcanvas } from 'react-bootstrap'
import { API } from '../config/api'
import { UserContext } from '../context/userContext';
import { useQuery } from 'react-query';
import convertRupiah from 'rupiah-format';
import dateFormat from 'dateformat'
import NavbarUser from '../components/User/NavbarUser'
import img from '../components/images/noprofile.jpg'

export default function Profile() {

    const title = "Profile"
    document.title = 'DumbMerch | ' + title

    const [state] = useContext(UserContext);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    let { data: profile } = useQuery('profileCache', async () => {
        const response = await API.get('/profile');
        return response.data.data;
    });

    let { data: transactions } = useQuery('transactionsCache', async () => {
        const config = {
            method: "GET",
            headers: {
                Authorization: "Basic " + localStorage.token,
            },
        };
        const response = await API.get('/transactions', config);
        return response.data.data;
    });

    return (
        <>
            <NavbarUser title={title} />
            <div className='container mt-5 text-light'>
                <div className='row justify-content-between'>
                    <div className={`col-lg-3 col-sm-12 teks ${cssModule.teks}`}>
                        <h3 className='mb-3'>My Profile</h3>
                        <div className='d-flex'>
                            <img src={profile?.image ? profile.image : img}
                                className="img-fluid rounded"
                                alt="avatar" />
                        </div>
                    </div>
                    <div className="col-lg-3 mt-5 nama">
                        <p>Name: <br />{state.user.name}</p>
                        <p>Email: <br /> {state.user.email}</p>
                        <p>Phone: <br /> {profile?.phone ? profile?.phone : '-'}</p>
                        <p>Gender: <br />  {profile?.gender ? profile?.gender : '-'}</p>
                        <p>Address: <br />  {profile?.address ? profile?.address : '-'}</p>
                    </div>
                    <div className="col-lg-6 col-sm-12 d-flex flex-column align-items-end">
                        <h3 className='mb-3'>My Transaction</h3>

                        <Button variant="primary" onClick={handleShow} className="me-2">
                            Show Transaction
                        </Button>

                        <Offcanvas className="canvas" show={show} onHide={handleClose}>
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title className='canTitle'>History Transaction</Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                {transactions?.length !== 0 ? (
                                    <>
                                        {transactions?.map((item) => (
                                            <div style={{ background: "#303030" }} className="p-2 mb-1">
                                                <Container fluid className="px-1">
                                                    <Row>
                                                        <Col xs="3">
                                                            <img
                                                                src={item.product.image}
                                                                alt="img"
                                                                className="img-fluid"
                                                                style={{
                                                                    height: "120px",
                                                                    width: "170px",
                                                                    objectFit: "cover",
                                                                }}
                                                            />
                                                        </Col>
                                                        <Col xs="6">
                                                            <div
                                                                style={{
                                                                    fontSize: "18px",
                                                                    color: "#F74D4D",
                                                                    fontWeight: "500",
                                                                    lineHeight: "19px",
                                                                }}
                                                            >
                                                                {item.product.name}
                                                            </div>
                                                            <div
                                                                className="mt-2"
                                                                style={{
                                                                    fontSize: "14px",
                                                                    color: "#F74D4D",
                                                                    fontWeight: "300",
                                                                    lineHeight: "19px",
                                                                }}
                                                            >
                                                                {dateFormat(
                                                                    item.createdAt,
                                                                    "dddd, d mmmm yyyy, HH:MM "
                                                                )}
                                                                WIB
                                                            </div>

                                                            <div
                                                                className="mt-3"
                                                                style={{
                                                                    fontSize: "14px",
                                                                    fontWeight: "300",
                                                                }}
                                                            >
                                                                Price : {convertRupiah.convert(item.price)}
                                                            </div>

                                                            <div
                                                                className="mt-3"
                                                                style={{
                                                                    fontSize: "14px",
                                                                    fontWeight: "700",
                                                                }}
                                                            >
                                                                Sub Total : {convertRupiah.convert(item.price)}
                                                            </div>
                                                        </Col>
                                                        <Col xs="3">
                                                            <div
                                                                className={`status-transaction-${item.status} rounded h-100 d-flex align-items-center justify-content-center`}
                                                            >
                                                                {item.status}
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </Container>
                                            </div>
                                        ))}
                                    </>
                                ) : (
                                    <div className="no-data-transaction">No transaction</div>
                                )}
                            </Offcanvas.Body>
                        </Offcanvas>
                    </div>
                </div>
            </div>
        </>

    )
}

