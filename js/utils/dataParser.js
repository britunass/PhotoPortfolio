export const parsePhotos = (apiData) => {
    return apiData.map(photo => ({
        id: photo.id,
        url: photo.urls.regular, 
        alt: photo.alt_description || "Unsplash Photo",
        link: photo.links.html 
    }));
};

export const createElementFromData = (data, template) => {
    try {
        let html = template;
        Object.keys(data).forEach((key) => {
            const placeholder = `{{${key}}}`;
            const value = data[key] || "";
            html = html.replace(new RegExp(placeholder, "g"), value);
        });
        const templateElement = document.createElement("template");
        templateElement.innerHTML = html.trim();
        return templateElement.content.firstElementChild;
    } catch (error) {
        console.error("Error creating element from template:", error);
        return document.createElement('div');
    }
};