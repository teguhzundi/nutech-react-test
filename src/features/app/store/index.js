import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { encryptTransform } from 'redux-persist-transform-encrypt';

// Reducers
import authReducer from '../../auth/auth.slice.js';
import productReducer from '../../product/product.slice.js';

// Encrypted
const encrypted = {
  transforms: [
    encryptTransform({
      secretKey: 'SECRET_KEY',
      onError: function () {
        localStorage.clear();
        window.location.reload();
      }
    })
  ]
};

const authPersistConfig = { key: 'auth', storage, ...encrypted };

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  product: productReducer
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }),
  devTools: import.meta.env.DEV
});

const persistor = persistStore(store);

export { store, persistor };
