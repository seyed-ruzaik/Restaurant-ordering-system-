// Assuming you have the process.env.DB_PORT defined in your TypeScript configuration or .env file
function getImageUrl(filename: string | undefined, type: string): string {
    if (type == "category"){
        const urlRegex = /(https?|http):\/\/\S+/i;
        if (urlRegex.test(<string>filename)) {
            return `${filename};`
        }

        return `http://3.133.159.195:${process.env.APP_PORT}/uploads/categories/${filename}`;
    }else {
        const urlRegex = /(https?|http):\/\/\S+/i;
        if (urlRegex.test(<string>filename)) {
            return `${filename};`
        }

        return `http://3.133.159.195:${process.env.APP_PORT}/uploads/dishes/${filename}`;
    }
}

export { getImageUrl };
