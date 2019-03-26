export const deserializeModel = (model) => {
    let data = {};
    
    data.id = model.id;
    data.url = model && model.links && model.links.self ? model.links.self : '';
    Object.keys(model.attributes).forEach((attr) => {
        data[attr] = model.attributes[attr] || '';
    });
    Object.keys(model.relationships).forEach((rel) => {
        data[rel] = model.relationships[rel]
            && model.relationships[rel].links
            && model.relationships[rel].links.self
            ? model.relationships[rel].links.self : '';
    });

    return data;
}