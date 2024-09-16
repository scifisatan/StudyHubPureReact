import { useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from "sonner";


//@ts-ignore
export function Dropzone(props) {
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject
  } = useDropzone({ accept: { 'application/pdf': [] }, maxFiles: 1,
    onDrop: (files) =>{
      let file = files[0]
      if(file.type === 'application/pdf'){
        props.onFileChange(file);
        toast.success("File has been uploaded successfully")
      }
    }
  });

  const baseStyle = 'flex flex-col items-center w-full p-5 border-2 border-dashed rounded bg-secondary text-muted-foreground outline-none transition ease-in-out duration-150';
  const focusedStyle = 'border-blue-500';
  const acceptStyle = 'border-green-500';
  const rejectStyle = 'border-red-500';

  const style = useMemo(() => {
    let combinedStyle = baseStyle;
    if (isFocused) combinedStyle += ` ${focusedStyle}`;
    if (isDragAccept) combinedStyle += ` ${acceptStyle}`;
    if (isDragReject) combinedStyle += ` ${rejectStyle}`;
    return combinedStyle;
  }, [isFocused, isDragAccept, isDragReject]);

  return (
    <div >
      <div {...getRootProps(({ className: style }))}>
        <input  {...getInputProps()} />
        {acceptedFiles.length > 0 ? (
            <div>
                <ul>
                {acceptedFiles.map(file => (
                    <li key={file.name} className="text-muted-foreground">
                    {file.name} - {file.size} bytes
                    </li>
                ))}
                </ul>
            </div>
            ) : (
            <p className="text-muted-foreground">Drag 'n' drop some files here, or click to select files</p>

   )}
      </div>
    </div>
  );
}

