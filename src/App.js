import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { publicRoute } from './router';
import { DefaultLayout } from './Component/Layout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import getAllProduct from './Apis/ProductApi';
import { getToken, getUserId } from './redux/Selector/AuthSelector';
import { getCartByUserId } from './Apis/CartApi';
import httpRequest from './Apis/request';

function App() {
    const dispatch = useDispatch();
    const userId = useSelector(getUserId);
    const token = useSelector(getToken);
    let axiosJwt = httpRequest(token, dispatch);

    useEffect(() => {
        getCartByUserId(userId, dispatch, axiosJwt);
        getAllProduct(dispatch);
    }, [axiosJwt, dispatch, userId]);

    return (
        <BrowserRouter>
            <div className="background-white">
                <Routes>
                    {publicRoute.map((route) => {
                        const Component = route.component;
                        let Layout = DefaultLayout;
                        if (route.layout) Layout = route.layout;

                        return (
                            <Route
                                key={route.path}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Component />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
            <ToastContainer
                position="bottom-center"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </BrowserRouter>
    );
}

export default App;
