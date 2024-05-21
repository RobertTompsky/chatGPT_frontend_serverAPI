export const handleSetFile = (
    setFile: (value: React.SetStateAction<File | Blob | undefined>
    ) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };