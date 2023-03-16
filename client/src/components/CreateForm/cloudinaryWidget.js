const cloudName = "djgkrvtvd"; // replace with your own cloud name
const uploadPreset = "acrxerrn"; // replace with your own upload preset

export function showWidget(callback) {
	const myWidget = window.cloudinary.createUploadWidget(
		{
			cloudName: cloudName,
			uploadPreset: uploadPreset,
			// cropping: true, //add a cropping step
			// showAdvancedOptions: true,  //add advanced options (public_id and tag)
			sources: ["local", "camera"], // restrict the upload sources to URL and local files
			multiple: true, //restrict upload to a single file
			// folder: "user_images", //upload files to the specified folder
			// tags: ["users", "profile"], //add the given tags to the uploaded files
			// context: {alt: "user_uploaded"}, //add the given context data to the uploaded files
			clientAllowedFormats: ["png", "jpg", "jpeg", "webp"], //restrict uploading to image files only
			maxImageFileSize: 2000000, //restrict file size to less than 2MB
			maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
			// theme: "purple", //change to a purple theme
		},
		(error, result) => {
			console.log("error", error);
			console.log("result", result);
			// if (!error && result && result.event === "success") {
			// 	console.log("Done! Here is the image info: ", result.info);
			// 	document.getElementById("uploadedimage").setAttribute("src", result.info.secure_url);
			// }
			callback(error, result);
		}
	);
	myWidget.open();
}
