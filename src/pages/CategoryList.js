import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { useQuery, useMutation } from 'react-query';
import NavAdmin from '../components/Admin/NavAdmin';
import { API } from '../config/api';
import DeleteData from '../components/modal/DeleteData';
import folder from '../components/images/folder.png'


export default function CategoryList() {

    const [idDelete, setIdDelete] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(null);

    let navigate = useNavigate();

    const [show, setShow] = useState();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleEdit = (id) => {
        navigate('/update-category/' + id);
    };

    const addCategory = () => {
        navigate('/add-category');
    };

    const handleDelete = (id) => {
        setIdDelete(id);
        handleShow();
    };

    // Create function for handle delete product here ...
    // If confirm is true, execute delete data
    const deleteById = useMutation(async (id) => {
        try {
            await API.delete(`/category/${id}`);
            refetch();
        } catch (error) {
            console.log(error);
        }
    });
    // Call function for handle close modal and execute delete data with useEffect here ...
    useEffect(() => {
        if (confirmDelete) {
            // Close modal confirm delete data
            handleClose();
            // execute delete data by id function
            deleteById.mutate(idDelete);
            setConfirmDelete(null);
        }
    }, [confirmDelete]);



    const title = 'Category admin';
    document.title = 'DumbMerch | ' + title;

    let { data: categories, refetch } = useQuery('categoriesCache', async () => {
        const response = await API.get('/categories');
        return response.data.categories;
    });


    return (
        <>
            <NavAdmin title={title} />
            <Container className="py-5">
                <Row>
                    <Col>
                        <div className="text-header-category mb-4">List Category</div>
                    </Col>
                    <Col className="text-end">
                        <Button
                            onClick={addCategory}
                            className="btn-primary"
                            style={{ width: '100px' }}
                        >
                            Add
                        </Button>
                    </Col>
                    <Col xs="12">
                        {categories?.length !== 0 ? (
                            <Table striped hover size="lg" variant="dark">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Category Name</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories?.map((item, index) => (
                                        <tr key={index}>
                                            <td width="10%" className="align-middle">
                                                {index + 1}
                                            </td>
                                            <td width="60%" className="align-middle">
                                                {item.nameCategory}
                                            </td>
                                            <td width="30%">
                                                <Button
                                                    onClick={() => {
                                                        handleEdit(item.id);
                                                    }}
                                                    className="btn-sm btn-success me-2"
                                                    style={{ width: '135px' }}
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    onClick={() => {
                                                        handleDelete(item.id);
                                                    }}
                                                    className="btn-sm btn-danger"
                                                    style={{ width: '135px' }}
                                                >
                                                    Delete
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        ) : (
                            <div className="text-center pt-5">
                                <img
                                    src={folder}
                                    className="img-fluid"
                                    style={{ width: '25%' }}
                                    alt="empty"
                                />
                                <div className="mt-3">No data category</div>
                            </div>
                        )}
                    </Col>
                </Row>
            </Container>
            <DeleteData
                setConfirmDelete={setConfirmDelete}
                show={show}
                handleClose={handleClose}
            />
        </>
    );
}
