import { memo, useCallback, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import { App } from 'antd';
import clsx from 'clsx';
import byteSize from 'byte-size';
import { PictureFilled } from '@ant-design/icons';

const ImageUpload = ({ value = null, onChange, extension = '.jpg,.png,.jpeg', maxSize = 100 }) => {
  const ref = useRef(null);
  const { message } = App.useApp();

  const extensionArr = useMemo(
    () => extension.split(',').map((ext) => ext.trim().toLowerCase()),
    [extension]
  );

  const generateThumbnail = useMemo(() => {
    if (value) {
      return URL.createObjectURL(value);
    }
    return null;
  }, [value]);

  const handleFileChange = useCallback(
    (event) => {
      const [currentFile] = event.target.files;
      if (currentFile) {
        const fileExt = currentFile.name.split('.').pop().toLowerCase();

        // Block extension
        if (!extensionArr.includes(`.${fileExt.toLowerCase()}`)) {
          message.error(`Jenis file yang didukung hanya ${extension}`);
          return;
        }

        // Block File size
        if (maxSize) {
          const fileSize = currentFile.size / 1024;
          if (fileSize > maxSize) {
            message.error(`Ukuran file size melebihi batas yang diperbolehkan`);
            return;
          }
        }

        // Trigger set value
        onChange(currentFile);

        ref.current.value = null;
      }
    },
    [extension, extensionArr, maxSize, message, onChange]
  );

  const handleTriggerFile = useCallback(() => {
    ref.current.click();
  }, []);

  return (
    <div className={clsx('bg-slate-50 hover:bg-slate-100 cursor-pointer rounded-md h-[200px]')}>
      <div className="flex items-center justify-center h-full relative" onClick={handleTriggerFile}>
        {!generateThumbnail && (
          <div className="flex flex-col items-center text-xs">
            <PictureFilled style={{ fontSize: '90px' }} />
            {extension && (
              <div className="text-slate-600 mb-1">File yang diizinkan: ({extension})</div>
            )}
            {maxSize && (
              <div className="text-slate-400">(Max: {byteSize(maxSize * 1000).toString()})</div>
            )}
          </div>
        )}
        {generateThumbnail && (
          <img src={generateThumbnail} className="object-contain w-full h-full" />
        )}
      </div>
      <input
        type="file"
        onChange={handleFileChange}
        className="!hidden"
        ref={ref}
        accept={extension}
      />
    </div>
  );
};

ImageUpload.propTypes = {
  extension: PropTypes.string,
  maxSize: PropTypes.number,
  thumb: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func
};

export default memo(ImageUpload);
