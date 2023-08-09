export const getCroppedImg = (image, crop) => {
    return new Promise((resolve, reject) => {
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        const ctx = canvas.getContext('2d');
        canvas.width = crop.width;
        canvas.height = crop.height;

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );

        canvas.toBlob(
            (blob) => {
                if (!blob) {
                    reject('Error cropping image');
                    return;
                }
                resolve(blob);
            },
            'image/jpeg', // Change to 'image/png' if needed
            1 // Quality (0 to 1)
        );
    });
};
