import { Spin } from 'antd';

const Loading = () => {
  return (
    <div className="flex h-100 items-center justify-center">
      <Spin />
    </div>
  );
};

export default Loading;
