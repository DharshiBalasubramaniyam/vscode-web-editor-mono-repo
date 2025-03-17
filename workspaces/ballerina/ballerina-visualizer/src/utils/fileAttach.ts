
/**
 * Function to Handle file attachment
 */

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // Default to 5MB

export const handleFileAttach = (
    e: any,
    setFiles: Function,
    setFileUploadStatus: Function,
) => {
    const files = e.target.files;
    const validFileTypes = ["text/plain", "application/json", "application/x-yaml", "application/xml", "text/xml"];

    for (const file of files) {
        if (file.size > MAX_FILE_SIZE) {
            setFileUploadStatus({ type: 'error', text: `File '${file.name}' exceeds the size limit of 5 MB.` });
            continue;
        }

        if (validFileTypes.includes(file.type)) {
            const reader = new FileReader();
            reader.onload = (event: any) => {
                const fileContents = event.target.result;
                setFiles((prevFiles: any) => [...prevFiles, { fileName: file.name, fileContent: fileContents }]);
                setFileUploadStatus({ type: 'success', text: `File uploaded successfully.` });
            };
            reader.readAsText(file);
        } else {
            setFileUploadStatus({ type: 'error', text: `File format not supported for '${file.name}'` });
        }
    }
    e.target.value = '';  
};
