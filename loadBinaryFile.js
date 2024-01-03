export async function loadBinaryFile(
    path: string,
    file_sub_resource_hash?: string | undefined,
  ): Promise<Uint8Array> {
    const { response, binary } = getBinaryResponse(path, file_sub_resource_hash);
    if (binary) {
      return binary;
    }
    const r = await response;
    if (!r.ok) {
      throw new Error(`Failed to load '${path}': request failed.`);
    }
    return new Uint8Array(await r.arrayBuffer());
  }


  export async function loadBinaryFile(
    path: string,
    file_sub_resource_hash?: string | undefined,
  ): Promise<Uint8Array> {

    //===================================================================
    // The only added part is the check for .whl files
    if (path.endsWith('.whl')) {
        path=path+'.zip';
    }
    //===================================================================

    const { response, binary } = getBinaryResponse(path, file_sub_resource_hash);
    if (binary) {
      return binary;
    }
    const r = await response;
    if (!r.ok) {
      throw new Error(`Failed to load '${path}': request failed.`);
    }
    return new Uint8Array(await r.arrayBuffer());
  }