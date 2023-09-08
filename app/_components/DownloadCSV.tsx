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

  return (
    <a href={url} download="anki-cards.csv" className="btn">
      Download Anki Cards
    </a>
  );
};

export default DownloadCSVButton;
