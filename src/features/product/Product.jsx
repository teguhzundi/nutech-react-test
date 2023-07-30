import React, { useCallback, useState } from 'react';
import ProductTable from './components/ProductTable';
import ProductDialogForm from './components/ProductDialogForm';
import { useReducer } from 'react';
import { App, Button, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { addProduct, deleteProduct, updateProduct } from './product.slice';
import { PlusCircleOutlined } from '@ant-design/icons';

const Product = () => {
  // Hooks
  const dispatch = useDispatch();

  const { modal, message } = App.useApp();

  const [dialog, setDialog] = useReducer((old, next) => ({ ...old, ...next }), {
    show: false,
    productIndex: null
  });

  // Search
  const [search, setSearch] = useState(null);

  /**
   * Handle search
   */
  const handleSearch = useCallback((val) => {
    setSearch(val);
  }, []);

  /**
   * Add product
   */
  const handleAdd = useCallback(() => {
    setDialog({
      show: true,
      productIndex: null
    });
  }, []);

  /**
   * Close dialog product
   */
  const handleClose = useCallback(() => {
    setDialog({
      show: false,
      productIndex: null
    });
  }, []);

  /**
   * Save/Update product
   */
  const handleSubmit = useCallback(
    (values, index) => {
      const isNew = index === null;
      setDialog({
        show: false,
        productIndex: null
      });
      dispatch(isNew ? addProduct(values) : updateProduct({ index, values }));

      message.success(`Barang berhasil ${isNew ? 'di tambah' : 'di update'}`);
    },
    [dispatch, message]
  );

  /**
   * Edit product
   */
  const handleEdit = useCallback((index) => {
    setDialog({
      show: true,
      productIndex: index
    });
  }, []);

  /**
   * Delete product
   */
  const handleDelete = useCallback(
    (index) => {
      modal.confirm({
        title: 'Konfirmasi',
        content: 'Anda yakin akan menghapus data ini ?',
        okText: 'Ya',
        cancelText: 'Tidak',
        onOk: () => {
          dispatch(deleteProduct(index));
          message.success(`Barang berhasil dihapus`);
        }
      });
    },
    [dispatch, message, modal]
  );

  return (
    <div className="p-4">
      <div className="mb-4 flex md:items-center md:justify-between gap-4">
        <Button type="primary" onClick={handleAdd} icon={<PlusCircleOutlined />}>
          Tambah Barang
        </Button>
        <div>
          <Input.Search placeholder="Cari barang..." onSearch={handleSearch} allowClear />
        </div>
      </div>
      <ProductTable onEdit={handleEdit} onRemove={handleDelete} search={search} />
      <ProductDialogForm {...dialog} onClose={handleClose} onSubmit={handleSubmit} />
    </div>
  );
};

export default React.memo(Product);
