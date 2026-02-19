interface DownloadButtonProps {
    label: string;
    filename: string;
    generate: () => Promise<Uint8Array>;
    color?: string;
}

export function DownloadButton({ label, filename, generate, color = '#0066cc' }: DownloadButtonProps) {
    const handleDownload = async () => {
        try {
            const bytes = await generate();
            const blob = new Blob([bytes.slice(0).buffer], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = filename;
            link.click();
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error generando PDF:', error);
        }
    };

    return (
        <button
            onClick={handleDownload}
            style={{
                padding: '12px 24px',
                backgroundColor: color,
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '15px',
                fontWeight: '600',
                cursor: 'pointer',
                width: '100%',
            }}
        >
            {label}
        </button>
    );
}
