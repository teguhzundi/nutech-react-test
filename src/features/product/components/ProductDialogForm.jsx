import { App, Form, Input, InputNumber, Modal } from 'antd';
import React, { useCallback, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { numbersOnly } from '../../app/utils/common.utils';
import { ImageUpload } from '../../app/base';

const ProductDialogForm = ({
  show = false,
  onSubmit = null,
  onClose = null,
  productIndex = null
}) => {
  // Hooks
  const { message } = App.useApp();

  const [form] = Form.useForm();

  const title = useMemo(
    () => (productIndex !== null ? 'Ubah Barang' : 'Tambah Barang'),
    [productIndex]
  );

  const productList = useSelector(({ product }) => product.productList);

  /**
   * Fill data if edit mode
   */
  useEffect(() => {
    if (show && productIndex !== null) {
      form.setFieldsValue(productList[productIndex]);
    }
  }, [form, productIndex, productList, show]);

  /**
   * Check duplicate product name
   */
  const checkDuplicateName = useCallback(
    (name) => {
      const list = [...productList];
      if (productIndex !== null) {
        list.splice(productIndex, 1);
      }
      return list.findIndex((p) => p.productName.toLowerCase() === name.toLowerCase()) !== -1;
    },
    [productIndex, productList]
  );

  /**
   * Trigger submit from form to dialog submit
   */
  const handleTriggerSubmit = useCallback(() => {
    form.submit();
  }, [form]);

  /**
   * Close dialog
   */
  const handleCancel = useCallback(() => {
    form.resetFields();
    onClose();
  }, [form, onClose]);

  /**
   * Submit data
   */
  const handleSubmit = useCallback(
    (values) => {
      if (checkDuplicateName(values.productName)) {
        message.error(`Barang dengan nama: ${values.productName} sudah terdaftar`);
        return;
      }

      onSubmit(values, productIndex);
      handleCancel();
    },
    [checkDuplicateName, handleCancel, message, onSubmit, productIndex]
  );

  return (
    <Modal
      title={title}
      open={show}
      onCancel={handleCancel}
      onOk={handleTriggerSubmit}
      cancelText="Batal"
      okText={productIndex !== null ? 'Simpan' : 'Tambah'}>
      <Form
        form={form}
        autoComplete="off"
        onFinish={handleSubmit}
        layout="vertical"
        className="mt-5">
        <Form.Item
          name="productImg"
          label="Gambar Barang"
          rules={[{ required: true }]}
          className="mb-6">
          <ImageUpload />
        </Form.Item>
        <Form.Item name="productName" label="Nama Barang" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <div className="grid grid-cols-2 gap-3">
          <Form.Item name="productBuying" label="Harga Beli" rules={[{ required: true }]}>
            <InputNumber
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
              parser={(value) => value.replace(/\$\s?|(\.*)/g, '')}
              className="w-full"
              controls={false}
              prefix="Rp."
              onKeyPress={numbersOnly}
            />
          </Form.Item>
          <Form.Item name="productSelling" label="Harga Jual" rules={[{ required: true }]}>
            <InputNumber
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
              parser={(value) => value.replace(/\$\s?|(\.*)/g, '')}
              className="w-full"
              prefix="Rp."
              controls={false}
              onKeyPress={numbersOnly}
            />
          </Form.Item>
        </div>
        <Form.Item
          name="productStock"
          label="Stok"
          rules={[{ required: true }, { type: 'number', min: 1 }]}>
          <InputNumber onKeyPress={numbersOnly} min={0} max={1000} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

ProductDialogForm.propTypes = {
  show: PropTypes.bool,
  onSubmit: PropTypes.func,
  onClose: PropTypes.func,
  productIndex: PropTypes.number
};

export default React.memo(ProductDialogForm);
