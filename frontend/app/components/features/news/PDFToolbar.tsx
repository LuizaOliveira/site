'use client';

import { Icon } from '@iconify/react';

interface PDFToolbarProps {
  currentPage: number;
  numPages: number;
  zoom: number;
  isFullscreen: boolean;
  isIOS: boolean;
  onPrev: () => void;
  onNext: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onToggleGrid: () => void;
  onToggleFullscreen: () => void;
  onDownload: () => void;
}

export function PDFToolbar({
  currentPage,
  numPages,
  zoom,
  isFullscreen,
  isIOS,
  onPrev,
  onNext,
  onZoomIn,
  onZoomOut,
  onToggleGrid,
  onToggleFullscreen,
  onDownload,
}: PDFToolbarProps) {
  return (
    <div
      className="
        sticky top-0 z-30
        flex items-center justify-between
        px-3 py-2
        border-b border-gray-200
        bg-gray-50/95 backdrop-blur
      "
    >
      {/* Navegação */}
      <div className="flex items-center gap-2">
        <button
          onClick={onPrev}
          disabled={currentPage === 1}
          className="p-1 rounded hover:bg-gray-200 disabled:opacity-50"
        >
          <Icon icon="mdi:chevron-left" className="w-4 h-4" />
        </button>

        <span className="text-sm text-gray-600 font-medium">
          {currentPage}/{numPages || '...'}
        </span>

        <button
          onClick={onNext}
          disabled={currentPage === numPages}
          className="p-1 rounded hover:bg-gray-200 disabled:opacity-50"
        >
          <Icon icon="mdi:chevron-right" className="w-4 h-4" />
        </button>
      </div>

      {/* Ações */}
      <div className="flex items-center gap-1">
        <button
          onClick={onToggleGrid}
          className="p-1 rounded hover:bg-gray-200"
          title="Visualização em grade"
        >
          <Icon icon="mdi:grid-large" className="w-4 h-4" />
        </button>

        <button
          onClick={onZoomIn}
          disabled={zoom >= 3}
          className="p-1 rounded hover:bg-gray-200 disabled:opacity-50"
        >
          <Icon icon="mdi:magnify-plus" className="w-4 h-4" />
        </button>

        <button
          onClick={onZoomOut}
          disabled={zoom <= 0.5}
          className="p-1 rounded hover:bg-gray-200 disabled:opacity-50"
        >
          <Icon icon="mdi:magnify-minus" className="w-4 h-4" />
        </button>

        {!isIOS && (
          <button
            onClick={onDownload}
            className="p-1 rounded hover:bg-gray-200"
            title="Baixar PDF"
          >
            <Icon icon="mdi:download" className="w-4 h-4" />
          </button>
        )}

        <button
          onClick={isIOS ? onDownload : onToggleFullscreen}
          className="p-1 rounded hover:bg-gray-200"
        >
          <Icon icon="mdi:crop-free" className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
