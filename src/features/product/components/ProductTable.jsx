import React, { useMemo } from 'react';
import { Button, Table } from 'antd';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { formatRupiah } from '../../app/utils/currency.utils';

const ProductTable = ({ onEdit = null, onRemove = null, search }) => {
  const dataSource = useSelector(({ product }) => product.productList);

  const dataSourceFiltered = useMemo(() => {
    if (search) {
      return dataSource.filter(
        (data) => data.productName.toLowerCase().indexOf(search?.toLowerCase()) !== -1
      );
    }
    return dataSource;
  }, [dataSource, search]);

  const columns = useMemo(
    () => [
      {
        title: 'Gambar',
        dataIndex: 'productImg',
        width: 60,
        render: (data) =>
          data ? (
            <img className="w-[60px] h-[60px] object-contain" src={URL.createObjectURL(data)} />
          ) : (
            '-'
          )
      },
      { title: 'Nama Barang', dataIndex: 'productName', width: 300 },
      {
        title: 'Harga Beli',
        dataIndex: 'productBuying',
        width: 150,
        render: (val) => formatRupiah(val, true)
      },
      {
        title: 'Harga Jual',
        dataIndex: 'productSelling',
        width: 150,
        render: (val) => formatRupiah(val, true)
      },
      { title: 'Stok', dataIndex: 'productStock', width: 100 },
      {
        dataIndex: 'action',
        width: 80,
        align: 'center',
        render: (_, row, index) => {
          return (
            <div className="inline-flex gap-2">
              <Button type="primary" shape="circle" ghost onClick={() => onEdit(index, row)}>
                <EditOutlined />
              </Button>
              <Button type="primary" shape="circle" danger onClick={() => onRemove(index, row)}>
                <DeleteOutlined />
              </Button>
            </div>
          );
        }
      }
    ],
    [onEdit, onRemove]
  );

  return (
    <div className="overflow-x-auto">
      <Table bordered dataSource={dataSourceFiltered} columns={columns} size="middle" rowKey="id" />
    </div>
  );
};

ProductTable.propTypes = {
  onEdit: PropTypes.func,
  onRemove: PropTypes.func,
  search: PropTypes.string
};

export default React.memo(ProductTable);
