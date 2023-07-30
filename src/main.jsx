import ReactDOM from 'react-dom/client';
import './index.scss';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { persistor, store } from './features/app/store';
import router from './features/app/router/index.jsx';
import { App, ConfigProvider } from 'antd';
import { PersistGate } from 'redux-persist/integration/react';
import { Suspense } from 'react';
import { Loading } from './features/app/base';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Suspense fallback={<Loading />}>
        <ConfigProvider>
          <App>
            <RouterProvider router={router} />
          </App>
        </ConfigProvider>
      </Suspense>
    </PersistGate>
  </Provider>
);
