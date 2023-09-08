import React from 'react';

interface DownloadCSVButtonProps {
  csvString: string | undefined;
}

const DownloadCSVButton: React.FC<DownloadCSVButtonProps> = ({ csvString }) => {
  if (!csvString) {
    return null;
  }

  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });

  // Generate a URL for the Blob object
  const url = URL.createObjectURL(blob);

  const today = new Date();
  const time = today.getHours() + '' + today.getMinutes() + '' + today.getSeconds();
  const fileName = `anki-cards-${time}.csv`

  return (
    <a href={url} download={fileName} className="btn">
      Download Anki Cards
    </a>
  );
};

export default DownloadCSVButton;
