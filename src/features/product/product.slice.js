import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'product',
  initialState: {
    productList: []
    // productList: [...Array(100).keys()].map(() => ({
    //   id: Math.random(),
    //   productImg: '',
    //   productName: 'Test',
    //   productBuying: 1000,
    //   productSelling: 1000,
    //   productStock: 100
    // }))
  },
  reducers: {
    addProduct: (state, { payload }) => {
      state.productList.push({
        id: Math.random(),
        ...payload
      });
    },
    updateProduct: (state, { payload }) => {
      const { index, values } = payload;
      state.productList[index] = {
        ...state.productList[index],
        ...values
      };
    },
    deleteProduct: (state, { payload }) => {
      state.productList.splice(payload.index, 1);
    }
  }
});

export const { addProduct, deleteProduct, updateProduct } = productSlice.actions;
export default productSlice.reducer;
