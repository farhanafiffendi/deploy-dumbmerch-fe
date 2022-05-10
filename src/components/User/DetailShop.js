import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import mouse from '../images/mouse.png'
// import NavbarUser from './NavbarUser';
import convertRupiah from "rupiah-format";
import { useParams, useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';

import { API } from '../../config/api'

export default function DetailShop() {

    let navigate = useNavigate();
    let { id } = useParams();

    let { data: product } = useQuery('productCache', async () => {
        const config = {
            method: "GET",
            headers: {
                Authorization: "Basic " + localStorage.token,
            },
        };
        const response = await API.get('/product/' + id, config);
        return response.data.data;
    });

    useEffect(() => {
        //change this to the script source you want to load, for example this is snap.js sandbox env
        const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
        //change this according to your client-key
        const myMidtransClientKey = "SB-Mid-client-m6M6KY8L1ShVe3RE";

        let scriptTag = document.createElement("script");
        scriptTag.src = midtransScriptUrl;
        // optional if you want to set script attribute
        // for example snap.js have data-client-key attribute
        scriptTag.setAttribute("data-client-key", myMidtransClientKey);

        document.body.appendChild(scriptTag);
        return () => {
            document.body.removeChild(scriptTag);
        };
    }, []);

    //untuk klik buy
    const handleBuy = useMutation(async () => {
        try {
            const config = {
                headers: {
                    Authorization: "Basic " + localStorage.token,
                    "Content-type": "application/json",
                },
            };

            const data = {
                idProduct: product.id,
                idSeller: product.user.id,
                price: product.price,
            };

            const body = JSON.stringify(data);

            const response = await API.post('/transaction', body, config);

            // Create variabel for store token payment from response here ...
            const token = response.data.payment.token;
            window.snap.pay(token, {
                onSuccess: function (result) {
                    /* You may add your own implementation here */
                    console.log(result);
                    navigate("/profile");
                },
                onPending: function (result) {
                    /* You may add your own implementation here */
                    console.log(result);
                    navigate("/profile");
                },
                onError: function (result) {
                    /* You may add your own implementation here */
                    console.log(result);
                },
                onClose: function () {
                    /* You may add your own implementation here */
                    alert("you closed the popup without finishing the payment");
                },
            });
        } catch (error) {
            console.log(error);
        }
    });

    return (
        <div className="container mt-5 text-light">
            <div className="row">
                <div className="col-12">
                    <div className="row d-flex justify-content-start align-items-start">
                        <div className="col-lg-6">
                            <img src={product?.image} width={'70%'} className="img-fluid" alt="halo" />
                        </div>
                        <div className="col-lg-6">
                            <h2>{product?.name}</h2>
                            <p>Stock : {product?.qty}</p>
                            <p>
                                {product?.desc}
                            </p>
                            <div>{convertRupiah.convert(product?.price)}</div>
                        </div>
                        <div className='d-flex justify-content-end' style={{ marginTop: '-30px' }}>
                            <div className="btn btn-danger w-50" onClick={() => handleBuy.mutate()}> Buy</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

