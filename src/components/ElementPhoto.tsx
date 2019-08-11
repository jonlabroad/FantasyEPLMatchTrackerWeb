import React from 'react';
import Element from "../data/fpl/Element";

export interface ElementPhotoProps {
    element?: Element
}

const photoRoot = 'https://platform-static-files.s3.amazonaws.com/premierleague/photos/players/110x140/p';

function getPhotoId(element?: Element) {
    if (element)
    {
        return element.photo;
    }
    return null;
}

export const ElementPhoto: React.SFC<ElementPhotoProps> = (props) => {
    if (!props.element) {
        return null;
    }

    var photoSuffix = getPhotoId(props.element);
    var photoUrl = photoRoot + photoSuffix;
    photoUrl = photoUrl.replace(".jpg", ".png");
    return (
    <img
        src={photoUrl}
        className="element-photo"
    />
    );
}
