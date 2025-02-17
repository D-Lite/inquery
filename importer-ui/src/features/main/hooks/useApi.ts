import { useMemo } from "react";
import { Importer, Template, Upload } from "../../../api/types";
import useGetImporter from "../../../api/useGetImporter";
import useGetUpload from "../../../api/useGetUpload";
import usePostUpload from "../../../api/usePostUpload";
import useMutableLocalStorage from "./useMutableLocalStorage";

export default function useApi(importerId: string) {
  const [tusId, setTusId] = useMutableLocalStorage(importerId + "-tusId", "");

  const tusWasStored = useMemo(() => !!tusId, []);

  // Load importer & template for the first step
  const { data: importer = {} as Importer, isLoading: importerIsLoading, error: importerError } = useGetImporter(importerId);
  const { template = {} as Template } = importer;

  // Load upload for the second step
  const { data: upload = {} as Upload, error: uploadError } = useGetUpload(tusId);
  const { is_stored: isStored } = upload;

  return {
    tusId,
    tusWasStored,
    importer,
    importerIsLoading,
    importerError,
    template,
    upload,
    uploadError,
    isStored,
    setTusId,
  };
}
