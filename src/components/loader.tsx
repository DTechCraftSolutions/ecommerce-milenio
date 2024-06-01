import React from 'react';

export const LoadingModal = ({ loading }: { loading: boolean }) => {
  return (
    <div className={`fixed inset-0 flex items-center justify-center bg-gray-800 z-50 bg-opacity-75 transition-opacity ${loading ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="bg-white rounded-lg p-4 flex flex-col items-center">
        {loading && (
          <>
            <div className="loader border-t-4 border-primary rounded-full w-12 h-12 mb-4 animate-spin"></div>
            <p className="text-lg font-semibold">Carregando...</p>
          </>
        )}
      </div>
    </div>
  );
};


