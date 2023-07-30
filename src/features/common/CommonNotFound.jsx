import { useRouteError } from 'react-router-dom';

const CommonNotFound = () => {
  const error = useRouteError();
  console.log(error);

  return <div>404</div>;
};

export default CommonNotFound;
