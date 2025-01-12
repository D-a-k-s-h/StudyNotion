const cloudinary = require('cloudinary').v2;

exports.uploadFileToCloudinary = async(file,folder,height,quality) => {
    try{
        const options = {folder};

        if(quality){
            options.quality = quality
        }

        if(height){
            options.height = height
        }
        options.resource_type = "auto";

        return await cloudinary.uploader.upload(file.tempFilePath,options);

    } catch(error){
        return res.status(500).json({
            success:false,
            message:"Image couldn't be uploaded"
        })
    }
}  


exports.convertSecondsToDuration = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor((totalSeconds % 3600) % 60);

    if(hours > 0){
        return `${hours}h ${minutes}m`;
    }
    else if(minutes > 0){
        return `${minutes}m ${seconds}s`;
    }
    else{
        return `${seconds}s`
    }
}