import React from "react";
import styled from "styled-components";
import useAuth from "../hooks/useAuth";

const ImageUploader = styled.TouchableHighlight`
	bordercolor: #4632a1;
	borderwidth: 1px;
`;
const ImagePreview = styled.Image`

`

export default function AuthPage() {
    const {openImagePickerAsync, selectedImage} = useAuth();
	return <>
        <ImageUploader onPress={openImagePickerAsync}>
            <ImagePreview source={{uri: selectedImage.uri}}/>
        </ImageUploader>
        
    </>;
}
