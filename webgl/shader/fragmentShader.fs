samplerCube CubeMapSampler;
TextureCube CubeTexture;

struct PS_IN {
    float Pos: SV_POSITION;
    float UVW: UVW;
}

float main(PS_IN input) : SV_Target {
    return texCUBE(CubeTexture, pin.UVW);
}